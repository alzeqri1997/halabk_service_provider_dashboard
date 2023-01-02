<template>
  <div class="wameed-dashboard-page-content">
    <page-header
      :title="$t('coupons.add_new_coupons')"
      :sub-title="$t('coupons.add_coupon_subtitle')"
    />
    <section class="wameed-dashboard-page-content_body">
      <b-row class="px-2">
        <b-col lg="12" md="12" class="px-0">
          <b-card no-body class="cursor-pointer wameed-card">
            <b-card-header class="align-items-start tab-title">
              <h5 class="text-reg-18 text-font-main">
                {{ $t('coupons.coupon_details') }}
              </h5>
            </b-card-header>
            <wameed-form refs="" @submitAction="submitCoupon">
              <template slot="form-content" slot-scope="{ invalid }">
                <b-card-body
                  class="position-relative py-5 justify-content-between px-5"
                >
                  <!-- form -->
                  <div class="d-flex flex-wrap py-4">
                    <b-col cols="12" md="6">
                      <text-input
                        id="coupon-name"
                        v-model="couponName"
                        :label="$t('coupons.coupon_name')"
                        input-classes="text-med-14 text-font-main"
                        :name="$t('coupons.coupon_name')"
                        rules="required|max:10"
                        :placeholder="$t('coupons.coupon_name_placeholder')"
                      />
                    </b-col>
                    <b-col cols="12" md="6">
                      <wameed-dropdown
                        id="coupon-place"
                        v-model="couponPlace"
                        :label="$t('coupons.coupon_place')"
                        classes="  text-med-14 w-100"
                        value-classes="  text-med-14  text-font-secondary"
                        :placeholder="$t('coupons.coupon_place_placeholder')"
                        title="title"
                        variant="disable"
                        :items="getAllCouponDropdown"
                        text="title"
                        name="couponPlace"
                        rules="required"
                        multiple
                      />
                    </b-col>
                    <b-col cols="12" md="6">
                      <text-input
                        id="usage-no"
                        v-model="usageNo"
                        :label="$t('coupons.usage_no')"
                        input-classes="text-med-14 text-font-main"
                        :name="$t('coupons.usage_no')"
                        rules="required|numeric"
                        :placeholder="$t('coupons.usage_no_placeholder')"
                      />
                    </b-col>

                    <b-col cols="12" md="6">
                      <text-input
                        id="discount-percentage"
                        v-model="discountPercentage"
                        input-classes="text-med-14 text-font-main"
                        :name="$t('coupons.discount')"
                        rules="required|decimal|max_value:100"
                        :label="$t('coupons.discount')"
                        :placeholder="$t('coupons.discount_placeholder')"
                      />
                    </b-col>
                    <b-col cols="12" md="6">
                      <date-picker
                        id="start-date"
                        v-model="startDate"
                        name="startDate"
                        rules="required"
                        :label="$t('coupons.start_date')"
                        :placeholder="$t('coupons.start_date_placeholder')"
                        :config="{
                          type: 'string',
                          mask: 'YYYY/MM/DD',
                        }"
                        :popover="{
                          visibility: 'click',
                        }"
                      ></date-picker>
                    </b-col>
                    <b-col cols="12" md="6">
                      <date-picker
                        :disabled="startDate ? false : true"
                        id="end-date"
                        v-model="endDate"
                        name="endDate"
                        rules="required"
                        :label="$t('coupons.end_date')"
                        :placeholder="$t('coupons.end_date_placeholder')"
                        :config="{
                          type: 'string',
                          mask: 'YYYY/MM/DD',
                        }"
                        :popover="{
                          visibility: 'click',
                        }"
                        :attributes="dateAttributes"
                        :minDate="startDate"
                      ></date-picker>
                    </b-col>
                  </div>
                </b-card-body>
                <b-card-footer class="px-4 py-3">
                  <div class="d-flex flex-wrap justify-content-between">
                    <div class="px-4 py-3">
                      <wameed-btn
                        classes="  text-med-14 text-white rounded-10"
                        :title="$t('common.create')"
                        :disabled="invalid"
                        type="submit"
                        variant="main"
                      />
                    </div>
                    <div class="px-4 py-3">
                      <wameed-btn
                        classes="  text-med-14 text-font-secondary rounded-10 "
                        :title="$t('common.cancel')"
                        type="button"
                        variant="gray"
                        @submitAction="cancelCoupon"
                      />
                    </div>
                  </div>
                </b-card-footer>
              </template>
            </wameed-form>
          </b-card>
        </b-col>
      </b-row>
    </section>
  </div>
</template>

<script>
import WameedForm from '@/components/wameed/WameedForm.vue';

import WameedBtn from '@/components/wameed/WameedBtn.vue';
import WameedDropdown from '@/components/wameed/WameedDropdown.vue';
import { mapActions, mapGetters } from 'vuex';

import TextInput from '@/components/wameed/WameedTextInput.vue';
import PageHeader from '@/components/wameed/WameedPageHeader.vue';
import Calender from '@/components/wameed/WameedCalender.vue';
import DatePicker from '@/components/wameed/WameedDatePicker.vue';

export default {
  components: {
    TextInput,
    WameedBtn,
    WameedDropdown,
    WameedForm,
    PageHeader,
    Calender,
    DatePicker,
  },
  data() {
    return {
      couponName: null,
      couponPlace: null,
      usageNo: null,
      discountPercentage: null,
      startDate: null,
      endDate: null,
      dateConfig: {
        start: {
          noCalendar: false,
          enableTime: false,
          dateFormat: 'Y-m-d',
          minDate: new Date(),
          maxDate: null,
        },
        end: {
          noCalendar: false,
          enableTime: false,
          dateFormat: 'Y-m-d',
          minDate: null,
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      getAllCouponDropdown: 'getAllCouponDropdown',
    }),
    dateAttributes() {
      const { startDate } = this;
      const endDate = this.endDate ? this.endDate : this.startDate;
      return [
        {
          order: 2,
          highlight: {
            start: {
              style: {
                backgroundColor: '#FED029',
                borderRadius: '6px',
              },
            },
            base: {
              style: {
                backgroundColor: '#FED029',
                borderRadius: '6px',
              },
            },
            end: {
              style: {
                backgroundColor: '#FED029',
                borderRadius: '6px',
              },
            },
          },
          dates: {
            start: startDate,
            end: endDate,
          },
        },
      ];
    },
  },
  created() {
    this.loadAllCouponDropdown();
  },
  methods: {
    ...mapActions({
      addCoupon: 'addCoupon',
      loadAllCouponDropdown: 'loadAllCouponDropdown',
    }),

    cancelCoupon() {
      this.$router.push({ name: 'coupons' });
    },
    submitCoupon() {
      this.addCoupon({
        couponName: this.couponName,
        services: this.couponPlace.map(item => item.id),
        usageNo: this.usageNo,
        discountPercentage: this.discountPercentage,
        startDate: this.startDate,
        endDate: this.endDate,
      });
    },
  },
};
</script>
