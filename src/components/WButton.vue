<template>
  <button class="w-button">按钮</button>
</template>

<script>
export default {
  name: 'WButton'
}
</script>

<style lang="scss">
.w-button {
  height: var(--button-height);
  padding: 0 1em;
  border: 1px solid var(--button-border-color);
  border-radius: var(--button-border-radius);
  background-color: var(--button-bgc);

  &:hover {
    border-color: var(--button-border-color-hover);
  }

  &:focus {
    outline: none;
  }

  &:active {
    background-color: var(--button-bgc-active);
  }
}
</style>