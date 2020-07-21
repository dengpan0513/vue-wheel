<template>
  <button 
    class="w-button" 
    :class="classes"
  >
    <slot></slot>
  </button>
</template>

<script>
import { oneof } from '../utils/helper.js'

const prefixClass = 'w-button-'

export default {
  name: 'WButton',
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
    }
  },
  computed: {
    classes () {
      return [
        this.type && `${prefixClass}${this.type}`,
        this.shape && `${prefixClass}${this.shape}`,
      ]
    }
  }
}
</script>

<style lang="scss">
.w-button {
  height: var(--button-height);
  padding: 0 1em;
  border: 1px solid var(--button-border-color);
  border-radius: var(--button-border-radius);
  background-color: var(--button-bgc);
  color: rgba(0, 0, 0, .65);
  cursor: pointer;
  user-select: none;

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
  border-radius: var(--button-circle);
  vertical-align: middle;
}
</style>