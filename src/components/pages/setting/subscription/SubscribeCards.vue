<template>
  <div class="subscription rounded-14">
    <div class="subscription__heading">
      <div class="subscription__heading-left">
        <p class="text-semi-30 mb-4">
          {{ $t('subscription.select_package') }}
          <span class="text-secondary">{{ $t('subscription.best_fit') }}</span>
        </p>
        <p class="text-reg-18 mb-0">
          {{ $t('subscription.select_subscription_that_fits') }}
        </p>
      </div>
      <div class="subscription__heading-right bg-white">
        <button
          @click="changeType('monthly')"
          class="subscribe-type text-font-secondary text-reg-20"
          :class="{ 'subscribe-type-active': subscribeType === 'monthly' }"
        >
          {{ $t('subscription.monthly') }}
        </button>
        <button
          @click="changeType('annual')"
          :class="{ 'subscribe-type-active': subscribeType === 'annual' }"
          class="subscribe-type text-font-secondary text-reg-20"
        >
          {{ $t('subscription.annual') }}
        </button>
      </div>
    </div>
    <div class="subscription__body">
      <!-- CARD ONE -->
      <div
        v-for="(card, index) in subscriptions.content"
        :key="card.id"
        class="subscription-card"
      >
        <span v-if="card.recommended" class="best-card">
          {{ $t('subscription.the_best') }}
        </span>
        <p class="text-semi-20 text-font-main">
          {{ card.name }}
        </p>

        <div v-if="subscribeType === 'monthly'" class="mb-5">
          <span class="text-semi-30 text-main">
            {{ card.month_price }} <span>{{ $t('packages.SR') }}</span>
          </span>
          <sub class="text-font-secondary text-reg-18">
            / {{ $t('subscription.monthly') }}</sub
          >
        </div>
        <div v-else class="mb-5">
          <span class="text-semi-30 text-main">
            {{ card.year_price }} <span>{{ $t('packages.SR') }}</span>
          </span>
          <sub class="text-font-secondary text-reg-18">
            / {{ $t('subscription.annual') }}</sub
          >
        </div>
        <p class="text-font-sub text-med-12 border-bottom pb-5 mb-0">
          {{ card.desc }}
        </p>
        <div class="subscription__list">
          <template v-if="subscriptions.content">
            <div
              v-for="feature in card.feature_details"
              :key="feature.id"
              class="text-font-main subscription__list--item"
            >
              <span
                v-if="feature.feature.type === 2 && feature.value === 1"
                class="check d-inline-block bg-light-success rounded-8"
              >
                <check-icon class="svg-success"></check-icon>
              </span>
              <span
                v-else-if="feature.feature.type === 2 && feature.value === 0"
                class="check d-inline-block bg-light-danger rounded-8"
              >
                <close-icon
                  style="width: 9.28px"
                  class="svg-danger"
                ></close-icon>
              </span>

              {{ feature.feature.title }}
            </div>
          </template>
        </div>
        <wameed-btn
          v-if="index !== 1"
          variant="no-color"
          classes="border-main text-main border rounded-12 w-100"
          :title="$t('subscription.card_selection')"
          @submitAction="ChangeSubscription(card.id)"
        ></wameed-btn>
        <wameed-btn
          v-else
          variant="main"
          classes=" text-white border rounded-12 w-100 border-main"
          :title="$t('subscription.card_selection')"
          @submitAction="ChangeSubscription(card.id)"
        ></wameed-btn>

        <a
          class="
            show-more
            text-font-secondary text-center text text-reg-16
            d-none
          "
        >
          {{ $t('common.view_all') }}
        </a>
      </div>
    </div>
    
  </div>
</template>

<script>
import WameedBtn from '@/components/wameed/WameedBtn.vue';

export default {
  props: {
    subscriptions: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      id: null,
      subscribeType: 'monthly',
    };
  },
  components: { WameedBtn },
  methods: {
    async ChangeSubscription(value) {
      this.id = this.id === value ? null : value;
      const data = {
        interests: [],
        subscription_id: this.id,
        subscription_period: this.subscribeType === 'monthly' ? 2 : 3,
      };
      await this.$store
          .dispatch('renewSubscription', data)
          .then(() => {
            this.$emit('step-change', 2);
          });
      this.$emit('on-change', data);
    },
    changeType(value) {
      this.subscribeType = value;

      this.$emit('on-type-change', this.subscribeType === 'monthly' ? 2 : 3);
    },
  },
};
</script>
