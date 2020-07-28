import Vue from 'vue'
import WButton from './components/WButton.vue'

Vue.component('w-button', WButton)

new Vue({
  el: '#app',
  data: {
    loading1: false
  }
})