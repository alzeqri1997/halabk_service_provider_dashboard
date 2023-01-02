// import axios from '@/plugins/axios';
import i18n from '@/libs/i18n';
import router from '@/router';
export default {
  async submitLogin({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .post(`login`, data)
      .then((respo) => {
        if (respo.status === 200) {
          if (respo.data.data.complete_status == 'verify') {
            commit('setProfileInfo', respo.data.data);
            router.push({
              name: 'verify-email',
              params: { lang: i18n.locale },
            });
            this._vm.$http.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${respo.data.data.token.access_token}`;
          } else {
            var date = new Date();
            var responseData = {
              ...respo.data.data.token,
              complete_status: respo.data.data.complete_status,
              exp_date: date.setSeconds(
                date.getSeconds() + respo.data.data.token.expires_in
              ),
            };
            this._vm.$http.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${responseData.access_token}`;

            this._vm.$cookies.set(
              'login-data',
              JSON.stringify(responseData)
              // null,
              // null,
              // "dashboard.halabk.wameedprojects.com",
              // true

              // httpOnly:true,
              // sameSite: true
            );

            let loginData = this._vm.$cookies.get('login-data', {
              parseJSON: true,
            });
            if (loginData) {
              commit('setProfileInfo', respo.data.data);
              router.push({ name: 'dashboard', params: { lang: i18n.locale } });
            }
          }

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async refreshToken({ commit }, data) {
    commit('loadingStart', null);

    await this._vm.$http
      .post(`refresh`, null, { headers: { refresh_token: data } })
      .then((respo) => {
        if (respo.status === 200) {
          delete this._vm.$http.defaults.headers.common['Authorization'];
          var date = new Date();
          var responseData = {
            ...respo.data.data,
            exp_date: date.setSeconds(
              date.getSeconds() + respo.data.data.expires_in
            ),
          };
          this._vm.$http.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${responseData.token}`;
          // this._vm.$cookies.remove('login-data')
          // this._vm.$cookies.remove('login-data', '/' + i18n.locale, 'dashboard.halabk.wameedprojects.com',true )
          this._vm.$cookies.set(
            'login-data',
            JSON.stringify(responseData)
            // null,
            // "/" + i18n.locale,
            // "dashboard.halabk.wameedprojects.com",
            // true

            // httpOnly:true,
            // sameSite: true
          );
          // let loginData = this._vm.$cookies.get('login-data', { parseJSON: true })
          // if (loginData) {
          // dispatch('loadUserDetail')
          // commit('setLoggedInuser', loginData)
          // router.push({ path: '/' + i18n.locale + '/dashboard' })

          // }

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async checkLoggedIn({ commit, dispatch }) {
    // let loginData = JSON.parse(localStorage.getItem('loginData'))\
    let loginData = this.$cookies.get('login-data', { parseJSON: true });
    if (loginData) {
      if (
        this._vm.$http.defaults.headers.common['Authorization'] === undefined
      ) {
        this._vm.$http.defaults.headers.common['Authorization'] =
          'Bearer ' + loginData.token;
      }
      commit('setLoggedInuser', loginData);

      dispatch('loadUserDetail');
    }
  },
  async logout({ commit }) {
    this._vm.$cookies.remove('login-data');
    this._vm.$cookies.remove(
      'login-data',
      null,
      'dashboard.halabk.wameedprojects.com',
      true

      // httpOnly:true,
      // sameSite: true
    );
    this._vm.$cookies.remove(
      'login-data',
      null,
      'dashboard.halabk.wameedprojects.com',
      true

      // httpOnly:true,
      // sameSite: true
    );

    // this._vm.$cookies.remove('login-data', {
    //     domain: 'wameed-restaurant.herokuapp.com',
    //     path: '/ar',
    //     secure: true,
    //     sameSite: true,
    //     // httpOnly:true,
    // })
    // let loginData = JSON.parse(localStorage.getItem('loginData'))\
    let loginData = this._vm.$cookies.get('login-data', { parseJSON: true });
    if (!loginData) {
      this._vm.$http.defaults.headers.common['Authorization'] = undefined;

      // commit("setLoggedOutuser");
      router.push({ name: 'login', params: { lang: i18n.locale } });
    }
  },
  async forgetPassword({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .post(`forget-password`, data)
      .then((respo) => {
        if (respo.status === 200) {
          this._vm.$cookies.set(
            'forgot-password-email',
            JSON.stringify(data),
            60 * 10
            // null,
            // "dashboard.halabk.wameedprojects.com",
            // true

            // httpOnly:true,
            // sameSite: true
          );
          router.push({
            name: 'validate-email',
            params: { lang: i18n.locale },
          });

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async resendCode({ commit }) {
    commit('loadingStart', null);

    let userEmail = this._vm.$cookies.get('forgot-password-email', {
      parseJSON: true,
    });
    if (userEmail) {
      await this._vm.$http
        .post(`resend-code`, userEmail)
        .then((respo) => {
          if (respo.status === 200) {
            this._vm.$cookies.set(
              'forgot-password-email',
              JSON.stringify(userEmail),
              60 * 10
              // null,
              // "dashboard.halabk.wameedprojects.com",
              // true

              // httpOnly:true,
              // sameSite: true
            );

            commit('loadingFinish');
          }
        })
        .catch((error) => {
          commit('loadingFinish');
          throw error;
        });
    } else {
      commit('loadingFinish');

      router.push({ name: 'forgot-password', params: { lang: i18n.locale } });
    }
  },
  async confirmCode({ commit }, data) {
    commit('loadingStart', null);

    let userEmail = this._vm.$cookies.get('forgot-password-email', {
      parseJSON: true,
    });
    if (userEmail) {
      await this._vm.$http
        .post(`confirm-code`, { ...data, ...userEmail })
        .then((respo) => {
          if (respo.status === 200) {
            commit('successMessage', 'code_confirmed');

            router.push({
              name: 'reset-password',

              params: { token: respo.data.data, lang: i18n.locale },
            });

            commit('loadingFinish');
          }
        })
        .catch((error) => {
          commit('loadingFinish');
          throw error;
        });
    } else {
      commit('loadingFinish');

      router.push({ name: 'forgot-password', params: { lang: i18n.locale } });
    }
  },
  async resetPassword({ commit }, data) {
    commit('loadingStart', null);

    let userEmail = this._vm.$cookies.get('forgot-password-email', {
      parseJSON: true,
    });
    if (userEmail) {
      await this._vm.$http
        .post(`reset-password`, { ...data, ...userEmail })
        .then((respo) => {
          if (respo.status === 200) {
            commit('successMessage', 'password_changed');
            router.push({
              name: 'login',
              params: { lang: i18n.locale },
            });
            this._vm.$cookies.remove(
              'forgot-password-email',
              null,
              'dashboard.halabk.wameedprojects.com',
              true

              // httpOnly:true,
              // sameSite: true
            );
            commit('loadingFinish');
          }
        })
        .catch((error) => {
          commit('loadingFinish');
          throw error;
        });
    } else {
      commit('loadingFinish');

      router.push({ name: 'forgot-password', params: { lang: i18n.locale } });
    }
  },
  async submitSignup({ commit }, data) {
    commit('loadingStart', null);
    await this._vm.$http
      .post(`provider/signup`, data)
      .then((respo) => {
        if (respo.status === 200) {
          if (respo.data.data.complete_status == 'verify') {
            commit('setProfileInfo', respo.data.data);
            router.push({
              name: 'verify-email',
              params: { lang: i18n.locale },
            });
            this._vm.$http.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${respo.data.data.token.access_token}`;
          } else {
            var date = new Date();
            var responseData = {
              ...respo.data.data.token,
              complete_status: respo.data.data.complete_status,
              exp_date: date.setSeconds(
                date.getSeconds() + respo.data.data.token.expires_in
              ),
            };
            this._vm.$http.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${responseData.access_token}`;

            this._vm.$cookies.set(
              'login-data',
              JSON.stringify(responseData)
              // null,
              // null,
              // "dashboard.halabk.wameedprojects.com",
              // true

              // httpOnly:true,
              // sameSite: true
            );

            let loginData = this._vm.$cookies.get('login-data', {
              parseJSON: true,
            });
            if (loginData) {
              commit('setProfileInfo', respo.data.data);
              router.push({ name: 'dashboard', params: { lang: i18n.locale } });
            }
          }

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async submitResendInformation({ commit }, data) {
    commit('loadingStart', null);
    return await this._vm.$http
      .post(`provider/resend-information`, data)
      .then((respo) => {
        if (respo.status === 200) {
          commit('loadingFinish');
          return respo.data.data;
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },

  async verifyAccount({ commit }, data) {
    commit('loadingStart', null);
    return await this._vm.$http
      .post(`verify-account`, data)
      .then((respo) => {
        if (respo.status === 200) {
          commit('successMessage', 'code_confirmed');
          let loginData = this._vm.$cookies.get('login-data', {
            parseJSON: true,
          });
          if (loginData) {
            this._vm.$cookies.set(
              'login-data',
              JSON.stringify({ ...loginData, complete_status: '' })
              // null,
              // null,
              // "dashboard.halabk.wameedprojects.com",
              // true

              // httpOnly:true,
              // sameSite: true
            );
            router.push({
              name: 'dashboard',

              params: { lang: i18n.locale },
            });
          }

          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async resendVerify({ commit }) {
    commit('loadingStart', null);

    await this._vm.$http
      .post(`resent-verify`)
      .then((respo) => {
        if (respo.status === 200) {
          commit('successMessage', 'code_resent');
          commit('loadingFinish');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
  async changeUserPassword({ commit }, data) {
    commit('loadingStart', null);

    await this._vm.$http
      .post(`user/profile/change-password`, data)
      .then((respo) => {
        if (respo.status === 200) {
          commit('loadingFinish');
          commit('successMessage', 'password_changed');
        }
      })
      .catch((error) => {
        commit('loadingFinish');
        throw error;
      });
  },
};
