import WMessage from '../components/WMessage.vue'

export default {
  install (Vue) {
    Vue.prototype.$message = (config) => {
      const Message = Vue.extend(WMessage)
      const message = new Message({
        propsData: config
      })
      message.$mount()
      // message.visible = true
      document.body.appendChild(message.$el)
    }
  }
}
