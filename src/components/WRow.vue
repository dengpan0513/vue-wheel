<template>
  <div class="w-row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WRow',
  props: {
    //
  }
}
</script>

<style lang="scss" scoped>
.w-row {
  display: flex;
}
</style>