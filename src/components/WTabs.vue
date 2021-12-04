<template>
  <div class="w-tabs">
    <div class="w-tabs-head">
      <w-tab-nav
        v-for="nav in tabList"
        :key="nav.componentOptions.propsData.value"
        :title="nav.componentOptions.propsData.title"
        :value="nav.componentOptions.propsData.value"
        :active-value="activeValue"
        @click="handleClickTab"
      ></w-tab-nav>
      <div class="w-tab-bar-active"></div>
    </div>
    <div class="w-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import WTabNav from './WTabNav.vue'
import { upperCaseFirstLetter } from '../utils/helper.js'

const tabPaneTag = 'w-tab-pane'

export default {
  name: 'WTabs',
  components: { WTabNav },
  props: {
    activeValue: {
      type: String
    }
  },
  data () {
    return {
      tabList: []
    }
  },
  computed: {
    //
  },
  mounted() {
    this.checkSlots()
    this.getTabList()
    this.tabList.forEach(tab => {
      tab.componentInstance.$data.activeValue = this.activeValue
    })
    this.$nextTick(() => {
      this.$watch('activeValue', () => {
        const tabHead = this.$el.querySelector('.w-tabs-head')
        const tabNavActive = this.$el.querySelector('.w-tab-nav-active')
        const { left: leftTabHead } = tabHead.getBoundingClientRect()
        const { width, left: leftTabNav } = tabNavActive.getBoundingClientRect()
        const tabBarActive = this.$el.querySelector('.w-tab-bar-active')
        tabBarActive.style.width = `${width}px`
        console.log(leftTabNav, leftTabHead)
        tabBarActive.style.left = `${leftTabNav- leftTabHead}px`
      }, { immediate: true})
    })
  },
  methods: {
    checkSlots() {
      this.$slots.default.forEach(item => {
        const { tag, componentOptions } = item
        const checkHTML = tag && !componentOptions
        const checkComponent = tag && componentOptions && componentOptions.tag !== tabPaneTag
        if (checkHTML || checkComponent) {
          const message = checkHTML ? `<${tag}> 元素` : `${upperCaseFirstLetter(componentOptions.tag, '-')} 组件`
          console.warn(`WTabs 组件的直接子组件应该是 WTabPane，而现在是 ${message}`)
        }
      })
    },
    getTabList() {
      this.tabList = this.$slots.default.filter(item => {
        return item.componentOptions && item.componentOptions.tag === tabPaneTag
      })
    },
    handleClickTab(value) {
      this.$emit('update:activeValue', value)
      this.tabList.forEach(tab => {
        tab.componentInstance.$data.activeValue = value
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variable.scss";

.w-tabs {
  display: flex;
  flex-direction: column;

  .w-tabs-head {
    position: relative;
    display: flex;
    margin-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;

    > .w-tab-bar-active {
      position: absolute;
      bottom: -1px;
      height: 2px;
      background-color: $color-primary;
      transition: all .3s;
    }
  }
}
</style>
