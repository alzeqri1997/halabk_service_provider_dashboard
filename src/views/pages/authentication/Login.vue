<template>
  <div class="py-5">
    <div class="pb-5 my-4">
      <b-card-title class="pb-2 mb-0 text-med-18 text-font-main">
        {{ $t('common.sign_in') }}
      </b-card-title>
      <b-card-text class="mt-2 text-reg-14 text-font-secondary">
        {{ $t('common.please_enter_password_email') }}
      </b-card-text>
    </div>
    <wameed-form refs="" @submitAction="login">
      <!-- form -->
      <template slot="form-content" slot-scope="{ invalid }">
        <!-- email -->
        <div class="pt-1">
          <text-input
            id="login-email"
            v-model="email"
            :label="$t('common.email')"
            input-classes="text-reg-14 "
            prepen-icon="email-icon"
            field-classes="pb-1 login-inputs"
            name="email"
            rules="required|email"
            placeholder="john@example.com"
          />

          <!-- forgot password -->
          <text-input
            id="login-password"
            v-model="password"
            :label="$t('common.password')"
            field-classes=" login-inputs mb-2"
            input-classes="text-reg-14"
            name="password"
            rules="required"
            prepen-icon="lock-icon"
            :icon="passwordToggleIcon"
            :type="passwordType"
            placeholder="*******"
            @iconClick="
              passwordType == 'password'
                ? (passwordType = 'text')
                : (passwordType = 'password')
            "
            isAppend
          />
          <div class="d-flex justify-content-end">
            <wameed-btn
              :title="$t('common.forget_password')"
              variant="link"
              :classes="'px-0 text-medium-14 text-font-sub my-1'"
              @submitAction="goTo('forgot-password')"
            />
          </div>

          <!-- submit buttons -->
          <wameed-btn
            :disabled="invalid"
            :title="$t('common.sign_in')"
            block
            type="submit"
            variant="main"
            prepend-icon="arrow-next-circle-icon"
            :classes="' change-icon-position text-reg-14 text-white d-flex align-items-center rounded-10  justify-content-between my-2'"
          />
          <div class="d-flex justify-content-center align-items-center">
            <span class="text-reg-14 text-font-secondary mx-2">{{
              $t('common.do_not_have_account')
            }}</span>
            <wameed-btn
              :title="$t('common.click_here')"
              variant="link"
              :classes="'px-0 text-reg-14 text-main     my-1'"
              @submitAction="goTo('signup')"
            />
          </div>
        </div>
      </template>
    </wameed-form>
  </div>
</template>

<script>
/* eslint-disable global-require */

import { mapActions } from 'vuex';

import TextInput from '@/components/wameed/WameedTextInput.vue';
import WameedForm from '@/components/wameed/WameedForm.vue';
import WameedBtn from '@/components/wameed/WameedBtn.vue';

export default {
  components: {
    TextInput,
    WameedForm,
    WameedBtn,
  },
  data() {
    return {
      status: '',
      password: '',
      email: '',
      sideImg: 'login-bg',
      rememberMe: false,
      passwordType: 'password',
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordType === 'password' ? 'eyeon-icon' : 'eyeoff-icon';
    },
  },
  methods: {
    ...mapActions({ submitLogin: 'submitLogin' }),
    login() {
      this.submitLogin({
        email: this.email,
        password: this.password,
        remember_me: this.rememberMe,
      });
    },
    async goTo(value) {
      await this.$router.push({ name: value, force: true });
    },
  },
};
</script>
