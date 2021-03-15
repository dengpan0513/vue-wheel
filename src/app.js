import Vue from 'vue'
import WButton from './components/WButton.vue'
import WButtonGroup from './components/WButtonGroup.vue'
import WInput from './components/WInput.vue'
import WRow from './components/WRow.vue'
import WCol from './components/WCol.vue'

Vue.component('w-button', WButton)
Vue.component('w-button-group', WButtonGroup)
Vue.component('w-input', WInput)
Vue.component('w-row', WRow)
Vue.component('w-col', WCol)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    message: '落霞与孤鹜齐飞，秋水共长天一色'
  }
})