<template>
  <div class="py-5">
    <div class="pb-5 my-4">
      <b-card-title class="pb-2 mb-0 text-med-18 text-font-main">
        {{ $t('common.reset_password') }}
      </b-card-title>
      <b-card-text class="mt-2 text-reg-14 text-font-secondary">
        {{ $t('common.reset_new_password') }}
      </b-card-text>
    </div>
    <wameed-form refs="" @submitAction="submitResetPassword">
      <!-- form -->
      <template slot="form-content" slot-scope="{ invalid }">
        <!-- email -->
        <div class="pt-1">
          <text-input
            id="password"
            v-model="password"
            :label="$t('common.new_password')"
            field-classes=" login-inputs  "
            input-classes="text-reg-14"
            name="password"
            rules="required|password"
            prepen-icon="lock-icon"
            :icon="!showPassword ? 'eyeon-icon' : 'eyeoff-icon'"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="$t('common.enter_password')"
            is-append
            @iconClick="showPassword = !showPassword"
          />

          <text-input
            id="confirm-password"
            v-model="confirmPassword"
            :label="$t('common.confirm_new_password')"
            field-classes=" login-inputs "
            input-classes="text-reg-14"
            :name="$t('common.confirm_new_password')"
            rules="required|confirmed:password"
            prepen-icon="lock-icon"
            :icon="!showConfirmPassword ? 'eyeon-icon' : 'eyeoff-icon'"
            :type="showConfirmPassword ? 'text' : 'password'"
            :placeholder="$t('common.enter_password')"
            is-append
            @iconClick="showConfirmPassword = !showConfirmPassword"
          />

          <!-- submit buttons -->
          <wameed-btn
            :disabled="invalid"
            :title="$t('common.save')"
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
      showPassword: false,
      showConfirmPassword: false,
      password: null,
      confirmPassword: null,
    };
  },
  computed: {},
  methods: {
    ...mapActions({ resetPassword: 'resetPassword' }),
    submitResetPassword() {
      this.resetPassword({
        token: this.$router.currentRoute.params.token,
        password: this.password,
        password_confirmation: this.confirmPassword,
      });
    },
  },
};
</script>
