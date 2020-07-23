<template>
  <button 
    class="w-button" 
    :class="classes"
    :disabled="disabled"
  >
    <w-icon class="w-button-icon" v-if="icon" :icon="icon"></w-icon>
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
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    iconPosition: {
      type: String,
      validator (value) {
        return oneof(value, ['left', 'right'])
      }
    }
  },
  computed: {
    classes () {
      return [
        this.type && `${prefixClass}${this.type}`,
        this.shape && `${prefixClass}${this.shape}`,
        this.iconPosition && `${prefixClass}icon-${this.iconPosition}`
      ]
    }
  }
}
</script>

<style lang="scss">
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
  vertical-align: middle; // 解决 inline 产生的 bug

  > .w-button-icon {
    order: 1;
    margin-right: .2em;
  }

  > .w-button-text {
    order: 2;
  }

  &.w-button-icon-right {
    > .w-button-icon {
      order: 2;
      margin-left: .2em;
      margin-right: 0;
    }

    > .w-button-text {
      order: 1;
    }
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
</style>