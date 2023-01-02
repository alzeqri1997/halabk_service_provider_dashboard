import Vue from 'vue'
import vueDebounce from 'vue-debounce'
Vue.use(vueDebounce, {
  lock: false,
  listenTo: 'keyup',
  defaultTime: '1000ms',
  fireOnEmpty: false
})
