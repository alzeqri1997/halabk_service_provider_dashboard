<template>
  <div class="h-panel">
    <div class="h-panel__body">
      <div>
        <h4 class="h-panel__title text-reg-33">
          {{ numberWithCommas(profits) }}
        </h4>
        <p class="h-panel__text text-med-16">{{ $t('dashboard.profit') }}</p>
      </div>
      <div><panel1-icon></panel1-icon></div>
    </div>

    <div class="h-panel__body">
      <div>
        <h4 class="h-panel__title text-reg-33">{{ package_added }}</h4>
        <p class="h-panel__text text-med-16">
          {{ $t('dashboard.packages_added') }}
        </p>
      </div>
      <div><panel2-icon></panel2-icon></div>
    </div>

    <div class="h-panel__body">
      <div>
        <h4 class="h-panel__title text-reg-33">{{ current_bookings }}</h4>
        <p class="h-panel__text text-med-16">
          {{ $t('dashboard.current_bookings') }}
        </p>
      </div>
      <div><panel3-icon></panel3-icon></div>
    </div>
    <div class="h-panel__body">
      <div>
        <h4 class="h-panel__title text-reg-33">{{ expired_bookings }}</h4>
        <p class="h-panel__text text-med-16">
          {{ $t('dashboard.expired_bookings') }}
        </p>
      </div>
      <div><panel4-icon></panel4-icon></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profits: {
      type: Number,
      default: 0,
    },
    package_added: {
      type: Number,
      default: 0,
    },
    current_bookings: {
      type: Number,
      default: 0,
    },
    expired_bookings: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    round100(value) {
      if (!value) return;
      if (value % 1 == 0) return value;
      return Math.round(value * 100) / 100;
    },
    numberWithCommas(value) {
      if(!value)return 0;
      let roundedNumber = this.round100(value);
      roundedNumber = roundedNumber.toString();
      const pattern = /(-?\d+)(\d{3})/;
      while (pattern.test(roundedNumber)) roundedNumber = roundedNumber.replace(pattern, '$1,$2');
      return roundedNumber;
    },
  },
};
</script>