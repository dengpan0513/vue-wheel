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
.w-content {
  flex-grow: 1;
}
</style>
