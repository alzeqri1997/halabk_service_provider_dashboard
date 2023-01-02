export default {
  async loadProfileInfo({ commit }, data) {
    commit('loadingStart', null);
    return await this._vm.$http
      .get(`provider/profile`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setProfileInfo', respo.data.data);

          commit('loadingFinish');
          return respo.data.data;
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async loadBusinessProfileInfo({ commit }, data) {
    commit('loadingStart', null);
    return await this._vm.$http
      .get(`provider/profile/business`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setBusinessProfileInfo', respo.data.data);

          commit('loadingFinish');
          return respo.data.data;
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async updateBusinessProfileInfo({ commit }, data) {
    commit('loadingStart', null);
    return await this._vm.$http
      .post(`provider/profile/business`, data)
      .then((respo) => {
        if (respo.status === 200) {
          commit('loadingFinish');
          commit('successMessage', 'contacts_changed');
          return respo.data.data;
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async updateBusinessProfileInfoContact({ commit }, data) {
    commit('loadingStart', null);
    return await this._vm.$http
      .post(`provider/profile/business/contacts`, data)
      .then((respo) => {
        if (respo.status === 200) {
          commit('loadingFinish');
          commit('successMessage', 'contacts_changed');
          return respo.data.data;
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
};
