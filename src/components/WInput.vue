<template>
  <div class="winput-wrapper">
    <input
      class="winput"
      v-bind="$attrs"
      :type="type"
      :value="value"
      :readonly="readonly"
      :disabled="disabled"
    >
  </div>
</template>

<script>
export default {
  name: 'WInput',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 32px;
$bgc: #fff;
$bgc-disabled: #f5f5f5;
$border-color: #d9d9d9;
$border-color-hover: #40a9ff;
$border-radius: 4px;
$box-shadow-color: rgba(24, 144, 255, .2);
$font-color: rgba(0, 0, 0, .85);
$font-color-disabled: rgba(0, 0, 0, .25);
$font-size: 14px;

.winput-wrapper {
  display: inline-block;
  width: 100%;
  font-size: $font-size;

  .winput {
    width: 100%;
    height: $height;
    padding: 0 15px;
    background-color: $bgc;
    border: 1px solid $border-color;
    border-radius: $border-radius;

    &:hover {
      border-color: $border-color-hover;
    }

    &:focus {
      border-color: $border-color-hover;
      outline: none;
      box-shadow: 0 0 0 2px $box-shadow-color;
    }

    &[disabled] {
      background-color: $bgc-disabled;
      border-color: $border-color;
      color: $font-color-disabled;
      cursor: not-allowed;
    }
  }
}
</style>