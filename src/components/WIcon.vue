<template>
  <svg class="w-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`"></use>
  </svg>
</template>

<script>
export default {
  name: 'WIcon',
  props: {
    icon: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.w-icon {
  width: 1em; 
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>