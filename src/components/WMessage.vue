<template>
  <div :style="styleObject" class="w-message">
    <w-icon :icon="icon || type" :style="{ color: prefixIconColor }" :class="iconClassList" class="w-message-icon"></w-icon>
    <span v-if="!dangerouslyUseHTML" class="w-message-content">{{ content }}</span>
    <span v-else v-html="content"></span>
    <w-icon v-if="closeable" class="w-message-close" icon="close" @click="close"></w-icon>
  </div>
</template>

<script>
import WIcon from './WIcon.vue'
import { oneOf } from '../utils/helper.js'

const classPrefix = 'w-message-'

export default {
  name: 'WMessage',
  components: { WIcon },
  props: {
    type: {
      type: String,
      default: 'info',
      validator(value) {
        return oneOf(value, ['info', 'success', 'warning', 'error'])
      }
    },
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    dangerouslyUseHTML: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3
    },
    closeable: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function,
      default: null
    },
    top: {
      type: Number,
      default: 8
    }
  },
  data() {
    return {
      timer: null
    }
  },
  computed: {
    prefixIconColor() {
      const { icon, iconColor } = this
      return (icon && iconColor) ? iconColor : ''
    },
    iconClassList() {
      const { type } = this
      return [
        type && `${classPrefix}${type}`
      ]
    },
    styleObject() {
      const { top } = this
      return {
        top: `${top}px`
      }
    }
  },
  mounted() {
    this.handleAutoClose()
  },
  methods: {
    handleAutoClose() {
      const { duration } = this
      if (duration > 0) {
        this.timer = setTimeout(() => {
          this.close()
        }, duration * 1000)
      }
    },
    clearTimer() {
      this.timer && clearTimeout(this.timer)
    },
    executeCallback() {
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },
    close() {
      this.clearTimer()
      this.executeCallback()
      this.$destroy()
      this.$el.remove()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

.w-message {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  @extend %flex-center-vertical;
  padding: 10px 16px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05);
  color: $color;
  font-size: $font-size;

  .w-message-icon {
    flex-shrink: 0;
    margin-right: 8px;
    font-size: 20px;

    &.w-message-info {
      color: $color-primary;
    }

    &.w-message-success {
      color: $color-success;
    }

    &.w-message-warning {
      color: $color-warning;
    }
    &.w-message-error {
      color: $color-danger;
    }
  }

  .w-message-close {
    flex-shrink: 0;
    margin-left: 16px;
    font-size: 16px;
    color: $color-disabled;
    cursor: pointer;

    &:hover {
      color: $color-gray;
    }
  }
}
</style>
