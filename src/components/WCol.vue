<!--suppress JSUnresolvedVariable -->
<template>
  <div :class="classList" :style="styleObject" class="w-col">
    <slot></slot>
  </div>
</template>

<script>
import { oneOf, generateClass } from '../utils/helper.js'

const classPrefix = 'w-col-'
const validator = (value) => {
  let valid = true
  if (typeof value === 'object') {
    const keys = Object.keys(value)
    keys.forEach(key => {
      valid = oneOf(key, ['span', 'offset', 'order', 'pull', 'push'])
    })
  }
  return valid
}

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
    },
    xs: {
      type: [Number, Object],
      validator
    },
    sm: {
      type: [Number, Object],
      validator
    },
    md: {
      type: [Number, Object],
      validator
    },
    lg: {
      type: [Number, Object],
      validator
    },
    xl: {
      type: [Number, Object],
      validator
    },
    xxl: {
      type: [Number, Object],
      validator
    }
  },
  computed: {
    classList () {
      const { span, offset, order, pull, push } = this
      const classSpan = span === 0 ? '${classPrefix}0' : (span && generateClass(classPrefix, span))
      const classResponsive = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].map(breakpoint => {
        return this.generateClassResponsive(breakpoint)
      })
      return [
        classSpan,
        offset && generateClass(classPrefix, 'offset-', offset),
        pull && generateClass(classPrefix, 'pull-', pull),
        push && generateClass(classPrefix, 'push-', push),
        order && generateClass(classPrefix, 'order-', order),
        ...classResponsive
      ]
    },
    styleObject () {
      const { gutter } = this
      if (gutter) {
        const gap = (gutter / 2) + 'px'
        return {
          paddingRight: gap,
          paddingLeft: gap
        }
      }
    },
    gutter () {
      const parent = this.$parent
      if (parent){
        const { name } = parent.$options
        return name === 'WRow' ? parent.gutter : 0
      }
    }
  },
  methods: {
    generateClassResponsive (breakpointString) {
      const breakpoint = this[breakpointString]
      const classList = []
      if (!breakpoint) {
        return classList
      }
      if (typeof breakpoint === 'number') {
        classList.push(generateClass(classPrefix, breakpointString, '-', breakpoint))
      } else {
        const keys = Object.keys(breakpoint)
        const separator = '-'
        keys.forEach(key => {
          const className = key === 'span' ?
            generateClass(classPrefix, breakpointString, separator, breakpoint[key]) :
            generateClass(classPrefix, key, separator, breakpointString, separator, breakpoint[key])
          classList.push(className)
        })
      }
      return classList
    }
  }
}
</script>

<style lang="scss" scoped>
@use "sass:math";
$class-prefix-span: w-col-;
$class-prefix-offset:#{$class-prefix-span}offset-;
$class-prefix-pull: #{$class-prefix-span}pull-;
$class-prefix-push: #{$class-prefix-span}push-;
$class-prefix-order: #{$class-prefix-span}order-;

@mixin xxx($class-span, $class-offset, $class-pull, $class-push, $class-order, $breakpoint) {
  @for $n from 1 through 24 {
    $width: math.div($n, 24) * 100%;

    .#{$class-span}#{$breakpoint}#{$n} {
      flex: 0 0 $width;
      max-width: $width;
    }

    .#{$class-offset}#{$breakpoint}#{$n} {
      margin-left: $width;
    }

    .#{$class-pull}#{$breakpoint}#{$n} {
      right: $width;
    }

    .#{$class-push}#{$breakpoint}#{$n} {
      left: $width;
    }

    .#{$class-order}#{$breakpoint}#{$n} {
      order: $n;
    }
  }
}

.w-col {
  position: relative;
  max-width: 100%;
  min-height: 1px;

  &.w-col-0 {
    display: none;
  }
}

@include xxx($class-prefix-span, $class-prefix-offset, $class-prefix-pull, $class-prefix-push, $class-prefix-order, '');

@include xxx($class-prefix-span, $class-prefix-offset, $class-prefix-pull, $class-prefix-push, $class-prefix-order, 'xs-');


@media (min-width: 576px) {
  @include xxx($class-prefix-span, $class-prefix-offset, $class-prefix-pull, $class-prefix-push, $class-prefix-order, 'sm-');
}

@media (min-width: 768px) {
  @include xxx($class-prefix-span, $class-prefix-offset, $class-prefix-pull, $class-prefix-push, $class-prefix-order, 'md-');
}

@media (min-width: 992px) {
  @include xxx($class-prefix-span, $class-prefix-offset, $class-prefix-pull, $class-prefix-push, $class-prefix-order, 'lg-');
}

@media (min-width: 1200px) {
  @include xxx($class-prefix-span, $class-prefix-offset, $class-prefix-pull, $class-prefix-push, $class-prefix-order, 'xl-');
}

@media (min-width: 1600px) {
  @include xxx($class-prefix-span, $class-prefix-offset, $class-prefix-pull, $class-prefix-push, $class-prefix-order, 'xxl-');
}
</style>
