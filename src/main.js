import Vue from 'vue';
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue';
import VueCompositionAPI from '@vue/composition-api';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import i18n from '@/libs/i18n';
import router from './router';
import store from './store';
import App from './App.vue';
import './assets/svg/index';
import './assets/images/pages/index';

// Global Components
import './global-components';

// 3rd party plugins
import '@axios';
import '@/libs/portal-vue';
import '@/libs/vue-cookies';
import '@/libs/clipboard';
import '@/libs/toastification';
import '@/libs/quill-editor';
import '@/libs/sweet-alerts';
import '@/libs/vue-select';
import '@/libs/vue-debounce';
import '@/libs/moment';
import '@/libs/tour';
import '@/libs/google-map';
import '@/libs/calender';
import '@/libs/firebase';

// Axios Mock Adapter
// import '@/@fake-db/db'

// BSV Plugin Registration
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);

// Composition API
Vue.use(VueCompositionAPI);

// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
// require('@core/assets/fonts/feather/iconfont.css') // For form-wizard
// require('@core/assets/custom.scss') // For form-wizard

// import core styles
require('@core/scss/core.scss');

// import assets styles
require('@/assets/scss/style.scss');

Vue.config.productionTip = false;
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
window.addEventListener('message', (event) => {
  if (event.data.type === 'payment_success') {
    setTimeout(function () {
      window.location.reload();
    }, 6000);
  }
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
