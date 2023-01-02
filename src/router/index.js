import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '@/libs/i18n';
import axios from 'axios';
import { localize } from 'vee-validate';
import moment from 'moment';

import pages from './routes/pages';
import store from '@/store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      redirect: `/${i18n.locale}/`,
    },
    {
      path: '/:lang',
      component: {
        render(c) {
          return c('router-view');
        },
      },
      children: [...pages],
    },

    {
      path: '*',
      redirect: 'error-404',
    },
  ],
});

// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  var langs = ['ar', 'en'];
  if (langs.includes(to.params.lang)) {
    i18n.locale = to.params.lang;
    localize(to.params.lang);
    moment.locale(to.params.lang); // 'en'
    axios.defaults.headers.common['locale'] = to.params.lang;
    store.commit('TOGGLE_RTL', to.params.lang);
    if (to.meta.middleware) {
      const middleware = Array.isArray(to.meta.middleware)
        ? to.meta.middleware
        : [to.meta.middleware];

      const context = {
        from,
        next,
        router,
        to,
      };
      const nextMiddleware = nextFactory(context, middleware, 1);

      return middleware[0]({ ...context, next: nextMiddleware });
    }
    return next();
  } else {
    if (to.name) next({ name: to.name, params: { lang: i18n.locale } });
    else next({ name: 'dashboard', params: { lang: i18n.locale } });
  }
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg');
  if (appLoading) {
    appLoading.style.display = 'none';
  }
});

export default router;
