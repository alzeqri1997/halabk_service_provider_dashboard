import i18n from '@/libs/i18n';
import middleware from '../middleware/middleware';
import middlewareAccountState from '../middleware/middlewareAccountState';
import addPackageRestrictions from '../middleware/addPackageRestrictions';

export default [
  {
    path: 'signup',
    name: 'signup',
    component: () => import('@/views/pages/authentication/Signup.vue'),
    meta: {
      middleware: middleware,
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
      authImage: 'login-bg',
    },
  },
  {
    path: 'edit-profile',
    name: 'edit-profile',
    component: () =>
      import('@/views/pages/authentication/resendProfileInformation.vue'),
    meta: {
      middleware: [middleware, middlewareAccountState],
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
      authImage: 'login-bg',
    },
  },
  {
    path: 'login',
    name: 'login',
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      middleware: middleware,
      layout: 'auth',
      resource: 'Auth',
      redirectIfLoggedIn: true,
      authImage: 'login-bg',
    },
  },
  {
    path: 'forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/pages/authentication/ForgotPassword.vue'),
    meta: {
      middleware: middleware,
      layout: 'auth',
      resource: 'Auth',
      redirectIfLoggedIn: true,
      authImage: '',
    },
  },
  {
    path: 'reset-password/:token',
    name: 'reset-password',
    component: () => import('@/views/pages/authentication/ResetPassword.vue'),
    meta: {
      middleware: middleware,
      layout: 'auth',
      resource: 'Auth',
      redirectIfLoggedIn: true,
      authImage: 'login-bg',
    },
  },
  {
    path: 'validate-email',
    name: 'validate-email',
    component: () => import('@/views/pages/authentication/ValidateEmail.vue'),
    meta: {
      middleware: middleware,
      layout: 'auth',
      resource: 'Auth',
      redirectIfLoggedIn: true,
      authImage: 'login-bg',
    },
  },
  {
    path: 'verify-email',
    name: 'verify-email',
    component: () => import('@/views/pages/authentication/VerifyEmail.vue'),
    meta: {
      middleware: middleware,
      layout: 'auth',
      resource: 'Auth',
      redirectIfLoggedIn: true,
      authImage: '',
      noBackButton: true,
    },
  },
  {
    path: '',
    name: 'home',
    redirect: `/${i18n.locale}/dashboard`,
  },
  {
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/views/pages/dashboard/dashboard.vue'),
    meta: {
      middleware: [middleware, middlewareAccountState],
    },
  },
  {
    path: 'notification',
    name: 'notification',
    component: () => import('@/views/pages/dashboard/notification.vue'),
    meta: {
      middleware: [middleware, middlewareAccountState],
    },
  },
  {
    path: 'chats',
    name: 'chats',
    component: () => import('@/views/pages/chats/index.vue'),
    meta: {
      middleware: [middleware, middlewareAccountState],
    },
    props: true,
  },
  {
    path: 'packages',
    component: {
      render(c) {
        return c('router-view');
      },
    },

    children: [
      {
        path: '',
        name: 'packages',
        component: () => import('@/views/pages/packages/index.vue'),
        meta: {
          middleware: [middleware, middlewareAccountState],
        },
      },
      {
        path: 'add-package',
        name: 'addPackage',
        component: () => import('@/views/pages/packages/AddPackage.vue'),
        meta: {
          middleware: [middleware, middlewareAccountState, addPackageRestrictions],
        },
      },
      {
        path: ':id',
        name: 'package-details',
        component: () => import('@/views/pages/packages/details.vue'),
        meta: {
          middleware: [middleware, middlewareAccountState],
        },
      },
    ],
  },
  {
    path: 'bookings',
    component: {
      render(c) {
        return c('router-view');
      },
    },
    children: [
      {
        path: '',
        name: 'bookings',
        component: () => import('@/views/pages/bookings/index.vue'),
        meta: {
          middleware: [middleware, middlewareAccountState],
        },
      },
      {
        path: ':id',
        name: 'booking-details',
        component: () => import('@/views/pages/bookings/details.vue'),
        meta: {
          middleware: [middleware, middlewareAccountState],
        },
      },
    ],
  },
  {
    path: 'reviews',
    component: {
      render(c) {
        return c('router-view');
      },
    },
    children: [
      {
        path: '',
        name: 'reviews',
        component: () => import('@/views/pages/reviews/index.vue'),
        meta: {
          middleware: [middleware, middlewareAccountState],
        },
      },
    ],
  },
  {
    path: 'financial-operations',
    name: 'financial-operations',
    component: () => import('@/views/pages/financial/index.vue'),
    meta: {
      middleware: [middleware, middlewareAccountState],
    },
  },
  {
    path: 'profits',
    name: 'profits',
    component: () => import('@/views/pages/profits/index.vue'),
    meta: {
      middleware: [middleware, middlewareAccountState],
    },
  },
  {
    path: 'coupons',
    component: {
      render(c) {
        return c('router-view');
      },
    },

    children: [
      {
        path: '',
        name: 'coupons',
        component: () => import('@/views/pages/coupons/index.vue'),
        meta: {
          middleware: [middleware, middlewareAccountState],
        },
      },
      {
        path: 'add-coupon',
        name: 'addCoupon',
        component: () => import('@/views/pages/coupons/AddCoupon.vue'),
        meta: {
          middleware: [middleware, middlewareAccountState],
        },
      },
      {
        path: ':id',
        name: 'coupon-details',
        component: () => import('@/views/pages/coupons/details.vue'),
        meta: {
          middleware: [middleware, middlewareAccountState],
        },
      },
    ],
  },
  {
    path: 'settings',
    component: {
      render(c) {
        return c('router-view');
      },
    },
    children: [
      {
        path: '',
        name: 'settings',
        component: () => import('@/views/pages/settings/settings.vue'),
        meta: {
          middleware: [middleware, middlewareAccountState],
        },
      },
      {
        path: 'company-details',
        name: 'company-details',
        component: () => import('@/views/pages/settings/company-details/company-details.vue'),
        meta: {
          middleware: [middleware, middlewareAccountState],
        },
      },
      {
        path: 'subscription',
        name: 'subscription',
        component: () => import('@/views/pages/settings/subscription/Subscription.vue'),
        meta: {
          middleware: [middleware, middlewareAccountState],
        },
      },
    ],
  },
];
