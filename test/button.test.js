// noinspection JSUnresolvedFunction

import Vue from 'vue'
import WButton from '../src/components/WButton.vue'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect
const classPrefix = 'w-button-'

describe('WButton ', function() {
  it('存在', function() {
    expect(WButton).to.be.exist
  })

  describe('props ', function() {
    const Constructor = Vue.extend(WButton)
    let vm
    afterEach(function() {
      vm.$destroy()
    })

    it('可以设置 type', function() {
      const typeList = ['default', 'primary', 'dashed', 'text', 'link']
      typeList.forEach(type => {
        vm = new Constructor({
          propsData: {
            type
          }
        }).$mount()
        const className = vm.$el.className.split(' ')[1]
        expect(className).to.equal(`${classPrefix}${type}`)
      })
    })

    it('可以设置表示 WButton 状态的属性', function() {
      const statusList = ['success', 'warning', 'danger', 'ghost']
      statusList.forEach(status => {
        vm = new Constructor({
          propsData: {
            [status]: true
          }
        }).$mount()
        const className = vm.$el.className.split(' ')[1]
        expect(className).to.equal(`${classPrefix}${status}`)
      })
    })

    it('可以设置 shape', function() {
      const shapeList = ['round', 'circle']
      shapeList.forEach(shape => {
        vm = new Constructor({
          propsData: {
            shape
          }
        }).$mount()
        const className = vm.$el.className.split(' ')[1]
        expect(className).to.equal(`${classPrefix}${shape}`)
      })
    })

    it('可以设置 icon', function() {
      vm = new Constructor({
        propsData: {
          icon: 'setting'
        }
      }).$mount()
      const useElement = vm.$el.querySelector('use')
      const xlinkHref = useElement.getAttribute('xlink:href')
      expect(xlinkHref).to.equal('#icon-setting')
    })

    it('未设置 iconPosition 时，svg 元素的 order 为 0', function() {
      const divElement = document.createElement('div')
      document.body.appendChild(divElement)
      vm = new Constructor({
        propsData: {
          icon: 'setting'
        }
      }).$mount(divElement)
      const svgElement = vm.$el.querySelector('svg')
      const { order } = window.getComputedStyle(svgElement)
      expect(order).to.equal('0')
      vm.$el.remove()
    })

    it('设置 iconPosition 为 right 时，svg 元素的 order 为 1', function() {
      const divElement = document.createElement('div')
      document.body.appendChild(divElement)
      vm = new Constructor({
        propsData: {
          icon: 'setting',
          iconPosition: 'right'
        }
      }).$mount(divElement)
      const svgElement = vm.$el.querySelector('svg')
      const { order } = window.getComputedStyle(svgElement)
      expect(order).to.equal('1')
      vm.$el.remove()
    })

    it('可以设置 loading', function() {
      vm = new Constructor({
        propsData: {
          icon: 'setting',
          loading: true
        }
      }).$mount()
      const svgElements = vm.$el.querySelectorAll('svg')
      expect(svgElements.length).to.equal(1)
      const useElement = vm.$el.querySelector('use')
      const xlinkHref = useElement.getAttribute('xlink:href')
      expect(xlinkHref).to.equal('#icon-loading')
    })

    it('可以设置 disabled', function() {
      vm = new Constructor({
        propsData: {
          disabled: true
        }
      }).$mount()
      const disabledAttribute = vm.$el.getAttribute('disabled')
      expect(disabledAttribute).to.equal('disabled')
    })

    it('可以设置 block', function() {
      const divElement = document.createElement('div')
      document.body.appendChild(divElement)
      vm = new Constructor({
        propsData: {
          block: true
        }
      }).$mount(divElement)
      const className = vm.$el.className.split(' ')[1]
      expect(className).to.equal(`${classPrefix}block`)
      const { width: buttonWidthParent } = window.getComputedStyle(vm.$el.parentElement)
      const { width: buttonWidth } = window.getComputedStyle(vm.$el)
      expect(buttonWidthParent).to.equal(buttonWidth)
      vm.$el.remove()
    })

    it('可以设置原生的 HTML type', function() {
      const htmlTypeList = ['button', 'submit', 'reset']
      htmlTypeList.forEach(type => {
        vm = new Constructor({
          propsData: {
            htmlType: type
          }
        }).$mount()
        const buttonType = vm.$el.getAttribute('type')
        expect(buttonType).to.equal(type)
      })
    })

    it('可以设置 href', function() {
      vm = new Constructor({
        propsData: {
          href: 'https://cn.vuejs.org/v2/guide/'
        }
      }).$mount()
      const href = vm.$el.getAttribute('href')
      expect(href).to.equal('https://cn.vuejs.org/v2/guide/')
    })

    it('可以设置 target', function(){
      const targetList = ['_self', '_blank', '_parent', '_top']
      targetList.forEach(target => {
        vm = new Constructor({
          propsData: {
            href: 'https://cn.vuejs.org/v2/guide/',
            target
          }
        }).$mount()
        const targetValue = vm.$el.getAttribute('target')
        expect(targetValue).to.equal(target)
      })
    })
  })

  describe('event ', function() {
    it('支持 click', function() {
      const Constructor = Vue.extend(WButton)
      const vm = new Constructor({}).$mount()
      const spy = sinon.fake()
      vm.$on('click', spy)
      vm.$el.click()
      expect(spy).to.have.been.called
      vm.$destroy()
    })
  })
})
