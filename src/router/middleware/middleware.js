import store from '@/store/index';
import Vue from 'vue';
export default function middleware({ to, next }) {
  let loginRoutes = [
    'login',
    'signup',
    'forgot-password',
    'reset-password',
    'validate-email',
    'verify-email',
  ];
  let loginData = Vue.$cookies.get('login-data', { parseJSON: true });
  if (loginData) {
    if (loginData.remember_me) {
      var date = Date.now();
      if (loginData.exp_date <= date) {
        store.dispatch('refreshToken', loginData.refresh_token).then(() => {
          if (loginRoutes.includes(to.name))
            return next({ name: 'dashboard', params: { lang: to.params.lang } });
          else return next();
        });
      } else {
        if (loginRoutes.includes(to.name))
          return next({ name: 'dashboard', params: { lang: to.params.lang } });
        else return next();
      }
    } else {
      if (loginRoutes.includes(to.name))
        return next({ name: 'dashboard', params: { lang: to.params.lang } });
      else return next();
    }
  } else {
    if (!loginRoutes.includes(to.name))
      return next({ name: 'login', params: { lang: to.params.lang } });
    else return next();
  }
}
