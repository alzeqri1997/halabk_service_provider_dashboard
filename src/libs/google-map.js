import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBz-jO2cHx_PTk5Y5pdPY7uKqJig78LceU',
    libraries: 'places',
    region: 'AR',
    language: 'ar',
  },
});
