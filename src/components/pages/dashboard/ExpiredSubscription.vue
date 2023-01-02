<template>
  <div
    v-if="durationAsDays() <= 7 ? true : false"
    class="section-heading mb-5 bg-white border-danger rounded-14"
  >
    <div class="timeline-subscription mb-0 bg-white rounded-14">
      <div class="timeline-subscription-item">
        <div
          class="icon-container bg-light-main rounded-12"
          :class="willExpire ? 'bg-light-danger' : 'bg-light-main'"
        >
          <timer-icon :class="{ 'svg-stroke-danger': willExpire }"></timer-icon>
        </div>
        <div>
          <p class="mb-1 text-reg-13 text-font-secondary">
            {{ $t('subscription.subscription_end') }}
          </p>
          <span class="text-reg-16 text-font-main">
            {{ getDate }}

            <span class="text-danger"
              >{{ $t('common.stay') }} {{ durationAsDays() }}
              {{ $t('common.day') }}</span
            >
          </span>
        </div>
      </div>
      <div class="timeline-subscription-item">
        <div class="icon-container bg-light-main rounded-12">
          <bill2-icon></bill2-icon>
        </div>
        <div>
          <p class="mb-1 text-reg-13 text-font-secondary">
            {{ $t('subscription.current_package_type') }}
          </p>
          <span class="text-reg-16 text-main">{{ package_type }}</span>
        </div>
      </div>
    </div>
    <router-link
      :to="{ name: 'subscription' }"
      class="change-icon-position section-heading__button m-5"
    >
      <span class="mx-2">{{ $t('subscription.Package_renewal') }}</span>
      <arrow-circle-left-2-icon class="mx-2" />
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    end_date: {
      type: String,
      default: '',
    },
    package_type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      willExpire: false,
    };
  },
  computed: {
    getDate() {
      return this.moment(this.end_date).format('dddd,Do MMMM  YYYY');
    },
  },
  methods: {
    durationAsDays() {
      const current = this.moment().startOf('day');
      const given = this.moment(this.end_date);

      // Difference in number of days

      const totalDays = this.moment(given)
        .startOf('day')
        .diff(this.moment(current).startOf('day'), 'days');

      if (totalDays <= 7) {
        this.willExpire = true;
        if (totalDays === 1) {
          return;
        }
        if (totalDays <= 0) {
          return 0;
        }
        return totalDays;
      }
      this.willExpire = false;

      return totalDays;
    },
  },
};
</script>