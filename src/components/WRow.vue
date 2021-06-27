<template>
  <div :class="classList" :style="styleObject" class="w-row">
    <slot></slot>
  </div>
</template>

<script>
import { oneOf } from '../utils/helper.js'

const classPrefix = 'w-row-'

export default {
  name: 'WRow',
  props: {
    gutter: {
      type: Number,
      default: 0
    },
    justify: {
      type: String,
      validator (value) {
        return oneOf(value, ['start', 'end', 'center', 'space-between', 'space-around'])
      }
    },
    align: {
      type: String,
      validator (value) {
        return oneOf(value, ['top', 'middle', 'bottom'])
      }
    },
    wrap: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classList () {
      const { justify, align, wrap } = this
      return [
        justify && `${classPrefix}${justify}`,
        align && `${classPrefix}${align}`,
        !wrap && `${classPrefix}no-wrap`
      ]
    },
    styleObject () {
      const { gutter } = this
      const space = (-gutter / 2) + 'px'
      return {
        marginRight: space,
        marginLeft: space
      }
    }
  },
  mounted () {
    for (let i = 0; i < this.$el.children.length; i++) {
      if (!this.$el.children.item(i).classList.contains('w-col')) {
        console.warn('WRow 组件的子组件应该是 WCol')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.w-row {
  display: flex;
  flex-wrap: wrap;
}
.w-row-start {
  justify-content: flex-start;
}
.w-row-end {
  justify-content: flex-end;
}
.w-row-center {
  justify-content: center;
}
.w-row-space-between {
  justify-content: space-between;
}
.w-row-space-around {
  justify-content: space-around;
}
.w-row-top {
  align-items: flex-start;
}
.w-row-middle {
  align-items: center;
}
.w-row-bottom {
  align-items: flex-end;
}
.w-row-no-wrap {
  flex-wrap: nowrap;
}
</style>
