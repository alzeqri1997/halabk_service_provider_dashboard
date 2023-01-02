// import axios from '@/plugins/axios';
import i18n from "@/libs/i18n";
import router from "@/router";
export default {
  async loadApplicants({ commit },data) {
    commit("loadingStart", null); 
    await this._vm.$http
      .get(`jobs/applicants?page=${data.page}&per_page=${data.per_page}&gender=${data.gender}&experience=${data.experience}&original_skill=${data.original_skill}&other_skills=${data.other_skills}&job=${data.job}&order_by=${data.order_by}&search=${data.search}`)
      .then((respo) => {
        if (respo.status === 200) {
          commit("setApplicants", respo.data.data);
          commit("loadingFinish");
        }
      })
      .catch((error) => {
        commit("loadingFinish");
        throw error;
      });
  },
  async loadApplicantsDetails({ commit }, applicantsId) {
    commit("loadingStart", null);
    await this._vm.$http
      .get(`jobs/applicants/${applicantsId}`)
      .then((respo) => {
        if (respo.status === 200) {
          commit("setApplicantDetails", respo.data.data.content);

          commit("loadingFinish");
        }
      })
      .catch((error) => {
        commit("loadingFinish");
        throw error;
      });
  }, 
};
