import WMessage from '../components/WMessage.vue'

const typeList = ['info', 'success', 'warning', 'error']
const messageList = []
const gapBase = 16
let count = 1

const listenMessageClose = (currentMessage) => {
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
    messageElement.style.top = topShould + 'px'
  }
}

const dynamicCalculateTop = (message) => {
  let top = message.top
  if (messageList.length > 0) {
    messageList.forEach(item => {
      const { offsetHeight } = item.$el
      top += offsetHeight + gapBase
    })
  }
  return top
}

const createMessage = (Vue, config) => {
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
  message.id = `w-message-${count++}`
  document.body.appendChild(message.$el)
  message.$on('close', (currentMessage) => {
    listenMessageClose(currentMessage)
  })
  message.top = dynamicCalculateTop(message)
  messageList.push(message)
  return message
}

export default {
  install (Vue) {
    Vue.prototype.$message = (config) => {
      return createMessage(Vue, config)
    }
    typeList.forEach(type => {
      Vue.prototype.$message[type] = (config) => {
        const option = config || {}
        if (typeof config === 'string') {
          return createMessage(Vue, { type, content: option })
        } else {
          return createMessage(Vue, { type, ...option})
        }
      }
    })
  }
}
