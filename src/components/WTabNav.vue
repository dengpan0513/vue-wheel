<template>
  <div :class="classList" class="w-tab-nav" @click="$emit('click', value)">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'WTabNav',
  props: {
    title: {
      type: String
    },
    value: {
      type: String
    },
    activeValue: {
      type: String
    }
  },
  computed: {
    classList() {
      const { value, activeValue } = this
      return [
        activeValue === value && 'w-tab-nav-active'
      ]
    }
  },
  methods: {
    //
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

.w-tab-nav {
  padding: 1em 0;
  color: $color;
  font-size: $font-size;
  line-height: 1;
  cursor: pointer;

  &+.w-tab-nav {
    margin-left: 32px;
  }

  &.w-tab-nav-active {
    color: $color-primary;
  }
}
</style>
