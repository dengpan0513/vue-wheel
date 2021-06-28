<template>
  <div class="w-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WButtonGroup',
  mounted () {
    for (let htmlElement of this.$el.children) {
      const htmlName = htmlElement.tagName.toLowerCase()
      if (htmlName !== 'button') {
        console.warn(`w-button-group 的直接子元素应该是 w-button，而你的是 ${htmlName}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

@mixin borderColorInPrimary($color) {
  &:first-child {
    border-right-color: $color;
  }

  &:not(:first-child) {
    border-left-color: $color;
  }

  &:not(:first-child):not(:last-child) {
    border-right-color: $color;
    border-left-color: $color;
  }
}

.w-button-group {
  display: inline-flex;
  vertical-align: middle;

  > .w-button {
    border-radius: 0;

    &:first-child {
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
    }

    &:last-child {
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }

    &:not(:first-child) {
      margin-left: -1px;
    }

    &:hover, &:active, &:focus {
      position: relative;
      z-index: 1;
    }

    &.w-button-primary {
      @include borderColorInPrimary($color-primary-active);

      &.w-button-success {
        @include borderColorInPrimary($color-success-active);
      }

      &.w-button-warning {
        @include borderColorInPrimary($color-warning-active);
      }

      &.w-button-danger {
        @include borderColorInPrimary($color-danger-active);
      }
    }
  }
}
</style>
