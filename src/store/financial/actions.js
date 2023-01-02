// import axios from '@/plugins/axios';
export default {
  async loadFinancial({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(
        `provider/financials?order_by=${data.order_by}&search=${data.search}&year=${data.year}&month=${data.month}&page=${data.page}&per_page=${data.per_page}`
      )
      .then((respo) => {
        if (respo.status === 200) {
          commit('setFinancial', respo.data.data.content);

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async downloadInvoiceReceipt({ commit }, id) {
    return await this._vm.$http
      .get(`provider/invoice/financial/${id}`)
      .then((respo) => {
        if (respo.status === 200) {
          return respo.data.data;
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
};
