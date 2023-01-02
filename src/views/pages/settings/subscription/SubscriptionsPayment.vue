<template>
  <b-row>
    <b-col lg="7" xl="6" class="my-3">
      <div class="bg-white overflow-hidden rounded-14">
        <h1 class="user-comment__title text-font-main text-med-14">
          {{ $t('dashboard.new_card_data') }}
        </h1>
        <div class="user-comment__body">
          <div class="comment-container m-0">
            <iframe
              v-if="getPaymentDetails"
              id="inlineFrameExample"
              title="Inline Frame Example"
              width="100%"
              height="350px"
              :src="getPaymentDetails.payment_url"
            >
            </iframe>
          </div>
        </div>
      </div>
    </b-col>
    <b-col lg="5" xl="4" class="my-3">
      <div v-if="getPaymentDetails" class="booking-summary bg-white rounded-14">
        <h1 class="booking-summary__heading text-font-main text-med-14">
          {{ $t('bookings.summary_title') }}
        </h1>
        <div class="booking-summary__body">
          <div class="booking-summary__body--section mb-4">
            <div
              class="w-100 d-flex justify-content-between align-items-center"
            >
              <p class="text-reg-14 text-font-main">
                {{ $t('bookings.discount') }} :
              </p>
              <p class="text-med-16 text-right text-danger">
                - <span>{{ getPaymentDetails.discount }}</span>
                {{ $t('common.sr_currency') }}
              </p>
            </div>
            <div
              class="w-100 d-flex justify-content-between align-items-center"
            >
              <p class="text-reg-14 text-font-main">
                {{ $t('bookings.total') }} :
              </p>
              <p class="text-med-16 text-right text-font-main">
                <span>{{
                  getPaymentDetails.price - getPaymentDetails.discount
                }}</span>
                {{ $t('common.sr_currency') }}
              </p>
            </div>
            <div
              class="w-100 d-flex justify-content-between align-items-center"
            >
              <p class="text-reg-14 text-font-main">
                {{ $t('bookings.tax') }} :
              </p>
              <p class="text-med-16 text-right text-font-main">
                <span>{{ getPaymentDetails.tax }}</span>
                {{ $t('common.sr_currency') }}
              </p>
            </div>
          </div>
          <div class="booking-summary__body--section d-flex">
            <p class="text-reg-14 text-font-main m-0">
              {{ $t('bookings.total_amount') }} :
            </p>
            <p class="text-med-16 text-right text-main m-0">
              <span>{{ totalAmount }}</span>
              {{ $t('common.sr_currency') }}
            </p>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      getPaymentDetails: 'getPaymentDetails',
    }),
    totalAmount() {
      const total = this.getPaymentDetails.price
        - this.getPaymentDetails.discount
        - this.getPaymentDetails.tax;
      return total;
    },
  },
};
</script>

