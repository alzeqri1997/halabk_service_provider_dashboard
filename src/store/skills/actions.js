// import axios from '@/plugins/axios';
import i18n from "@/libs/i18n";
import router from "@/router";
export default {
  async loadSkills({ commit }) {
     commit("loadingStart", null);
    await this._vm.$http
      .get(`skills`)
      .then((respo) => {
        if (respo.status === 200) {
          commit("setSkills", respo.data.data.content);

           commit("loadingFinish");
        }
      })
      .catch((error) => {
         commit("loadingFinish");
        throw error;
      });
  },
};
