import Vue from 'vue';
import store from '@/store/index';

export default function ({ to, next }) {
  const loginData = Vue.$cookies.get('login-data', { parseJSON: true });
  if (loginData) {
    if (store.getters.getProfileInfo) {
      const [offersCount] = store.getters.getProfileInfo.restrictions.filter(
        (item) => item.name === 'offers_count'
      )
      if (offersCount.code === '02_01_01') {
        return next({ name: 'packages', params: { lang: to.params.lang } });
      }
      return next();
    }
    return next();
  }
  return next({ name: 'login', params: { lang: to.params.lang } });
}
