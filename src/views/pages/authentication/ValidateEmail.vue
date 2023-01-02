<template>
  <div class="py-5">
    <div class="pb-5 my-4">
      <b-card-title class="pb-2 mb-0 text-med-18 text-font-main">
        {{ $t('common.reset_code') }}
      </b-card-title>
      <b-card-text class="mt-2 text-reg-14 text-font-secondary">
        {{ $t('common.enter_submitted_code') }}
      </b-card-text>
    </div>
    <!-- email -->
    <div class="pt-1" style="width: max-content">
      <verification-input
        ref="code"
        :label="$t('common.verification_code')"
        :fields="5"
        @change="onCompleted"
        @complete="onCompleted"
      />

      <!-- submit buttons -->
      <wameed-btn
        :title="$t('common.send')"
        block
        :disabled="emailCode && emailCode.length != 5"
        variant="main"
        :classes="' text-reg-14 text-white d-flex align-items-center rounded-10  justify-content-center mt-2 mb-4'"
        @submitAction="submitCode()"
      />
      <div class="d-flex flex-column justify-content-center align-items-center">
        <span class="text-reg-14 text-font-secondary mx-2 my-2"
          >{{ $t('common.nothing_arrived') }}
          <counter :end="end" @onFinish="allowResend()"
        /></span>

        <wameed-btn
          :title="$t('common.re_send')"
          variant="link"
          :classes="`px-0 text-reg-14 ${
            shouldResend ? 'text-main' : 'text-font-secondary text-line-through'
          }  my-1`"
          @submitAction="shouldResend ? resend() : null"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import WameedBtn from '@/components/wameed/WameedBtn.vue';
import VerificationInput from '@/components/wameed/WameedVerificationInput.vue';
import Counter from '@/components/wameed/WameedCounter.vue';

export default {
  components: {
    WameedBtn,
    Counter,
    VerificationInput,
  },
  data() {
    return {
      shouldResend: false,
      end: 60 * 3, // in seconds
      emailCode: null,

      // validation rules
    };
  },
  computed: {},
  methods: {
    ...mapActions({ resendCode: 'resendCode', confirmCode: 'confirmCode' }),
    submitCode() {
      this.confirmCode({
        code: this.emailCode,
      });
    },
    onCompleted(event) {
      this.emailCode = event;
    },
    allowResend(action = true, time = 0) {
      this.shouldResend = action;
      this.end = time;
    },
    resend() {
      this.resendCode().then(() => {
        this.allowResend(false, 60 * 3);
      });
    },
  },
};
</script>
