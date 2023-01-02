// import axios from '@/plugins/axios';
import i18n from '@/libs/i18n';
import router from '@/router';

export default {
  async loadFile({ commit }, file) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(
        `https://backend-wameed.wameedprojects.com/api/v1/file/download/${file}`,
        {
          responseType: 'blob',
        }
      )
      .then((respo) => {
        if (respo.status === 200) {
          commit('loadingFinish');
          const blob = respo.data;

          const a = window.document.createElement('a');
          a.href = window.URL.createObjectURL(blob);
          a.download = file;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async loadFilterData({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .get(`provider/filters?service=${data}`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setFilterData', respo.data.data);

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async loadInnerFilterData({ commit }, { data, type = 'service', id = '' }) {
    commit('loadingStart', null);

    await this._vm.$http
      .get(`provider/filters?service=${data}&type=${type}&id=${id}`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('setFilterData', respo.data.data);

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
};
