import Vue from 'vue'
import WButton from '../src/components/WButton.vue'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('WButton ', () => {
  it('存在', () => {
    expect(WButton).to.be.exist
  })

  describe('props ', () => {
    const Constructor = Vue.extend(WButton)
    let vm
    afterEach(() => {
      vm.$destroy()
    })

    it('可以设置 type', () => {
      vm = new Constructor({
        propsData: {
          type: 'primary'
        }
      }).$mount()
      const className = vm.$el.className.split(' ')[1]
      expect(className).to.equal('w-button-primary')
    })

    it('可以设置 shape', () => {
      vm = new Constructor({
        propsData: {
          shape: 'circle'
        }
      }).$mount()
      const className = vm.$el.className.split(' ')[1]
      expect(className).to.equal('w-button-circle')
    })

    it('可以设置 disabled', () => {
      vm = new Constructor({
        propsData: {
          disabled: true
        }
      }).$mount()
      const disabledAttribute = vm.$el.getAttribute('disabled')
      expect(disabledAttribute).to.equal('disabled')
    })

    it('可以设置 icon', () => {
      vm = new Constructor({
        propsData: {
          icon: 'setting'
        }
      }).$mount()
      const useElement = vm.$el.querySelector('use')
      const xlinkHref = useElement.getAttribute('xlink:href')
      expect(xlinkHref).to.equal('#icon-setting')
    })

    it('未设置 iconPosition 时，svg 元素的 order 为 0', () => {
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

    it('设置 iconPosition 为 right 时，svg 元素的 order 为 1', () => {
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

    it('可以设置 loading', () => {
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
  })

  describe('event ', () => {
    it('支持 click', () => {
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