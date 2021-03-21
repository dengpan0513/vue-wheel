<template>
  <div class="w-sider">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WSider'
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

.w-sider {
  width: 200px;
  background-color: $color-bgc-dark;
  color: $color;
}
</style>
