import Vue from 'vue'
import WInput from '../src/components/WInput.vue'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('WInput ', () => {
  it('存在', () => {
    expect(WInput).to.be.exist
  })

  describe('props ', () => {
    const Constructor = Vue.extend(WInput)
    let vm
    afterEach(() => {
      vm.$destroy()
    })

    it('可以设置 value', () => {
      vm = new Constructor({
        propsData: {
          value: 'test'
        }
      }).$mount()
      const inputElement = vm.$el.querySelector('input')
      expect(inputElement.value).to.equal('test')
    })

    it('可以设置 type', () => {
      vm = new Constructor({
        propsData: {
          type: 'password'
        }
      }).$mount()
      const inputElement = vm.$el.querySelector('input')
      expect(inputElement.type).to.equal('password')
    })

    it('可以设置 readonly', () => {
      vm = new Constructor({
        propsData: {
          readonly: true
        }
      }).$mount()
      const inputElement = vm.$el.querySelector('input')
      expect(inputElement.readOnly).to.equal(true)
    })

    it('可以设置 disabled', () => {
      const divElement = document.createElement('div')
      document.body.appendChild(divElement)
      vm = new Constructor({
        propsData: {
          disabled: true
        }
      }).$mount(divElement)
      const inputElement = vm.$el.querySelector('input')
      expect(inputElement.disabled).to.equal(true)
      const { cursor } = window.getComputedStyle(inputElement)
      expect(cursor).to.equal('not-allowed')
      vm.$el.remove()
    })

    it('可以设置 autofocus', () => {
      vm = new Constructor({
        propsData: {
          autofocus: true
        }
      }).$mount()
      const inputElement = vm.$el.querySelector('input')
      expect(inputElement.autofocus).to.equal(true)
    })

    it('可以设置 maxLength', () => {
      vm = new Constructor({
        propsData: {
          maxLength: '10'
        }
      }).$mount()
      const inputElement = vm.$el.querySelector('input')
      expect(inputElement.maxLength).to.equal(10)
    })

    it('可以设置 prefix', () => {
      vm = new Constructor({
        propsData: {
          prefix: 'up'
        }
      }).$mount()
      expect(vm.$el.classList.contains('w-input-wrapper-prefix')).to.equal(true)
      const useElement = vm.$el.querySelector('use')
      const xlinkHref = useElement.getAttribute('xlink:href')
      expect(xlinkHref).to.equal('#icon-up')
    })

    it('可以设置 suffix', () => {
      vm = new Constructor({
        propsData: {
          suffix: 'down'
        }
      }).$mount()
      expect(vm.$el.classList.contains('w-input-wrapper-suffix')).to.equal(true)
      const useElement = vm.$el.querySelector('use')
      const xlinkHref = useElement.getAttribute('xlink:href')
      expect(xlinkHref).to.equal('#icon-down')
    })

    it('可以设置 clearable，没有 value 时不存在 clear 图标', () => {
      vm = new Constructor({
        propsData: {
          clearable: true
        }
      }).$mount()
      const suffixWrapper = vm.$el.querySelector('.w-input-suffix-wrapper')
      expect(suffixWrapper).to.not.exist
      const svgElement = vm.$el.querySelector('svg')
      expect(svgElement).to.not.exist
    })

    it('可以设置 clearable，有 value 时存在 clear 图标', () => {
      vm = new Constructor({
        propsData: {
          value: '1234',
          clearable: true
        }
      }).$mount()
      const useElement = vm.$el.querySelector('use')
      const xlinkHref = useElement.getAttribute('xlink:href')
      expect(xlinkHref).to.equal('#icon-clear')
    })

    it('可以设置 showPassword', () => {
      vm = new Constructor({
        propsData: {
          showPassword: true
        }
      }).$mount()
      const inputElement = vm.$el.querySelector('input')
      expect(inputElement.type).to.equal('password')
      const useElement = vm.$el.querySelector('use')
      const xlinkHref = useElement.getAttribute('xlink:href')
      expect(xlinkHref).to.equal('#icon-eye-close')
    })
  })

  describe('event ', () => {
    const Constructor = Vue.extend(WInput)
    let vm = new Constructor().$mount()
    const spy = sinon.spy()
    afterEach(() => {
      vm.$destroy()
    })

    it('支持 input/change', () => {
      ['input', 'change'].forEach(eventName => {
        vm.$on(eventName, spy)
        const inputElement = vm.$el.querySelector('input')
        const triggerEvent = (value, event) => {
          inputElement.value = value
          inputElement.dispatchEvent(new Event(event))
        }
        triggerEvent('111', eventName)
        expect(spy).to.have.been.calledWith('111')
      })
    })

    it('支持 focus/blur', () => {
      ['focus', 'blur'].forEach(eventName => {
        vm.$on(eventName, spy)
        const inputElement = vm.$el.querySelector('input')
        const event = new Event(eventName)
        inputElement.dispatchEvent(event)
        expect(spy).to.have.been.calledWith(event)
      })
    })

    it('支持 clear', () => {
      vm = new Constructor({
        propsData: {
          clearable: true,
          value: '1234'
        }
      }).$mount()
      vm.$on('clear', spy)
      const svgElement = vm.$el.querySelector('svg')
      svgElement.dispatchEvent(new Event('click'))
      expect(spy).to.have.been.called
    })
  })
})