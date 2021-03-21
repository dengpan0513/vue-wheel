<template>
  <header class="w-header">
    <slot></slot>
  </header>
</template>

<script>
export default {
  name: 'WHeader'
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

.w-header {
  flex: 0 0 auto;
  height: 64px;
  padding: 0 50px;
  background-color: $color-bgc-dark;
  line-height: 64px;
  color: $color;
}
</style>
