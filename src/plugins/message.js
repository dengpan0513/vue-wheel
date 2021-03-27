import WMessage from '../components/WMessage.vue'

export default {
  install (Vue, options) {
    Vue.prototype.$message = (config) => {
      const Constructor = Vue.extend(WMessage)
      const message = new Constructor({
        propsData: config
      })
      console.log(message)
      message.$mount()
      document.body.appendChild(message.$el)
    }
  }
}