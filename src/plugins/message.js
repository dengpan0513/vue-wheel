import WMessage from '../components/WMessage.vue'

let messageInstance
let messageInstances = []
let count = 1

const Message = (Vue, config) => {
  const MessageConstructor = Vue.extend(WMessage)
  messageInstance = new MessageConstructor({
    propsData: config
  })
  let id = 'w-meesage' + count++
  messageInstance.id = id
  messageInstance.content += id
  messageInstance.onClose = () => {
    Message.close(id, config.onClose)
  }
  messageInstance.$mount()
  document.body.appendChild(messageInstance.$el)
  let topReal = messageInstance.top
  messageInstances.forEach(item => {
    topReal += item.$el.offsetHeight + 16
  })
  messageInstance.top = topReal
  messageInstances.push(messageInstance)
  return messageInstance
}

Message.close = (id, userOnClose) => {
  let length = messageInstances.length
  let index = -1
  let removeHeight
  messageInstances.forEach((item, i) => {
    if (item.id === id) {
      removeHeight = item.$el.offsetHeight
      index = i
      userOnClose && userOnClose(item)
      messageInstances.splice(i, 1)
    }
  })
  if (length <= 1 || index === -1 || index > messageInstances.length - 1) return
  for (let i = index; i < length - 1 ; i++) {
    let messageNext = messageInstances[i].$el
    let top = parseInt(messageNext.style.top, 10) - removeHeight - 16
    messageNext.style.top = `${top}px`
  }
}

export default {
  install (Vue) {
    Vue.prototype.$message = (config) => {
      Message(Vue, config)
    }
  }
}