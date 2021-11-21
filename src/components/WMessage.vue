<template>
  <transition name="w-message-slide" @after-leave="handleAfterLeave">
    <div v-show="visible" :style="styleObject" class="w-message-wrapper">
      <div class="w-message">
        <w-icon
          :icon="icon || type"
          :style="{ color: prefixIconColor }"
          :class="iconClassList"
          class="w-message-icon"
        ></w-icon>
        <span v-if="!dangerouslyUseHTML" class="w-message-content">{{ content }}</span>
        <span v-else v-html="content" class="w-message-content"></span>
        <w-icon v-if="closeable" class="w-message-close" icon="close" @click="close"></w-icon>
      </div>
    </div>
  </transition>
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
      default: 30
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
      default: 16
    }
  },
  data() {
    return {
      visible: false,
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
    toggleVisible (visible) {
      this.visible = visible
    },
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
      this.toggleVisible(false)
    },
    handleAfterLeave() {
      this.$el.remove()
      this.$destroy()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

.w-message-slide-enter, .w-message-slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.w-message-slide-enter-active {
  transition: all .3s;
}
.w-message-slide-leave-active {
  transition: all .15s;
}

.w-message-wrapper {
  position: fixed;
  left: 0;
  width: 100%;
  z-index: 1000;
  text-align: center;
  pointer-events: none;
}

.w-message {
  @extend %inline-flex-center-vertical;
  padding: 10px 16px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05);
  color: $color;
  font-size: $font-size;
  pointer-events: all;

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

  .w-message-content {
    text-align: left;
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
