<template>
  <div class="setup-account">
    <page-header :title="$t('dashboard.setup_missing_info')" />
    <form-wizard
      ref="formWizard"
      :title="null"
      color="#f5c000"
      :subtitle="null"
      shape="circle"
      finish-button-text="Submit"
      back-button-text="Previous"
      class="mb-3"
      @on-complete="onComplete"
    >
      <template slot="step" scope="props">
        <custom-step
          :key="props.tab.title"
          :tab="props.tab"
          :transition="props.transition"
          :index="props.index"
        />
      </template>
      <!-- step 1 tab -->
      <tab-content :title="$t('dashboard.interests')">
        <div class="d-flex flex-wrap">
          <b-col cols="12">
            <h5 class="tab-title">
              {{ $t('dashboard.interests') }}
            </h5>
          </b-col>
          <b-col cols="12" class="tab-content px-0">
            <div class="d-flex flex-wrap">
              <div
                @click="toggleInterest(interest)"
                v-for="interest in getAllInterests"
                :key="interest.id"
                class="
                  interest-card
                  text-center
                  d-flex
                  flex-column
                  justify-content-center
                  align-item-center
                "
                :class="{
                  'interest-selected': selectedInterest.includes(interest),
                }"
              >
                <img
                  width="44"
                  height="44"
                  class="mxx-auto align-self-center interest-image"
                  :src="interest.image"
                />
                <p
                  class="text-reg-14 text-font-icon mb-0 mt-3"
                  :title="'dfsfdsf'"
                >
                  {{ interest.title }}
                </p>
              </div>
            </div>
            <div class="d-flex px-1 my-1 flex-wrap">
              <wameed-btn
                :disabled="selectedInterest.length === 0"
                classes="  text-med-14 text-white rounded-10 my-1  mx-1"
                :title="$t('common.next')"
                block
                variant="main"
                @submitAction="$refs.nextBtn.submitAction()"
              />
            </div>
          </b-col>
        </div>
      </tab-content>

      <!-- step 2 tab -  -->
      <tab-content id="setup-step2" :title="$t('dashboard.select_package')">
        <div class="selection-subscription rounded-14 bg-white">
          <div class="selection-subscription__cards">
            <package-card-selection
              v-if="getSubscriptions"
              @on-change="setCard"
              @on-type-change="setType"
              :subscriptions="getSubscriptions"
            ></package-card-selection>
          </div>
          <div class="divider-line"></div>
          <div class="selection-subscription__buttons">
            <wameed-btn
              :disabled="card.subscription_id === null"
              classes="text-med-14 text-white rounded-10 my-1  mx-1"
              :title="$t('common.pay')"
              variant="main"
              @submitAction="submitDetails()"
            />
            <wameed-btn
              classes="text-med-14 bg-font-secondary2 text-font-sub rounded-10 my-1  mx-1"
              :title="$t('common.previous')"
              variant="gray"
              @submitAction="$refs.prevBtn.submitAction()"
            />
          </div>
        </div>
      </tab-content>
      <!-- step 3 tab - سعر الباقة -->
      <tab-content :title="$t('dashboard.payment_method')" class="pb-5">
        <validation-observer ref="stepThreeForm" tag="form" class="mb-5 pb-2">
          <b-row>
            <b-col lg="7" xl="6" class="my-3">
              <div class="bg-white overflow-hidden rounded-14">
                <h1 class="user-comment__title text-font-main text-med-14">
                  {{ $t('dashboard.new_card_data') }}
                </h1>
                <div class="user-comment__body">
                  <div class="comment-container m-0">
                    <iframe
                      :onLoad="onLoadChange"
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
                <!-- <div class="selection-subscription__buttons py-0">
                  <wameed-btn
                    classes="text-med-14 text-white rounded-10 my-1  mx-1"
                    :title="$t('common.pay')"
                    variant="main"
                    @submitAction="$refs.nextBtn.submitAction()"
                  />
                  <wameed-btn
                    classes="text-med-14 bg-font-secondary2 text-font-sub rounded-10 my-1  mx-1"
                    :title="$t('common.previous')"
                    variant="gray"
                    @submitAction="$refs.prevBtn.submitAction()"
                  />
                </div> -->
              </div>
            </b-col>
            <b-col lg="5" xl="4" class="my-3">
              <div
                v-if="getPaymentDetails"
                class="booking-summary bg-white rounded-14"
              >
                <h1 class="booking-summary__heading text-font-main text-med-14">
                  {{ $t('bookings.summary_title') }}
                </h1>
                <div class="booking-summary__body">
                  <div class="booking-summary__body--section mb-4">
                    <div
                      class="
                        w-100
                        d-flex
                        justify-content-between
                        align-items-center
                      "
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
                      class="
                        w-100
                        d-flex
                        justify-content-between
                        align-items-center
                      "
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
                      class="
                        w-100
                        d-flex
                        justify-content-between
                        align-items-center
                      "
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
          <!-- FIRST REPEATER - START -->
        </validation-observer>
      </tab-content>

      <template slot="footer" ref="footer" slot-scope="props">
        <div class="wizard-footer-left">
          <wameed-btn
            ref="nextBtn"
            classes="  text-med-14 text-white rounded-10"
            :title="!props.isLastStep ? $t('common.next') : $t('common.send')"
            variant="main"
            @submitAction="props.nextTab()"
          />
          <!-- <b-button
            ref="submitBtn"
            @click="props.nextTab()"
            class="  text-med-14 text-white rounded-10"
            type="submit"
            variant="main"
          >
            {{ $t('common.next') }}
          </b-button> -->
        </div>
        <div class="wizard-footer-right">
          <wameed-btn
            ref="prevBtn"
            classes="  text-med-14 text-font-secondary rounded-10 "
            :title="
              props.activeTabIndex > 0
                ? $t('common.previous')
                : $t('common.cancel')
            "
            type="button"
            variant="gray"
            @submitAction="props.prevTab()"
          />
        </div>
      </template>
    </form-wizard>
  </div>
</template>

<script>
import WameedBtn from '@/components/wameed/WameedBtn.vue';
import FormWizard from '@/components/vue-form-wizard/FormWizard.vue';
import TabContent from '@/components/vue-form-wizard/TabContent.vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import '@/assets/scss/wizard.scss';
import PageHeader from '@/components/wameed/WameedPageHeader.vue';
import { mapActions, mapGetters } from 'vuex';
import PackageCardSelection from '@/components/PackageCardSelection.vue';
import CustomStep from '../../CustomStep.vue';

export default {
  components: {
    WameedBtn,
    ValidationProvider,
    ValidationObserver,
    FormWizard,
    TabContent,
    CustomStep,
    PageHeader,
    PackageCardSelection,
  },
  data: () => ({
    selectedInterest: [],
    card: {
      subscription_id: null,
      subscription_period: null,
    },
    paymentDetails: null,
  }),
  computed: {
    ...mapGetters({
      getAllInterests: 'getAllInterests',
      getSubscriptions: 'getSubscriptions',
      getPaymentDetails: 'getPaymentDetails',
    }),
    totalAmount() {
      const total = this.getPaymentDetails.price
        - this.getPaymentDetails.discount
        + this.getPaymentDetails.tax;
      return total;
    },
  },
  created() {
    this.loadAllInterests();
    this.loadSubscriptions();
  },
  mounted() {
    this.$refs.formWizard.$el.childNodes[2].classList.add('d-none');
    window.addEventListener('message', this.iframeEvent, false);
  },
  methods: {
    ...mapActions({
      loadAllInterests: 'loadAllInterests',
      loadSubscriptions: 'loadSubscriptions',
    }),
    onLoadChange(value) {
      // onLoadChange, Do something
    },
    iframeEvent(event) {
      // Verify App Domain
    },
    async submitDetails() {
      const data = {
        interests: this.selectedInterest.map(interest => interest.id),
        ...this.card,
      };
      await this.$store
        .dispatch('submitInterestsAndServices', data)
        .then(() => {
          this.$refs.nextBtn.submitAction();
        });
    },
    onComplete() {
      this.showPolicy = true;
    },
    toggleInterest(interest) {
      if (this.selectedInterest.length === 0) {
        this.selectedInterest.push(interest);
      } else {
        const index = this.selectedInterest.indexOf(interest);

        if (index === -1) {
          this.selectedInterest.push(interest);
        } else {
          this.selectedInterest.splice(index, 1);
        }
      }
    },
    setCard(card) {
      this.card = card;
    },
    setType(type) {
      this.card = {
        ...this.card,
        subscription_period: type,
      };
    },
  },
};
</script>
