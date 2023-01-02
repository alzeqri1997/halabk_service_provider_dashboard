<template>
  <div class="py-5">
    <div class="pb-5 my-4">
      <b-card-title class="pb-2 mb-0 text-med-18 text-font-main">
        {{ $t('common.restore_password') }}
      </b-card-title>
      <b-card-text class="mt-2 text-reg-14 text-font-secondary">
        {{ $t('common.enter_registered_email') }}
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

          <!-- submit buttons -->
          <wameed-btn
            :disabled="invalid"
            :title="$t('common.send')"
            block
            type="submit"
            variant="main"
            :classes="' text-reg-14 text-white d-flex align-items-center rounded-10  justify-content-center my-2'"
          />
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
// import TextInput from '@/components/wameed/WameedTextInput.vue'

export default {
  // directives: {
  //   'b-tooltip': VBTooltip,
  // },
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

      // validation rules
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordType === 'password' ? 'eyeon-icon' : 'eyeoff-icon';
    },
  },
  methods: {
    ...mapActions({ forgetPassword: 'forgetPassword' }),
    login() {
      this.forgetPassword({
        email: this.email,
      });
    },
  },
};
</script>
