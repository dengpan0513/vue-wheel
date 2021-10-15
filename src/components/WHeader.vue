<template>
  <header :style="styleObject" class="w-header">
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'WHeader',
  props: {
    height: {
      type: [String, Number]
    }
  },
  computed: {
    styleObject () {
      const { height } = this
      const heightValue = typeof height === 'string' ? height : `${height}px`
      return { height: heightValue }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

.w-header {
  flex: 0 0 auto;
  height: 64px;
  padding: 0 50px;
  color: $color;
}
</style>
