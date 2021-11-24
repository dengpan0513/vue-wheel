import Vue from 'vue'
import WMessage from '../src/components/WMessage.vue'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('WMessage ', function() {
  it('存在', function() {
    expect(WMessage).to.be.exist
  })

  describe('props ', function() {
    const Constructor = Vue.extend(WMessage)
    let vm
    afterEach(() => {
      vm.$destroy()
    })

    it('可以设置 type', function() {
      const typeList = ['info', 'success', 'warning', 'error']
      typeList.forEach(type => {
        vm = new Constructor({
          propsData: {
            type
          }
        }).$mount()
        const useElement = vm.$el.querySelector('svg > use')
        const xlinkHref = useElement.getAttribute('xlink:href')
        expect(xlinkHref).to.equal(`#icon-${type}`)
      })
    })

    it('可以设置 icon', function() {
      vm = new Constructor({
        propsData: {
          icon: 'setting'
        }
      }).$mount()
      const useElement = vm.$el.querySelector('svg > use')
      const xlinkHref = useElement.getAttribute('xlink:href')
      expect(xlinkHref).to.equal('#icon-setting')
    })

    it('可以设置 iconColor', function() {
      const divElement = document.createElement('div')
      document.body.appendChild(divElement)
      vm = new Constructor({
        propsData: {
          icon: 'setting',
          iconColor: 'red'
        }
      }).$mount(divElement)
      const icon = vm.$el.querySelector('.w-message-icon')
      expect(getComputedStyle(icon).color).to.equal('rgb(255, 0, 0)')
      vm.$el.remove()
    })

    it('可以设置 content', function() {
      vm = new Constructor({
        propsData: {
          content: 'test'
        }
      }).$mount()
      const span = vm.$el.querySelector('.w-message-content')
      expect(span.textContent).to.equal('test')
    })

    it('同时设置 type 和 icon，最终会显示 icon', function() {
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

    it('可以设置 dangerouslyUseHTML', function() {
      vm = new Constructor({
        propsData: {
          content: '<strong id="test">test</strong>',
          dangerouslyUseHTML: true
        }
      }).$mount()
      const strongElement = vm.$el.querySelector('#test')
      expect(strongElement).to.be.exist
    })

    it('可以设置 duration', function(done) {
      this.timeout(4000)
      const divElement = document.createElement('div')
      document.body.appendChild(divElement)
      vm = new Constructor({
        propsData: {
          duration: 1
        }
      }).$mount(divElement)
      vm.visible = true
      setTimeout(() => {
        expect(document.body.contains(vm.$el)).to.be.false
        vm.$el.remove()
        done()
      }, 2000)
    })

    it('可以设置 onClose', function(done) {
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

    it('可以设置 closeable', function() {
      vm = new Constructor({
        propsData: {
          closeable: true
        }
      }).$mount()
      const useElement = vm.$el.querySelector('.w-message-close > use')
      const xlinkHref = useElement.getAttribute('xlink:href')
      expect(xlinkHref).to.equal('#icon-close')
    })

    it('可以设置 top', function() {
      const divElement = document.createElement('div')
      document.body.appendChild(divElement)
      vm = new Constructor({
        propsData: {
          top: 24
        }
      }).$mount(divElement)
      expect(getComputedStyle(vm.$el).top).to.equal('24px')
      vm.$el.remove()
    })
  })

  describe('event ', function() {
    it('支持 close', function(done) {
      const divElement = document.createElement('div')
      document.body.appendChild(divElement)
      const spy = sinon.spy()
      const Constructor = Vue.extend(WMessage)
      const vm = new Constructor({
        propsData: {
          duration: 1,
          onClose () {
            spy()
          }
        }
      }).$mount(divElement)
      vm.$on('close', () => {
        expect(spy).to.have.been.called
        done()
      })
    })
  })
})
