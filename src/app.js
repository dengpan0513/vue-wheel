import Vue from 'vue'
import WButton from './components/WButton.vue'
import WButtonGroup from './components/WButtonGroup.vue'
import WInput from './components/WInput.vue'

Vue.component('w-button', WButton)
Vue.component('w-button-group', WButtonGroup)
Vue.component('w-input', WInput)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    message: 'vue'
  }
})