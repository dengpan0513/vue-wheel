import Vue from 'vue'
import WIcon from '../src/components/WIcon.vue'

Vue.config.productionTip = false
Vue.config.devtools = false

const expect = chai.expect

describe('WIcon ', () => {
  it('存在', () => {
    expect(WIcon).to.be.exist
  })

  describe('props ', () => {
    const Constructor = Vue.extend(WIcon)
    let vm
    afterEach(() => {
      vm.$destroy()
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
  })
})