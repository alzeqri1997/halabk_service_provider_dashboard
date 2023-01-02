export default {
  async loadSubscriptionDetails({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`provider/subscription`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setSubscriptionDetails', respo.data.data);
          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
};
