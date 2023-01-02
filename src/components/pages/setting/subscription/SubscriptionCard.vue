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
          @click="subscribeType = 'monthly'"
          class="subscribe-type text-font-secondary text-reg-20"
          :class="{ 'subscribe-type-active': subscribeType === 'monthly' }"
        >
          {{ $t('subscription.monthly') }}
        </button>
        <button
          @click="subscribeType = 'annual'"
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
        :class="{ selected: id === card.id && checkPeriod() && !isExpired }"
      >
        <span v-if="card.recommended === 1 ? true : false" class="best-card">
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
              v-for="(feature, index) in card.feature_details"
              :key="feature + index"
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
          :variant="
            id === card.id && checkPeriod() && !isExpired
              ? 'secondary'
              : 'no-color'
          "
          :classes="`${
            id === card.id && checkPeriod() && !isExpired
              ? 'border-secondary text-white'
              : ' border-main text-main'
          } border rounded-12 w-100`"
          :title="
            id === card.id && checkPeriod()
              ? renewalPackage()
              : checkPackageLevel(card.month_price)
          "
          @submitAction="
            ChangeSubscription(card.id, card.month_price, card.year_price)
          "
        ></wameed-btn>
        <wameed-btn
          v-else
          :variant="
            id === card.id && checkPeriod() && !isExpired ? 'secondary' : 'main'
          "
          :classes="`${
            id === card.id && checkPeriod() && !isExpired ? 'border-secondary' : ' border-main'
          } text-white border rounded-12 w-100`"
          :title="
            id === card.id && checkPeriod()
              ? renewalPackage()
              : checkPackageLevel(card.month_price)
          "
          @submitAction="
            ChangeSubscription(card.id, card.month_price, card.year_price)
          "
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
    period: {
      type: Number,
    },
    subscriptions: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    selectedPackageId: {
      type: Number,
      required: true,
      default: null,
    },
    isExpired: {
      type: Boolean,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      subscribeType: 'monthly',
      localId: null,
    };
  },
  computed: {
    // id of the selected package
    id: {
      get() {
        return this.selectedPackageId;
      },
      set(value) {
        this.localId = value;
      },
    },
  },
  components: { WameedBtn },
  methods: {
    async ChangeSubscription(value, month_price, year_price) {
      // === PARAMETERS ===
      // value: id of the package that the user clicked;
      // month_price: price of the package in monthly;
      // year_price: price of the package in yearly;
      // === END OF PARAMETERS ===


      // first, we have to know the current package by using filter method.
      // this.subscriptions is an array of the packages provided by the server.
      const selectedPackage = this.subscriptions.content.filter(
        card => this.id == card.id,
      );
      // if the id of the selected package is the same as the current package,
      // the provider can't change the package.
      if (this.id === value && this.checkPeriod()) return;
      // check the type (monthly or yearly) of the current package
      const type = this.subscribeType === 'monthly' ? 2 : 3;
      if (this.period === type) {
        // now we have to know if the provider is showing the monthly packages of the annually packages
        // in order to give him the correct price
        if (this.subscribeType === 'monthly') {
          // if the user is showing the monthly packages
          // we will give him the monthly price of the package
          if (selectedPackage[0].month_price > month_price) return;
          const data = {
            interests: [],
            subscription_id: value,
            subscription_period: 2,
          };
          await this.$store
            .dispatch('renewSubscription', data)
            .then(() => {
              this.$emit('step-change', 2);
            });
        } else {
          // else, the user is showing the yearly (annually) packages
          if (selectedPackage[0].month_price > year_price) return;
          const data = {
            interests: [],
            subscription_id: value,
            subscription_period: 3,
          };
          await this.$store
            .dispatch('renewSubscription', data)
            .then(() => {
              this.$emit('step-change', 2);
            });
        }
      } else {
        const data = {
          interests: [],
          subscription_id: value,
          subscription_period: type,
        };
        await this.$store
          .dispatch('renewSubscription', data)
          .then(() => {
            this.$emit('step-change', 2);
          });
      }
    },
    checkPackageLevel(price) {
      // ==== NOTE ====
      // we compare between packages by its PRICE.
      // =========================================

      // first, we have to know the current package by using filter method.
      // this.subscriptions is an array of the packages provided by the server.
      const selectedPackage = this.subscriptions.content.filter(
        card => this.id == card.id,
      );

      // second, we have to know the type (period) of the current package. if monthly of annually.
      const type = this.subscribeType === 'monthly' ? 2 : 3;
      // third, add the restrictions based on the information above.
      // period is 2 for monthly and 3 for annually.

      // forth, walk through some conditions to check the level of the current package.
      // if the period of the current package is equal to the period of the selected package,
      // then we check the price.
      if (this.period === type) {
        // now we have to know if the provider is showing the monthly packages or the annually packages
        // in order to give him the correct price
        if (this.subscribeType === 'monthly') {
          // if monthly, then we compare the price of the selected package with the price of the current package
          if (selectedPackage[0].month_price > price) {
            // if the price of the selected package is greater than the price of the current package,
            // then, we check if the package is expired or not.
            if (!this.isExpired) {
              return '--------------';
            }
            // if the package is not expired, then we return to downgrade the package if he wants to.
            return this.$i18n.t('subscription.downgrade_card');
          }
          // if the price of the selected package is less thant the price of the current package,
          // then we return to upgrade the package if he wants to.
          return this.$i18n.t('subscription.upgrade_card');
        }
          // it would be the same as the monthly packages.
        if (this.subscribeType === 'annual') {
          if (selectedPackage[0].year_price > price) {
            if (!this.isExpired) {
              return '--------------';
            }
            return this.$i18n.t('subscription.downgrade_card');
          }
          return this.$i18n.t('subscription.upgrade_card');
        }
      } else {
        // if the period of the current package is not equal to the period of the selected package,
        // that means that level of the selected package is not the same as the level of the packages that are shown.
        if (this.subscribeType === 'monthly') {
          return this.$i18n.t('subscription.downgrade_card');
        }
        return this.$i18n.t('subscription.upgrade_card');
      }
    },
    renewalPackage() {
      // check if the package is expired
      if (this.isExpired) {
        return this.$i18n.t('subscription.Package_renewal');
      }
      // if not expired, that means the package is ongoing. (active)
      return this.$i18n.t('subscription.current_card');
    },
    checkPeriod() {
      // 2 = monthly, 3 = annual
      const type = this.subscribeType === 'monthly' ? 2 : 3;
      return this.period === type;
    },
  },
};
</script>
