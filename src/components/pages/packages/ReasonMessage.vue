<template>
  <div class="my-5 package-details-table bg-white overflow-hidden rounded-14">
    <div
      class="
        package-details-table__title
        text-font-main text-med-14
        d-flex
        justify-content-between
        align-items-center
      "
    >
      <span v-if="!isSpecialPackage" class="text-dark">{{
        $t('packages.reason_for_rejection_of_cancellation_request')
      }}</span>
      <span v-else class="text-dark">{{
        $t('packages.reason_for_rejection_of_special_package_request')
      }}</span>
      <span class="text-font-secondary text-reg-12">
        {{ date }}
      </span>
    </div>
    <div class="package-details-table__body">
      <p class="text-reg-14 text-font-secondary m-0">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    isSpecialPackage: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

