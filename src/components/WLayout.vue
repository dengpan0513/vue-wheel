<template>
  <section :class="classObject" class="w-layout">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'WLayout',
  data () {
    return {
      classObject: {
        'w-layout-has-sider': false
      }
    }
  },
  mounted () {
    this.checkHasSider()
  },
  methods: {
    checkHasSider () {
      this.$children.forEach(child => {
        if (child.$options.name === 'WSider') {
          this.classObject['w-layout-has-sider'] = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

.w-layout {
  flex-grow: 1;
  @extend %flex-column;

  &.w-layout-has-sider {
    flex-direction: row;
  }
}
</style>
