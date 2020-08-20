import Vue from 'vue'
import WButton from './components/WButton.vue'
import WButtonGroup from './components/WButtonGroup.vue'

Vue.component('w-button', WButton)
Vue.component('w-button-group', WButtonGroup)

new Vue({
  el: '#app',
  data: {
    loading1: false
  }
})

// WButton 单元测试
import chai from 'chai'
import spies from 'chai-spies'
chai.use(spies)
const expect = chai.expect

{
  const Constructor = Vue.extend(WButton)
  const vm = new Constructor({
    propsData: {
      type: 'primary'
    }
  })
  vm.$mount()
  const classArray = vm.$el.className.split(' ')
  const className = classArray[1]
  expect(className).to.equal('w-button-primary')
  vm.$destroy()
}

{
  const Constructor = Vue.extend(WButton)
  const vm = new Constructor({
    propsData: {
      shape: 'circle'
    }
  })
  vm.$mount()
  const classArray = vm.$el.className.split(' ')
  const className = classArray[1]
  expect(className).to.equal('w-button-circle')
  vm.$destroy()
}

{
  const Constructor = Vue.extend(WButton)
  const vm = new Constructor({
    propsData: {
      disabled: true
    }
  })
  vm.$mount()
  const disabledAttribute = vm.$el.getAttribute('disabled')
  expect(disabledAttribute).to.equal('disabled')
  vm.$destroy()
}

{
  const Constructor = Vue.extend(WButton)
  const vm = new Constructor({
    propsData: {
      icon: 'setting'
    }
  })
  vm.$mount()
  const useElement = vm.$el.querySelector('use')
  const xlinkHref = useElement.getAttribute('xlink:href')
  expect(xlinkHref).to.equal('#icon-setting')
  vm.$destroy()
}

{
  const divElement = document.createElement('div')
  document.body.appendChild(divElement)
  const Constructor = Vue.extend(WButton)
  const vm = new Constructor({
    propsData: {
      icon: 'setting'
    }
  })
  vm.$mount(divElement)
  const svgElement = vm.$el.querySelector('svg')
  const { order } = window.getComputedStyle(svgElement)
  expect(order).to.equal('1')
  vm.$el.remove()
  vm.$destroy()
}

{
  const divElement = document.createElement('div')
  document.body.appendChild(divElement)
  const Constructor = Vue.extend(WButton)
  const vm = new Constructor({
    propsData: {
      icon: 'setting',
      iconPosition: 'right'
    }
  })
  vm.$mount(divElement)
  const svgElement = vm.$el.querySelector('svg')
  const { order } = window.getComputedStyle(svgElement)
  expect(order).to.equal('2')
  vm.$el.remove()
  vm.$destroy()
}

{
  const Constructor = Vue.extend(WButton)
  const vm = new Constructor({
    propsData: {
      icon: 'setting',
      loading: true
    }
  })
  vm.$mount()
  const svgElements = vm.$el.querySelectorAll('svg')
  expect(svgElements.length).to.equal(1)
  const useElement = vm.$el.querySelector('use')
  const xlinkHref = useElement.getAttribute('xlink:href')
  expect(xlinkHref).to.equal('#icon-loading')
  vm.$destroy()
}

{
  const Constructor = Vue.extend(WButton)
  const vm = new Constructor({
    propsData: {
      icon: 'setting'
    }
  })
  vm.$mount()
  const spy = chai.spy(function () {})
  vm.$on('click', spy)
  vm.$el.click()
  expect(spy).to.have.been.called()
  vm.$destroy()
}