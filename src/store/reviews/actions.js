// import axios from '@/plugins/axios';
import i18n from '@/libs/i18n';
import router from '@/router';
export default {
  async loadReviews({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`provider/reviews?page=${data.page}&per_page=${data.per_page}`)
      .then((respo) => {
        if (respo.status === 200) {
          const { data } = respo.data;
          commit('setReviews', data);
          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async deleteReview({ commit }, reviewId) {
    commit('loadingStart', null);
    await this._vm.$http
      .delete(`provider/reviews/${reviewId}`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('deleteOneReview', reviewId);
          commit('successMessage', 'review_deleted_successfully');
          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
};
