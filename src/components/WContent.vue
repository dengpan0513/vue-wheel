<template>
  <main class="w-content">
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: 'WContent'
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

.w-content {
  flex-grow: 1;
  color: $color;
}
</style>
