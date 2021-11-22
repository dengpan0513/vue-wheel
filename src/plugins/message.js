import WMessage from '../components/WMessage.vue'

const messageList = []
const gapBase = 16
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
      message.id = `w-message-${count++}`
      message.$on('close', (currentMessage) => {
        let index = -1
        let heightRemoved = 0
        messageList.forEach((item, i) => {
          if (item.id === currentMessage.id) {
            index = i
            messageList.splice(i, 1)
            heightRemoved = currentMessage.$el.offsetHeight
          }
        })
        const length = messageList.length
        if (length < 1 || index > length - 1) {
          return
        }
        for (let i = index; i < length; i++) {
          const messageElement = messageList[i].$el
          const topValue = parseInt(messageElement.style.top, 10)
          const topShould = topValue - heightRemoved - gapBase
          console.log('topShould', topShould)
          messageElement.style.top = topShould + 'px'
        }
      })
      let topValue = message.top
      if (messageList.length > 0) {
        messageList.forEach(item => {
          const { offsetHeight } = item.$el
          topValue += offsetHeight + gapBase
        })
      }
      message.top = topValue
      messageList.push(message)
    }
  }
}
