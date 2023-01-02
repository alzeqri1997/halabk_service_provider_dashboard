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
      <b-avatar :variant="'light-warning'" rounded size="76" class="my-3">
        <component v-bind:is="'warning-icon'"></component>
      </b-avatar>

      <h4 class="text-med-22 py-2 mb-0 text-dark">
        {{ $t('dashboard.restricted_account') }}
      </h4>
      <h4 class="text-reg-16 pt-2 pb-3 mb-0 text-center text-font-secondary w-75">
        {{ $t('dashboard.restricted_account_placeholder') }}
      </h4>
    </div>
  </div>
</template>
<script>
export default {};
</script>
