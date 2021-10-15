<template>
  <transition name="sider-slide">
    <aside :style="styleObject" class="w-sider">
      <slot></slot>
      <slot name="trigger">
        <div :style="styleObject" class="w-sider-trigger">
          <w-icon icon="unfold" />
        </div>
      </slot>
    </aside>
  </transition>
</template>

<script>
import WIcon from './WIcon.vue'

export default {
  name: 'WSider',
  components: { WIcon },
  props: {
    width: {
      type: [String, Number],
      default: 200
    }
  },
  computed: {
    styleObject () {
      const { width } = this
      const widthValue = typeof width === 'string' ? width : `${width}px`
      return { width: widthValue }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

.w-sider {
  flex-shrink: 0;
  position: relative;
  color: $color;

  .w-sider-trigger {
    position: fixed;
    bottom: 0;
    height: 48px;
    line-height: 48px;
    text-align: center;
    cursor: pointer;
  }
}

.sider-slide-enter {
  background-color: red;
}
.sider-slide-enter-active {
  transition: all 10s;
}
</style>
