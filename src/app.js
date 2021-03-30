import Vue from 'vue'
import WButton from './components/WButton.vue'
import WButtonGroup from './components/WButtonGroup.vue'
import WInput from './components/WInput.vue'
import WRow from './components/WRow.vue'
import WCol from './components/WCol.vue'
import WLayout from './components/WLayout.vue'
import WHeader from './components/WHeader.vue'
import WSider from './components/WSider.vue'
import WContent from './components/WContent.vue'
import WFooter from './components/WFooter.vue'

Vue.component('w-button', WButton)
Vue.component('w-button-group', WButtonGroup)
Vue.component('w-input', WInput)
Vue.component('w-row', WRow)
Vue.component('w-col', WCol)
Vue.component('w-layout', WLayout)
Vue.component('w-header', WHeader)
Vue.component('w-sider', WSider)
Vue.component('w-content', WContent)
Vue.component('w-footer', WFooter)

import Message from './plugins/message.js'

Vue.use(Message)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    message: '落霞与孤鹜齐飞，秋水共长天一色'
  },
  methods: {
    showMessage () {
      this.$message({
        dangerouslyEnableHTML: true,
        content: '<strong class="xxx">落霞与孤鹜齐飞，秋水共长天一色</strong>',
        type: 'success',
        closeable: true,
        duration: 0
      })
    }
  }
})