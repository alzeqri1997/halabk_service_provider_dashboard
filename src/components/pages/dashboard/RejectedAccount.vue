<template>
  <div class="d-flex justify-content-between">
    <div
      id="restricted-account-card"
      class="
        rounded-14
        bg-white
        d-flex
        flex-column
        justify-content-between
        align-items-center
        flex-grow-1
        mx-auto
      "
    >
      <b-avatar :variant="'light-danger'" rounded size="76" class="my-3">
        <component :is="'block-icon'" />
      </b-avatar>

      <h4 class="text-med-22 py-2 mb-0 text-dark">
        {{ $t('dashboard.rejected_account') }}
      </h4>
      <h4
        class="text-reg-16 pt-2 pb-3 mb-0 text-center text-font-secondary w-75"
      >
        {{ $t('dashboard.rejected_account_placeholder') }}
      </h4>
      <wameed-btn
        classes="rounded-14 text-white"
        :title="$t('common.update_my_info')"
        type="button"
        variant="main"
        @submitAction="updateInfo"
      />
    </div>
  </div>
</template>
<script>
import WameedBtn from '@/components/wameed/WameedBtn.vue';

export default {
  components: { WameedBtn },
  methods: {
    updateInfo() {
      this.$router.push({ name: 'edit-profile' });
    },
  },
};
</script>
