// import axios from '@/plugins/axios';
// import i18n from '@/i18n';
// import router from '@/router';
export default {
  async loadAllChatUsers({ commit }) {
    // commit('loadingStart', null);
    return await this._vm.$http
      .get('provider/chats')
      .then((response) => {
        if (response.status === 200) {
          // commit('loadingFinish');
          return response.data.data;
          // commit('SET_CHAT_USERS', response.data.data);
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },

  async loadPrivateMessages({ commit }, userId) {
    return await this._vm.$http
      .get(`provider/chats/${userId}?type=provider`)
      .then((response) => {
        // commit('SET_MESSAGES', response.data.data);
        return response.data.data;
      })
      .catch((error) => {
        throw error;
      });
  },

  async sendPrivateMessages({ commit }, data) {
    return await this._vm.$http
      .post(`user/chats/${data.id}`, data)
      .then((respo) => {
        if (respo.status === 200) {
          // commit("setChatMessages", respo.data.data);
          return respo.data.data;
        }

        commit('loadingFinish');
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },

  async uploadFileChat({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .post(`/upload-files`, data)
      .then((response) => {
        if (response.status === 200) {
          commit('loadingFinish');
          commit('setUploadedFileLink', response.data.data);
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
};
