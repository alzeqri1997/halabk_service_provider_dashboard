export default {
  async loadBookings({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(
        `provider/bookings?order_by=${data.order_by}&search=${data.search}&year=${data.year}&month=${data.month}&page=${data.page}&per_page=${data.per_page}`
      )
      .then((respo) => {
        if (respo.status === 200) {
          commit('setBookings', respo.data.data);
          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async loadServiceBookings({ commit }, { data, serviceId }) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(
        `provider/services/${serviceId}/bookings?order_by=${data.order_by}&search=${data.search}&year=${data.year}&month=${data.month}&page=${data.page}&per_page=${data.per_page}`
      )
      .then((respo) => {
        if (respo.status === 200) {
          commit('setBookings', respo.data.data);
          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async loadBookingsDetails({ commit }, applicantsId) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`provider/bookings/${applicantsId}`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setBookingDetails', respo.data.data);

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
};
