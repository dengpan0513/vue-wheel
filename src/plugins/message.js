import WMessage from '../components/WMessage.vue'

const messageList = []
const baseGap = 16
let count = 1

export default {
  install (Vue) {
    Vue.prototype.$message = (config) => {
      let propsData = config || {}
      if (typeof config === 'string') {
        propsData = {
          content: config
        }
      }
      const Message = Vue.extend(WMessage)
      const message = new Message({
        propsData
      })
      message.$mount()
      message.visible = true
      document.body.appendChild(message.$el)
      let id = `w-message-${count++}`
      message.id = id
      message.$on('close', (instance) => {
        messageList.forEach((item, index) => {
          if (item.id === instance.id) {
            messageList.splice(index, 1)
          }
        })
      })
      let topValue = message.top
      messageList.forEach(item => {
        const { offsetHeight } = item.$el
        console.log('offsetHeight', offsetHeight)
        topValue += offsetHeight + baseGap
      })
      console.log(message, topValue)
      message.top = topValue
      messageList.push(message)
    }
  }
}
