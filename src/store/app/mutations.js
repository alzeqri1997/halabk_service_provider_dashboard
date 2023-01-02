import ToastificationContent from '@/components/wameed/Wameedmessages.vue';
import i18n from '@/libs/i18n';
import Vue from 'vue';
export default {
  UPDATE_WINDOW_WIDTH(state, val) {
    state.windowWidth = val;
  },
  TOGGLE_OVERLAY(state, val) {
    state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay;
  },
  SET_LANG(state, lang) {
    if (state.locales.includes(lang.locale)) {
      state.language = lang;
    }
  },
  successMessage: (state, data) => {
    Vue.$toast(
      {
        component: ToastificationContent,
        props: {
          title: i18n.t('success_messages.' + data),
        },
      },
      {
        toastClassName: 'success-class',
        position: 'bottom-right',
      }
    );
    state.messages = 'success';
  },
  failMessage: (state, data) => {
    state.messages = 'error';
    Vue.$toast(
      {
        component: ToastificationContent,
        props: {
          title: i18n.t('error_messages.' + data),
        },
      },
      {
        toastClassName: 'fail-class',

        position: 'bottom-right',
      }
    );
  },
  loadingFinish: (state) => {
    state.loading = false;
  },
  loadingStart: (state) => {
    state.loading = true;
  },
};
