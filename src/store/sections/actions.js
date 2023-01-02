// import axios from '@/plugins/axios';
import i18n from "@/libs/i18n";
import router from "@/router";
export default {
  async loadSections({ commit }) {
    commit("loadingStart", null);
    await this._vm.$http
      .get(`sections`)
      .then((respo) => {
        if (respo.status === 200) {
          commit("setSections", respo.data.data.content);

           commit("loadingFinish");
        }
      })
      .catch((error) => {
       commit("loadingFinish");
        throw error;
      });
  },
};
