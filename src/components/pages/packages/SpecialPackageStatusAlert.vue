<template>
  <b-alert
    show
    class="rounded-14"
    :class="'bg-light-' + status[1][state]"
    variant="no-color"
  >
    <div class="alert-body text-reg-14 rounded-14">
      <component class="mr-3" icon="StarIcon" :is="status[0][state]" />
      <span class="ml-25" :class="'text-' + status[1][state]">{{
        status[2][state]
      }}</span>
    </div>
  </b-alert>
</template>

<script>
export default {
  props: {
    state: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      status: [
        {
          0: 'story-icon',
          1: 'tick-squire-icon',
          2: 'danger-icon',
        },
        {
          0: 'warning',
          1: 'main',
          2: 'danger',
        },
        {
          0: this.$i18n.t('packages.special_order_under_review'),
          1: this.$i18n.t('packages.special_order_accepted'),
          2: this.$i18n.t('packages.special_order_rejected'),
        },
      ],
    };
  },
};
</script>