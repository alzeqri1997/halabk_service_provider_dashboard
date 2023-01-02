export default {
  async loadDashboardContent({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`provider/dashboard`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setDashboardContent', respo.data.data);
          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },

  async submitInterestsAndServices({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .post('/provider/payment/subscribe', data)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setPaymentDetails', respo.data.data);
          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async renewSubscription({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .post('/provider/payment/payment', data)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setPaymentDetails', respo.data.data);
          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
};
