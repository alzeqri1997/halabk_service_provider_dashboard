// import Vue from 'vue'

// // Lib imports
// import axios from 'axios'

// Vue.prototype.$http = axios
// s
import store from '@/store/index';
import Vue from 'vue';
import axios from 'axios';
Vue.prototype.$http = axios;
// This is the life mode URL
Vue.prototype.$http.defaults.baseURL =
'https://backend.halabk.sa/api/' + store.getters['getLang'] + '/';
Vue.prototype.$http.defaults.headers.common['locale'] = 'ar';
Vue.prototype.$http.defaults.headers.post['Content-Type'] =
  'application/json;  charset=UTF-8';

Vue.prototype.$http.interceptors.request.use((request) => {
  // Update token axios header
  var authToken = request.headers.common['Authorization'];
  if (!authToken) {
    let loginData = Vue.$cookies.get('login-data', { parseJSON: true });
    if (loginData) {
      request.headers.common['Authorization'] = 'Bearer ' + loginData.access_token;
    }
  }
  return request;
});

Vue.prototype.$http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 400) {
      store.commit(
        'failMessage',
        error.response.data.code ? error.response.data.code : 'error'
      );
    }

    if (error.response.status === 401) {
      store.dispatch('logout');
      store.commit('failMessage', error.response.status);
    }
    if (
      error.response.status === 404 ||
      error.response.status === 422 ||
      error.response.status === 403 ||
      error.response.status === 500
    ) {
      store.commit('failMessage', error.response.status);
    }
  }
);
