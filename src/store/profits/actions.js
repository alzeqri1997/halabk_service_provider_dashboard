export default {
  async loadProfits({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`provider/profits?order_by=${data.order_by}&search=${data.search}&status=${data.status}&year=${data.year}&month=${data.month}&page=${data.page}&per_page=${data.per_page}`)
      .then(respo => {
        if (respo.status === 200) {
          commit('setProfits', respo.data.data.content);

          commit('loadingFinish');
        }
      })
      .catch(error => {
        commit('loadingFinish');
        throw error;
      });
  },
};
