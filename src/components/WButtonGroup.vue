<template>
  <div class="w-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WButtonGroup',
  mounted () {
    for (let htmlElement of this.$el.children) {
      const htmlName = htmlElement.tagName.toLowerCase()
      if (htmlName !== 'button') {
        console.warn(`w-button-group 的子元素应该是 button，而你写的是 ${htmlName}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.w-button-group {
  display: inline-flex;
  vertical-align: middle;

  > .w-button {
    border-radius: 0;

    &:first-child {
      border-bottom-left-radius: var(--button-border-radius);
      border-top-left-radius: var(--button-border-radius);
    }

    &:last-child {
      border-top-right-radius: var(--button-border-radius);
      border-bottom-right-radius: var(--button-border-radius);
    }

    &:not(:first-child) {
      margin-left: -1px;
    }

    &:hover, &:active, &:focus {
      position: relative;
      z-index: 1;
    }
  }
}
</style>