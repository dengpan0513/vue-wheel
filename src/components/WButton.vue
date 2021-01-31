<template>
  <button class="w-button" :class="classList" :disabled="disabled" type="button" @click="$emit('click')">
    <w-icon v-if="icon && !loading" :icon="icon" class="w-button-icon"></w-icon>
    <w-icon v-if="loading" icon="loading" class="w-button-icon w-button-icon-loading"></w-icon>
    <span class="w-button-text">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import { oneof } from '../utils/helper.js'
import WIcon from './WIcon.vue'

const prefixClass = 'w-button-'

export default {
  name: 'WButton',
  components: { WIcon },
  props: {
    type: {
      type: String,
      validator (value) {
        return oneof(value, ['default', 'primary', 'dashed', 'danger'])
      }
    },
    shape: {
      type: String,
      validator (value) {
        return oneof(value, ['round', 'circle'])
      }
    },
    icon: {
      type: String,
      default: ''
    },
    iconPosition: {
      type: String,
      validator (value) {
        return oneof(value, ['left', 'right'])
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList () {
      const { type, shape, iconPosition, loading } = this
      return [
        type && `${prefixClass}${type}`,
        shape && `${prefixClass}${shape}`,
        iconPosition && `${prefixClass}icon-${iconPosition}`,
        { [`${prefixClass}loading`]: loading }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.w-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: var(--button-height);
  padding: 0 1em;
  border: 1px solid var(--button-border-color);
  border-radius: var(--button-border-radius);
  background-color: var(--button-bgc);
  color: rgba(0, 0, 0, .65);
  cursor: pointer;
  user-select: none;
  vertical-align: middle; // 解决 inline-flex 产生的 bug，让多个按钮在垂直方向对齐

  &::before {
    display: none;
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    z-index: 1;
    content: '';
    border-radius: inherit;
    background-color: #fff;
    opacity: .35;
    pointer-events: none;
  }

  &, &:focus, &:active {
    outline: none;
  }

  &:hover, &:focus {
    border-color: var(--button-hover-focus);
    color: var(--button-hover-focus);
  }

  &:active {
    border-color: var(--button-active);
    color: var(--button-active);
  }

  &[disabled], &[disabled]:hover, &[disabled]:focus, &[disabled]:active {
    color: var(--button-disabled-color);
    border-color: var(--button-disabled-border-color);
    background-color: var(--button-disabled-bgc);
    cursor: not-allowed;
  }

  .w-button-icon {
    margin-right: .2em;
  }

  &.w-button-icon-right {
    .w-button-icon {
      order: 1;
      margin-right: 0;
      margin-left: .2em;
    }
  }
}

.w-button-primary {
  border-color: var(--button-primary);
  background-color: var(--button-primary);
  color: #fff;

  &:hover, &:focus {
    border-color: var(--button-hover-focus);
    background-color: var(--button-hover-focus);
    color: #fff;
  }

  &:active {
    border-color: var(--button-active);
    background-color: var(--button-active);
    color: #fff;
  }
}

.w-button-dashed {
  border-style: dashed;
}

.w-button-danger {
  border-color: var(--button-danger);
  background-color: var(--button-danger);
  color: #fff;

  &:hover, &:focus {
    border-color: var(--button-danger-hover-focus);
    background-color: var(--button-danger-hover-focus);
    color: #fff;
  }

  &:active {
    border-color: var(--button-danger-active);
    background-color: var(--button-danger-active);
    color: #fff;
  }
}

.w-button-round {
  border-radius: var(--button-round);
}

.w-button-circle {
  width: 32px;
  padding: 0;
  border-radius: var(--button-circle);
  vertical-align: middle;
}

.w-button-loading {
  position: relative;

  > .w-button-icon-loading {
    animation: spin 2s linear infinite;
  }

  &::before {
    display: block;
  }

  &:not([disabled]) {
    pointer-events: none;
  }
}
</style>