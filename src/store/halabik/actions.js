// import axios from '@/plugins/axios';
import i18n from '@/libs/i18n';
import router from '@/router';
export default {
  async loadSubscriptions({ commit }) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`/halabk/subscriptions`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setSubscriptions', respo.data.data);

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async loadAllPackageDropdown({ commit }) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`provider/services/dropdown`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setAllPackageDropdown', respo.data.data);

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async loadAllInterests({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`halabk/interests`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setAllInterests', respo.data.data);

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async loadAllCountries({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`halabk/countries`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setAllCountries', respo.data.data);

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async loadAllSaudiCities({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`halabk/saudia-cities`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setAllSaudiCities', respo.data.data);

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async loadAllAccountTypes({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`halabk/account-types`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setAllAccountTypes', respo.data.data);

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async markAsRead({ commit }) {
    commit('loadingStart', null);
    await this._vm.$http
      .post('provider/notifications/mark-read')
      .then((respo) => {
        if (respo.status === 200) {
          router.push({ name: 'notification', params: { lang: i18n.locale } });
          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async loadAllNotifications({ commit }, data = '') {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`provider/notifications?per_page=${data}`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setAllNotifications', respo.data.data.data);

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async uploadFiles({ commit }, data) {
    return await this._vm.$http
      .post(`upload-files`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((respo) => {
        if (respo.status === 200) {
          return respo.data.data;
        }
      })
      .catch((error) => {
        // commit('loadingFinish');
        throw error;
      });
  },
};
