<template>
  <div v-show="activeValue === value" class="w-tab-pane">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WTabPane',
  props: {
    title: {
      type: String
    },
    value: {
      type: String
    }
  },
  data() {
    return {
      activeValue: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

.w-tab-pane {
  color: $color;
  font-size: $font-size;
}
</style>
