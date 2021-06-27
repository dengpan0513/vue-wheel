<template>
  <div :class="classList" :style="styleObject" class="w-col">
    <slot></slot>
  </div>
</template>

<script>
import { oneOf } from '../utils/helper.js'

const classPrefix = 'w-col-'
const validator = (value) => {
  if (typeof value === 'object') {
    let valid
    const keys = Object.keys(value)
    keys.forEach(key => {
      valid = oneOf(key, ['span', 'offset', 'order', 'pull', 'push'])
    })
    return valid
  } else {
    return true
  }
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
  data () {
    return {
      gutterParent: 0
    }
  },
  computed: {
    classList () {
      const { span, offset, order, pull, push } = this
      const classSpan = span === 0 ? '${classPrefix}0' : (span && `${classPrefix}${span}`)
      const classResponsive = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].map(breakpoint => {
        return this.generateClassResponsive(breakpoint)
      })
      return [
        classSpan,
        offset && `${classPrefix}offset-${offset}`,
        order && `${classPrefix}order-${order}`,
        pull && `${classPrefix}pull-${pull}`,
        push && `${classPrefix}push-${push}`,
        ...classResponsive
      ]
    },
    styleObject () {
      const { gutterParent } = this
      const space = (gutterParent / 2) + 'px'
      return {
        paddingRight: space,
        paddingLeft: space
      }
    }
  },
  created () {
    this.gutterParent = this.$parent ? this.$parent.gutter : 0
  },
  methods: {
    generateClassResponsive (breakpointString) {
      const breakpoint = this[breakpointString]
      let classList = []
      if (!breakpoint) {
        return classList
      }
      if (typeof breakpoint === 'number') {
        classList.push(`${classPrefix}${breakpointString}-${breakpoint}`)
      } else {
        const keys = Object.keys(breakpoint)
        keys.forEach(key => {
          const className = key === 'span' ?
            `${classPrefix}${breakpointString}-${breakpoint[key]}` :
            `${classPrefix}${key}-${breakpointString}-${breakpoint[key]}`
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
  $space: math.div($n, 24) * 100%;

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

@for $n from 1 through 24 {
  $space: ($n / 24) * 100%;

  .#{$class-prefix-span}xs-#{$n} {
    flex: 0 0 $space;
    max-width: $space;
  }

  .#{$class-prefix-offset}xs-#{$n} {
    margin-left: $space;
  }

  .#{$class-prefix-order}xs-#{$n} {
    order: $n;
  }

  .#{$class-prefix-pull}xs-#{$n} {
    right: $space;
  }

  .#{$class-prefix-push}xs-#{$n} {
    left: $space;
  }
}

@media (min-width: 576px) {
  @for $n from 1 through 24 {
    $space: ($n / 24) * 100%;

    .#{$class-prefix-span}sm-#{$n} {
      flex: 0 0 $space;
      max-width: $space;
    }

    .#{$class-prefix-offset}sm-#{$n} {
      margin-left: $space;
    }

    .#{$class-prefix-order}sm-#{$n} {
      order: $n;
    }

    .#{$class-prefix-pull}sm-#{$n} {
      right: $space;
    }

    .#{$class-prefix-push}sm-#{$n} {
      left: $space;
    }
  }
}

@media (min-width: 768px) {
  @for $n from 1 through 24 {
    $space: ($n / 24) * 100%;

    .#{$class-prefix-span}md-#{$n} {
      flex: 0 0 $space;
      max-width: $space;
    }

    .#{$class-prefix-offset}md-#{$n} {
      margin-left: $space;
    }

    .#{$class-prefix-order}md-#{$n} {
      order: $n;
    }

    .#{$class-prefix-pull}md-#{$n} {
      right: $space;
    }

    .#{$class-prefix-push}md-#{$n} {
      left: $space;
    }
  }
}

@media (min-width: 992px) {
  @for $n from 1 through 24 {
    $space: ($n / 24) * 100%;

    .#{$class-prefix-span}lg-#{$n} {
      flex: 0 0 $space;
      max-width: $space;
    }

    .#{$class-prefix-offset}lg-#{$n} {
      margin-left: $space;
    }

    .#{$class-prefix-order}lg-#{$n} {
      order: $n;
    }

    .#{$class-prefix-pull}lg-#{$n} {
      right: $space;
    }

    .#{$class-prefix-push}lg-#{$n} {
      left: $space;
    }
  }
}

@media (min-width: 1200px) {
  @for $n from 1 through 24 {
    $space: ($n / 24) * 100%;

    .#{$class-prefix-span}xl-#{$n} {
      flex: 0 0 $space;
      max-width: $space;
    }

    .#{$class-prefix-offset}xl-#{$n} {
      margin-left: $space;
    }

    .#{$class-prefix-order}xl-#{$n} {
      order: $n;
    }

    .#{$class-prefix-pull}xl-#{$n} {
      right: $space;
    }

    .#{$class-prefix-push}xl-#{$n} {
      left: $space;
    }
  }
}

@media (min-width: 1600px) {
  @for $n from 1 through 24 {
    $space: ($n / 24) * 100%;

    .#{$class-prefix-span}xxl-#{$n} {
      flex: 0 0 $space;
      max-width: $space;
    }

    .#{$class-prefix-offset}xxl-#{$n} {
      margin-left: $space;
    }

    .#{$class-prefix-order}xxl-#{$n} {
      order: $n;
    }

    .#{$class-prefix-pull}xxl-#{$n} {
      right: $space;
    }

    .#{$class-prefix-push}xxl-#{$n} {
      left: $space;
    }
  }
}
</style>
