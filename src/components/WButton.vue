<template>
  <button
    :class="classList"
    :disabled="disabled"
    class="w-button"
    type="button"
    @click="$emit('click')"
  >
    <w-icon v-if="icon && !loading" :icon="icon" class="w-button-icon"></w-icon>
    <w-icon v-if="loading" icon="loading" class="w-button-icon w-button-icon-loading"></w-icon>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script>
import { oneof, generateClass } from '../utils/helper.js'
import WIcon from './WIcon.vue'

const classPrefix = 'w-button-'

export default {
  name: 'WButton',
  components: { WIcon },
  props: {
    type: {
      type: String,
      validator (value) {
        const typeList = ['default', 'primary', 'dashed', 'text', 'link']
        return oneof(value, typeList)
      }
    },
    success: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    },
    danger: {
      type: Boolean,
      default: false
    },
    ghost: {
      type: Boolean,
      default: false
    },
    shape: {
      type: String,
      validator (value) {
        const shapeList = ['round', 'circle']
        return oneof(value, shapeList)
      }
    },
    icon: {
      type: String,
      default: ''
    },
    iconPosition: {
      type: String,
      validator (value) {
        const positionList = ['left', 'right']
        return oneof(value, positionList)
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList () {
      const { type, success, warning, danger, ghost, shape, iconPosition, loading, block } = this
      return [
        type && generateClass(classPrefix, type),
        { [generateClass(classPrefix, 'success')]: success },
        { [generateClass(classPrefix, 'warning')]: warning },
        { [generateClass(classPrefix, 'danger')]: danger },
        { [generateClass(classPrefix, 'ghost')]: ghost },
        shape && generateClass(classPrefix, shape),
        iconPosition && generateClass(classPrefix, 'icon-', iconPosition),
        { [generateClass(classPrefix, 'loading')]: loading },
        { [generateClass(classPrefix, 'block')]: block }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

@mixin buttonDisabled() {
  &[disabled] {
    border-color: $border-color-disabled;
    background-color: $bgc-disabled;
    color: $color-disabled;
    cursor: not-allowed;
  }
}

@mixin buttonDefaultStatus($color-hover-focus, $color-active) {
  &:hover, &:focus {
    border-color: $color-hover-focus;
    color: $color-hover-focus;
  }

  &:active {
    border-color: $color-active;
    color: $color-active;
  }
}

@mixin setColorInDefault($color, $color-hover-focus, $color-active) {
  border-color: $color;
  color: $color;
  @include buttonDefaultStatus($color-hover-focus, $color-active);
  @include buttonDisabled;
}

@mixin setColorInPrimary($color, $color-hover-focus, $color-active) {
  border-color: $color;
  background-color: $color;
  color: #fff;

  &:hover, &:focus, &:active {
    color: #fff;
  }

  &:hover, &:focus {
    border-color: $color-hover-focus;
    background-color: $color-hover-focus;
  }

  &:active {
    border-color: $color-active;
    background-color: $color-active;
  }

  @include buttonDisabled;

  &.w-button-ghost {
    border-color: $color;
    background-color: transparent;
    color: $color;

    &:hover, &:focus {
      border-color: $color-hover-focus;
      background-color: transparent;
      color: $color-hover-focus;
    }

    &:active {
      border-color: $color-active;
      background-color: transparent;
      color: $color-active;
    }

    &:disabled {
      border-color: $border-color-disabled;
      color: $color-disabled;
    }
  }
}

@mixin setColorInText($color, $color-hover-focus, $color-active) {
  border-color: transparent;

  &:hover, &:focus, &:active {
    border-color: transparent;
    color: $color;
  }

  &:hover, &:focus {
    background-color: rgba(0, 0, 0, .018);
    color: $color-hover-focus;
  }

  &:active {
    background-color: rgba(0, 0, 0, .028);
    color: $color-active;
  }

  @include buttonDisabled;
}

@mixin setColorInLink($color, $color-hover-focus, $color-active) {
  border-color: transparent;
  color: $color;

  &:hover, &:focus, &:active {
    border-color: transparent;
  }

  &:hover, &:focus {
    color: $color-hover-focus;
  }

  &:active {
    color: $color-active;
  }

  @include buttonDisabled;
}

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
  height: 32px;
  padding-right: 1em;
  padding-left: 1em;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  background-color: #fff;
  color: $color;
  font-size: $font-size;
  line-height: 1;
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

  @include buttonDefaultStatus($color-primary-hover-focus, $color-primary-active);
  @include buttonDisabled;

  &.w-button-success {
    @include setColorInDefault($color-success, $color-success-hover-focus, $color-success-active);
  }

  &.w-button-warning {
    @include setColorInDefault($color-warning, $color-warning-hover-focus, $color-warning-active);
  }

  &.w-button-danger {
    @include setColorInDefault($color-danger, $color-danger-hover-focus, $color-danger-active);
  }

  &.w-button-ghost {
    border-color: #fff;
    background-color: transparent;
    color: #fff;

    &:disabled {
      border-color: $border-color-disabled;
      background-color: transparent;
      color: $color-disabled;
    }
  }

  $buttonIconMargin: .2em;
  .w-button-icon {
    margin-right: $buttonIconMargin;
  }

  &.w-button-icon-right {
    .w-button-icon {
      order: 1;
      margin-right: 0;
      margin-left: $buttonIconMargin;
    }
  }
}

.w-button-primary {
  @include setColorInPrimary($color-primary, $color-primary-hover-focus, $color-primary-active);

  &.w-button-success {
    @include setColorInPrimary($color-success, $color-success-hover-focus, $color-success-active);
  }

  &.w-button-warning {
    @include setColorInPrimary($color-warning, $color-warning-hover-focus, $color-warning-active);
  }

  &.w-button-danger {
    @include setColorInPrimary($color-danger, $color-danger-hover-focus, $color-danger-active);
  }
}

.w-button-dashed {
  border-style: dashed;
  @include buttonDefaultStatus($color-primary-hover-focus, $color-primary-active);
}

.w-button-text {
  @include setColorInText($color, $color, $color);

  &.w-button-success {
    @include setColorInText($color-success, $color-success-hover-focus, $color-success-active);
  }

  &.w-button-warning {
    @include setColorInText($color-warning, $color-warning-hover-focus, $color-warning-active);
  }

  &.w-button-danger {
    @include setColorInText($color-danger, $color-danger-hover-focus, $color-danger-active);
  }
}

.w-button-link {
  @include setColorInLink($color-primary, $color-primary-hover-focus, $color-primary-active);

  &.w-button-success {
    @include setColorInLink($color-success, $color-success-hover-focus, $color-success-active);
  }

  &.w-button-warning {
    @include setColorInLink($color-warning, $color-warning-hover-focus, $color-warning-active);
  }

  &.w-button-danger {
    @include setColorInLink($color-danger, $color-danger-hover-focus, $color-danger-active);
  }
}

.w-button-round {
  border-radius: 32px;
}

.w-button-circle {
  width: 32px;
  padding-right: 0;
  padding-left: 0;
  border-radius: 50%;
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

.w-button-block {
  width: 100%;
}
</style>
