<template>
  <footer class="w-footer">
    <slot></slot>
  </footer>
</template>

<script>
export default {
  name: 'WFooter'
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

.w-footer {
  flex-shrink: 0;
  padding: 24px 50px;
  background-color: $color-bgc-light;
  color: $color;
}
</style>
