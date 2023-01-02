<template>
  <div class="package-details-images">
    <h1 class="text-reg-14 text-dark mb-4">
      {{ $t('packages.package_image') }}
    </h1>
    <div class="package-details-images__body">
      <div class="package-details-images__body--img">
        <img :src="image" />
        <b-badge class="img-badge bg-main text-white" variant="light-main">
          {{ $t('packages.main') }}
        </b-badge>
      </div>
      <div
        v-for="(image, index) in images"
        :key="index"
        class="package-details-images__body--img"
      >
        <img :src="image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    image: {
      type: String,
      default: null,
    },
  },
};
</script>

<style>
</style>