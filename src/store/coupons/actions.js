// import axios from '@/plugins/axios';
import i18n from '@/libs/i18n';
import router from '@/router';

export default {
  async loadCoupons({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`provider/coupons?order_by=${data.order_by}&search=${data.search}&status=${data.status}&city=${data.city}&year=${data.year}&month=${data.month}&page=${data.page}&per_page=${data.per_page}`)
      .then(respo => {
        if (respo.status === 200) {
          commit('setCoupons', respo.data.data);

          commit('loadingFinish');
        }
      })
      .catch(error => {
        commit('loadingFinish');
        throw error;
      });
  },
  async addCoupon({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .post('provider/coupons/create', data)
      .then(respo => {
        if (respo.status === 200) {
          router.push({ name: 'coupons', params: { lang: i18n.locale } });
          commit('loadingFinish');
          commit('successMessage', 'coupon_added_successfully');
        }
      })
      .catch(error => {
        commit('loadingFinish');
        throw error;
      });
  },
  async loadCouponDetails({ commit }, id) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`provider/coupons/${id}`)
      .then(respo => {
        if (respo.status === 200) {
          commit('setCouponDetails', respo.data);

          commit('loadingFinish');
        }
      })
      .catch(error => {
        commit('loadingFinish');
        throw error;
      });
  },
  async stopCoupon({ commit }, id) {
    commit('loadingStart', null);
    await this._vm.$http
      .post(`provider/coupons/${id}/stop`)
      .then(respo => {
        if (respo.status === 200) {
          router.push({ name: 'coupons', params: { lang: i18n.locale } });
          commit('loadingFinish');
          commit('successMessage', 'coupon_stopped_successfully');
        }
      })
      .catch(error => {
        commit('loadingFinish');
        throw error;
      });
  },
  async updateStateCoupon({ commit, state }, jobId) {
    commit('loadingStart', null);
    await this._vm.$http
      .put(`jobs/${jobId}/change-state`)
      .then(respo => {
        if (respo.status === 200) {
          commit('setCouponChangedState');
          commit(
            'successMessage',
            state.jobDetails.state == 0 ? 'mealActivated' : 'mealHidded',
          );
          commit('loadingFinish');
        }
      })
      .catch(error => {
        commit('loadingFinish');
        throw error;
      });
  },
  async loadAllCouponDropdown({ commit }) {
    commit('loadingStart', null);
    await this._vm.$http
      .get('provider/coupons/services')
      .then(respo => {
        if (respo.status === 200) {
          commit('setAllCouponDropdown', respo.data.data);

          commit('loadingFinish');
        }
      })
      .catch(error => {
        commit('loadingFinish');
        throw error;
      });
  },
  async loadCouponUsers({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`provider/coupons/${data.couponId}/usage?page=${data.page}&per_page=${data.per_page}`)
      .then(respo => {
        if (respo.status === 200) {
          commit('setCouponUsers', respo.data.data);

          commit('loadingFinish');
        }
      })
      .catch(error => {
        commit('loadingFinish');
        throw error;
      });
  },
};
