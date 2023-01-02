<template>
  <div class="booking-summary bg-white rounded-14">
    <h1 class="booking-summary__heading text-font-main text-med-14">
      {{ $t('bookings.summary_title') }}
    </h1>
    <div class="booking-summary__body">
      <div class="booking-summary__body--section d-flex mb-4">
        <p class="text-reg-14 text-font-main">
          {{ $t('bookings.date') }}
        </p>
        <time class="text-med-16 text-right text-font-main">{{
          moment(getBookingDetails.booked_at).format('YYYY/MM/DD')
        }}</time>
      </div>
      <div class="booking-summary__body--section mb-4">
        <div class="w-100 d-flex justify-content-between align-items-center">
          <p class="text-reg-14 text-font-main">
            {{ $t('common.number_of_people') }}
          </p>
          <p class="text-med-16 text-right text-font-main">
            {{ getBookingDetails.people_count }}
          </p>
        </div>
        <ul class="booking-list mb-5">
          <li
            v-for="(counter, index) in getBookingDetails.service_counters"
            :key="index"
            class="mb-2"
          >
            <div
              class="d-flex justify-content-between text-reg-12 text-font-sub"
            >
              <span>{{ counter.title }} , X{{ counter.value }}</span>
              <div>
                <span>{{
                  (counter.price + getBookingDetails.package_price) *
                  counter.value
                }}</span>
                {{ $t('common.sr_currency') }}
              </div>
            </div>
          </li>
        </ul>

        <div class="w-100 d-flex justify-content-between align-items-center">
          <p class="text-reg-14 text-font-main">
            {{ $t('packages.the_adds_on') }}
          </p>
        </div>
        <ul class="booking-list">
          <li>
            <div
              v-if="getBookingDetails.service_packages"
              class="d-flex justify-content-between text-reg-12 text-font-sub"
            >
              <span>{{ getBookingDetails.service_packages.title }}</span>
              <div>
                <span>{{
                  getBookingDetails.service_packages.additional_price
                }}</span>
                {{ $t('common.sr_currency') }}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="booking-summary__body--section mb-4">
        <div class="w-100 d-flex justify-content-between align-items-center">
          <p class="text-reg-14 text-font-main">{{ $t('bookings.total') }} :</p>
          <p class="text-med-16 text-right text-font-main">
            <span>{{ getTotalPrice }}</span> {{ $t('common.sr_currency') }}
          </p>
        </div>
        <div class="w-100 d-flex justify-content-between align-items-center">
          <p class="text-reg-14 text-font-main">
            {{ $t('bookings.discount') }} :
          </p>
          <p class="text-med-16 text-right text-danger">
            - <span>{{ getDiscount + getCouponDiscount }}</span> {{ $t('common.sr_currency') }}
          </p>
        </div>
      </div>
      <div class="booking-summary__body--section mb-4">
        <div class="w-100 d-flex justify-content-between align-items-center">
          <p class="text-reg-14 text-font-main">
            {{ $t('bookings.total_after_discount') }} :
          </p>
          <p class="text-med-16 text-right text-font-main">
            <span>{{ getTotalPrice - (getDiscount + getCouponDiscount) }}</span>
            {{ $t('common.sr_currency') }}
          </p>
        </div>
        <div class="w-100 d-flex justify-content-between align-items-center">
          <p class="text-reg-14 text-font-main">{{ $t('bookings.tax') }} :</p>
          <p class="text-med-16 text-right text-font-main">
            <span>{{ getTax }}</span> {{ $t('common.sr_currency') }}
          </p>
        </div>
      </div>
      <div class="booking-summary__body--section d-flex">
        <p class="text-reg-14 text-font-main m-0">
          {{ $t('bookings.total_amount') }} :
        </p>
        <p class="text-med-16 text-right text-main m-0">
          <span>{{ getTotalBill }}</span>
          {{ $t('common.sr_currency') }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      getBookingDetails: 'getBookingDetails',
    }),
    getTotalPrice() {
      let total = 0;
      this.getBookingDetails.service_counters.map(counter => {
        total
          += (counter.price + this.getBookingDetails.package_price)
          * counter.value;
        return total;
      });
      return total;
    },
    getDiscount() {
      return (
        (this.getTotalPrice * this.getBookingDetails.discount_percent) / 100
      );
    },
    getCouponDiscount() {
      return (
        ((this.getTotalPrice - this.getDiscount) * this.getBookingDetails.coupon_discount_percent) / 100
      );
    },
    getTax() {
      return (
        ((this.getTotalPrice - this.getDiscount - this.getCouponDiscount) * this.getBookingDetails.tax)
        / 100
      );
    },
    getTotalBill() {
      return this.getTotalPrice - this.getDiscount - this.getCouponDiscount + this.getTax;
    },
  },
};
</script>
