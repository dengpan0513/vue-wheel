<template>
  <div :style="styleObject" class="w-message">
    <div class="w-message-content-wrapper">
      <span v-if="showIconPrefix" :style="{ color: iconColor }" class="w-message-icon-wrapper">
        <w-icon :icon="icon || type" :class="iconClassList"></w-icon>
      </span>
      <span v-if="!dangerouslyEnableHTML" class="w-message-content">{{ content }}</span>
      <span v-else v-html="content"></span>
      <w-icon v-if="closeable" icon="close" class="w-message-icon-close" @click="handleClick"></w-icon>
    </div>
  </div>
</template>

<script>
import WIcon from './WIcon.vue'
import { oneof } from '../utils/helper.js'

const classPrefix = 'w-message-'

export default {
  name: 'WMessage',
  components: { WIcon },
  props: {
    content: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'info',
      validator (value) {
        return oneof(value, ['info', 'primary', 'success', 'warning', 'error'])
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
    duration: {
      type: Number,
      default: 3
    },
    top: {
      type: Number,
      default: 24
    },
    closeable: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function
    },
    dangerouslyEnableHTML: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconClassList () {
      const { type, icon } = this
      return [
        type && `${classPrefix}${type}`,
        icon && `${classPrefix}icon`
      ]
    },
    showIconPrefix () {
      const { type, icon } = this
      return type !== 'info' || icon
    },
    styleObject () {
      const { top } = this
      return {
        top: `${top}px`
      }
    }
  },
  data () {
    return {
      timer: null
    }
  },
  mounted () {
    this.judgeAutoClose()
  },
  methods: {
    judgeAutoClose () {
      const { duration } = this
      if (duration !== 0) {
        this.timer = setTimeout(() => {
          this.close()
        }, duration * 1000)
      }
    },
    close () {
      this.timer && clearTimeout(this.timer)
      this.excuteOnClose()
      this.$el.remove()
      this.$destroy()
    },
    handleClick () {
      this.close()
    },
    excuteOnClose () {
      const { onClose } = this
      onClose && onClose(this)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

.w-message {
  position: fixed;
  left: 0;
  width: 100%;
  color: $color;
  font-size: $font-size;
  text-align: center;
  pointer-events: none;

  .w-message-content-wrapper {
    display: inline-flex;
    align-items: center;
    margin-right: 16px;
    margin-left: 16px;
    padding: 10px 16px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    pointer-events: all;

    .w-message-icon-wrapper {
      margin-right: 8px;
      font-size: 16px;
      line-height: 1;

      .w-message-primary {
        color: $color-primary;
      }

      .w-message-success {
        color: $color-success;
      }

      .w-message-warning {
        color: $color-warning;
      }

      .w-message-error {
        color: $color-error;
      }

      .w-message-icon {
        color: inherit;
      }
    }

    .w-message-content {
      text-align: left;
    }

    .w-message-icon-close {
      margin-left: 16px;
      font-size: 14px;
      color: $color-gray-light;
      cursor: pointer;

      &:hover {
        color: $color-gray;
      }
    }

  }
}
</style>