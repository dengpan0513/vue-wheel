<template>
  <div class="w-input-wrapper">
    <input
      class="w-input"
      v-bind="$attrs"
      :type="type"
      :readonly="readonly"
      :disabled="disabled"
      :autofocus="autofocus"
      :maxlength="maxLength"
    >
  </div>
</template>

<script>
import WIcon from './WIcon.vue'

export default {
  name: 'Winput',
  inheritAttrs: false,
  components: { WIcon },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: [String, Number]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

.w-input-wrapper {
  display: inline-block;
  width: 100%;

  .w-input {
    width: inherit;
    height: 32px;
    padding: 4px 11px;
    border: 1px solid $border-color;
    background-image: none;
    border-radius: 4px;
    font-size: $font-size;

    &::placeholder {
      color: rgb(177, 178, 177);
    }

    &:hover {
      border-color: $color-hover;
    }

    &:focus {
      border-color: $color-hover;
      outline: none;
      box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
    }

    &:disabled {
      background-color: $bgc-disabled;
      color: $color-disabled;
      cursor: not-allowed;

      &:hover {
        border-color: $border-color;
      }
    }
  }
}
</style>
