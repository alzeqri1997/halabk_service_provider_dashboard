<template>
  <div class="wameed-dashboard-page-content">
    <page-header
      v-if="step === 1"
      :title="$t('settings.package_details')"
      :subTitle="$t('settings.subscriptions-sub-title')"
    ></page-header>
    <section class="wameed-dashboard-page-content_body mb-5">
      <template v-if="step === 1">
        <div
          v-if="getSubscriptions"
          class="timeline-subscription bg-white rounded-14"
        >
          <div class="timeline-subscription-item">
            <div
              class="icon-container bg-light-main rounded-12"
              :class="isExpired ? 'bg-light-danger' : 'bg-light-main'"
            >
              <timer-icon
                :class="{ 'svg-stroke-danger': isExpired }"
              ></timer-icon>
            </div>
            <div>
              <p class="mb-1 text-reg-13 text-font-secondary">
                {{ $t('subscription.subscription_end') }}
              </p>
              <span class="text-reg-16 text-font-main">
                {{ getDate() }}
                <span v-if="!isExpired" class="text-success"
                  >{{ $t('common.stay') }} {{ durationAsDays }}
                  {{ $t('common.day') }}</span
                >
                <span v-else class="text-danger">{{
                  $t('common.expired')
                }}</span>
              </span>
            </div>
          </div>
          <div class="timeline-subscription-item">
            <div
              class="icon-container bg-light-main rounded-12"
              :class="isExpired ? 'bg-light-danger' : 'bg-light-main'"
            >
              <bill2-icon
                :class="{ 'svg-stroke-danger': isExpired }"
              ></bill2-icon>
            </div>
            <div>

              <p class="mb-1 text-reg-13 text-font-secondary">
                {{ $t('subscription.current_package_type') }}
              </p>
              <span v-if="!isExpired" class="text-reg-16 text-main">{{
                getSubscriptionDetails.package_type
              }}</span>
              <span v-else class="text-reg-16 text-main">--------------</span>
            </div>
          </div>
        </div>
        <subscription-card
          v-if="getSubscriptions && !isExpired"
          :selectedPackageId="getSubscriptionDetails.id"
          :subscriptions="getSubscriptions"
          :period="getSubscriptionDetails.period"
          :isExpired="isExpired"
          @step-change="step = $event"
        ></subscription-card>
        <subscribe-cards
          v-else-if="getSubscriptions"
          :subscriptions="getSubscriptions"
          @step-change="step = $event"
        ></subscribe-cards>
      </template>
      <template v-if="step === 2">
        <subscriptions-payment></subscriptions-payment>
      </template>
    </section>
  </div>
</template>

<script>
import SubscriptionCard from '@/components/pages/setting/subscription/SubscriptionCard.vue';
import PageHeader from '@/components/wameed/WameedPageHeader.vue';
import { mapGetters, mapActions } from 'vuex';
import SubscriptionsPayment from '@/views/pages/settings/subscription/SubscriptionsPayment.vue';
import PackageCardSelection from '@/components/PackageCardSelection.vue';
import SubscribeCards from '@/components/pages/setting/subscription/SubscribeCards.vue';

export default {
  components: {
    SubscriptionCard,
    PageHeader,
    SubscriptionsPayment,
    PackageCardSelection,
    SubscribeCards
  },
  data() {
    return {
      isExpired: false,
      step: 1,
    };
  },
  computed: {
    ...mapGetters({
      getSubscriptionDetails: 'getSubscriptionDetails',
      getSubscriptions: 'getSubscriptions',
    }),
    durationAsDays() {
      if (this.getSubscriptionDetails) {
        // this is the current day which will be the start date.
        const current = this.moment().startOf('day').toDate();
        // this is the end day.
        const given = this.moment(this.getSubscriptionDetails.end_date);

        // Difference in number of days
        const totalDays = this.moment(given)
          .startOf('day')
          .diff(this.moment(current).startOf('day'), 'days');

          // if the difference is negative, then the subscription is expired.
        if (totalDays <= 0) {
          this.isExpired = true;
        }
        return totalDays;
      }
    },
  },
  methods: {
    ...mapActions({
      loadSubscriptionDetails: 'loadSubscriptionDetails',
      loadSubscriptions: 'loadSubscriptions',
    }),
    getDate() {
      return this.moment(this.getSubscriptionDetails.end_date).format(
        'dddd,Do MMMM  YYYY',
      );
    },
  },
  created() {
    this.loadSubscriptionDetails();
    this.loadSubscriptions();
  },
};
</script>
