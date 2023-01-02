import router from '@/router';

export default {
  async loadPackages({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(
        `provider/services?page=${data.page}&per_page=${data.per_page}&status=${data.status}&city=${data.city}&order_by=${data.order_by}&search=${data.search}`
      )
      .then((respo) => {
        if (respo.status === 200) {
          commit('setPackages', respo.data);
          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async loadPackagesDetails({ commit }, applicantsId) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`provider/services/${applicantsId}`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setPackageDetails', respo.data.data);

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async addPackage({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .post(`provider/services/create`, data)
      .then((respo) => {
        if (respo.status === 200) {
          if (respo.data.data.restrictions) {
            commit('failMessage', "403");
          } else {
            commit('loadingFinish');
            commit('successMessage', 'package_added_successfully');
            
          }
          router.push({ name: 'packages' });
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async submitChangeStatus({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .post(`provider/services/change-status`, data)
      .then((respo) => {
        if (respo.status === 200) {
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
};
