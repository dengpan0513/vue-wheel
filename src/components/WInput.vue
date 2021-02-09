<template>
  <div :class="classList" class="w-input-wrapper">
    <span v-if="prefix || $slots.prefix" class="w-input-prefix-wrapper">
      <slot name="prefix"></slot>
      <w-icon v-if="!$slots.prefix" :icon="prefix"></w-icon>
    </span>
    <input
      class="w-input"
      v-bind="$attrs"
      :value="value"
      :type="type"
      :readonly="readonly"
      :disabled="disabled"
      :autofocus="autofocus"
      :maxlength="maxLength"
      @input="$emit('input', $event.target.value)"
    >
    <span v-if="showSuffix" class="w-input-suffix-wrapper">
      <span v-if="suffix || $slots.suffix" class="w-input-suffix-icon">
        <slot name="suffix"></slot>
        <w-icon v-if="!$slots.suffix" :icon="suffix"></w-icon>
      </span>
      <w-icon v-if="showClear" icon="clear" class="w-icon-clear" @click="clear"></w-icon>
    </span>
  </div>
</template>

<script>
import WIcon from './WIcon.vue'

export default {
  name: 'WInput',
  inheritAttrs: false,
  components: { WIcon },
  props: {
    value: {
      type: String,
      default: ''
    },
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
    },
    prefix: {
      type: String
    },
    suffix: {
      type: String
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList () {
      const { disabled, prefix, suffix, $slots, clearable } = this
      return [
        disabled && 'w-input-wrapper-disabled',
        (prefix || $slots.prefix) && 'w-input-wrapper-prefix',
        (suffix || $slots.suffix || clearable) && 'w-input-wrapper-suffix'
      ]
    },
    showSuffix () {
      const { suffix, $slots, clearable } = this
      return suffix || $slots.suffix || clearable
    },
    showClear () {
      const { clearable, value, readonly, disabled } = this
      return clearable && value && !readonly && !disabled
    }
  },
  mounted () {
    this.checkAffixChild()
  },
  methods: {
    checkAffixChild () {
      const { $slots: { prefix, suffix } } = this
      const warningMessage = (type) => {
        return `w-input 中使用 slot 方式添加${type}图标时应该只有一个子元素 w-icon`
      }
      if (prefix) {
        if (prefix.length > 1 || prefix[0].tag !== 'svg') {
          console.warn(warningMessage('前缀'))
        }
      }
      if (suffix) {
        if (suffix.length > 1 || suffix[0].tag !== 'svg') {
          console.warn(warningMessage('后缀'))
        }
      }
    },
    clear () {
      this.$emit('input', '')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

.w-input-wrapper {
  display: inline-block;
  position: relative;
  width: 100%;
  color: $color;
  font-size: $font-size;

  .w-input {
    width: inherit;
    height: 32px;
    padding: 4px 11px;
    border: 1px solid $border-color;
    border-radius: 4px;
    background-image: none;

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
      color: $color-gray-light;
      cursor: not-allowed;

      &:hover {
        border-color: $border-color;
      }
    }
  }

  &.w-input-wrapper-disabled {
    color: $color-gray-light;
  }

  .w-input-prefix-wrapper, .w-input-suffix-wrapper {
    position: absolute;
    top: 0;
    @extend %flex-center-vertical;
    height: 100%;
  }

  &.w-input-wrapper-prefix {
    .w-input-prefix-wrapper {
      left: $input-iocn-gap;
    }

    .w-input {
      padding-left: $input-padding-affix;
    }
  }

  &.w-input-wrapper-suffix {
    .w-input-suffix-wrapper {
      right: $input-iocn-gap;
    }
    
    .w-input {
      padding-right: $input-padding-affix;
    }
  }

  .w-icon-clear {
    margin-left: 4px;
    color: $color-gray-light;

    &:hover {
      color: $color-gray;
      cursor: pointer;
    }
  }
}
</style>
