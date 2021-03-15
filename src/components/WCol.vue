<template>
  <div :class="classList" class="w-col">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WCol',
  props: {
    span: {
      type: Number
    },
    offset: {
      type: Number,
      default: 0
    },
    order: {
      type: Number,
      default: 0
    },
    pull: {
      type: Number,
      default: 0
    },
    push: {
      type: Number,
      default: 0
    }
  },
  computed: {
    classList () {
      const { span, offset, order, pull, push } = this
      const classSpan = span === 0 ? 'w-col-0' : (span && `w-col-${span}`)
      return [
        classSpan,
        offset && `w-col-offset-${offset}`,
        order && `w-col-order-${order}`,
        pull && `w-col-pull-${pull}`,
        push && `w-col-push-${push}`
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.w-col {
  position: relative;
  max-width: 100%;
  min-height: 1px;

  &.w-col-0 {
    display: none;
  }
}

$class-prefix-span: w-col-;
$class-prefix-offset: w-col-offset-;
$class-prefix-order: w-col-order-;
$class-prefix-pull: w-col-pull-;
$class-prefix-push: w-col-push-;
@for $n from 1 through 24 {
  $space: ($n / 24) * 100%;

  .#{$class-prefix-span}#{$n} {
    flex: 0 0 $space;
    max-width: $space;
  }

  .#{$class-prefix-offset}#{$n} {
    margin-left: $space;
  }

  .#{$class-prefix-order}#{$n} {
    order: $n;
  }

  .#{$class-prefix-pull}#{$n} {
    right: $space;
  }

  .#{$class-prefix-push}#{$n} {
    left: $space;
  }
}
</style>