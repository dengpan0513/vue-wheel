import Vue from 'vue'
import WMessage from '../src/components/WMessage.vue'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('WMessage ', () => {
  it('存在', () => {
    expect(WMessage).to.be.exist
  })

  describe('props ', () => {
    const Constructor = Vue.extend(WMessage)
    let vm
    afterEach(() => {
      vm.$destroy()
    })

    it('可以设置 content', () => {
      vm = new Constructor({
        propsData: {
          content: 'test'
        }
      }).$mount()
      const spanContent = vm.$el.querySelector('.w-message-content')
      expect(spanContent.textContent).to.equal('test')
    })

    it('可以设置 type', () => {
      vm = new Constructor({
        propsData: {
          type: 'error'
        }
      }).$mount()
      const useElement = vm.$el.querySelector('svg > use')
      const xlinkHref = useElement.getAttribute('xlink:href')
      expect(xlinkHref).to.equal('#icon-error')
    })

    it('可以设置 icon', () => {
      vm = new Constructor({
        propsData: {
          icon: 'setting'
        }
      }).$mount()
      const useElement = vm.$el.querySelector('svg > use')
      const xlinkHref = useElement.getAttribute('xlink:href')
      expect(xlinkHref).to.equal('#icon-setting')
    })

    it('可以同时设置 type 和 icon，会显示 icon', () => {
      vm = new Constructor({
        propsData: {
          type: 'success',
          icon: 'setting'
        }
      }).$mount()
      const useElement = vm.$el.querySelector('svg > use')
      const xlinkHref = useElement.getAttribute('xlink:href')
      expect(xlinkHref).to.equal('#icon-setting')
    })

    it('可以设置 iconColor', () => {
      const divElement = document.createElement('div')
      document.body.appendChild(divElement)
      vm = new Constructor({
        propsData: {
          icon: 'setting',
          iconColor: 'black'
        }
      }).$mount(divElement)
      const iconWrapper = vm.$el.querySelector('.w-message-icon-wrapper')
      expect(getComputedStyle(iconWrapper).color).to.equal('rgb(0, 0, 0)')
      const svgElement = vm.$el.querySelector('svg')
      expect(getComputedStyle(svgElement).color).to.equal('rgb(0, 0, 0)')
      vm.$el.remove()
    })

    it('可以设置 duration', (done) => {
      const divElement = document.createElement('div')
      document.body.appendChild(divElement)
      vm = new Constructor({
        propsData: {
          duration: 1
        }
      }).$mount(divElement)
      setTimeout(() => {
        expect(document.body.contains(vm.$el)).to.be.false
        vm.$el.remove()
        done()
      }, 1500)
    })

    it('可以设置 duration 为 0，表示 WMessage 不会自动关闭', (done) => {
      const spy = sinon.spy()
      vm = new Constructor({
        propsData: {
          duration: 0,
          onClose () {
            spy()
          }
        }
      }).$mount()
      setTimeout(() => {
        expect(spy).to.have.been.not.be.called
        done()
      }, 1500)
    })

    it('可以设置 top', () => {
      const divElement = document.createElement('div')
      document.body.appendChild(divElement)
      vm = new Constructor({
        propsData: {
          top: 48
        }
      }).$mount(divElement)
      expect(getComputedStyle(vm.$el).top).to.equal('48px')
      vm.$el.remove()
    })

    it('可以设置 closeable', () => {
      vm = new Constructor({
        propsData: {
          closeable: true
        }
      }).$mount()
      const useElement = vm.$el.querySelector('svg > use')
      const xlinkHref = useElement.getAttribute('xlink:href')
      expect(xlinkHref).to.equal('#icon-close')
    })

    it('可以设置 dangerouslyEnableHTML', () => {
      vm = new Constructor({
        propsData: {
          content: '<strong id="test">test</strong>',
          dangerouslyEnableHTML: true
        }
      }).$mount()
      const strongElement = vm.$el.querySelector('#test')
      expect(strongElement).to.be.exist
    })

    it('可以设置 onClose', (done) => {
      const spy = sinon.spy()
      vm = new Constructor({
        propsData: {
          duration: 1,
          onClose () {
            spy()
          }
        }
      }).$mount()
      setTimeout(() => {
        expect(spy).to.have.been.called
        done()
      }, 1500)
    })
  })
})