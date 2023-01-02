<template>
  <section
    class="
      wameed-dashboard-page-content_body
      d-flex
      align-items-center
      justify-content-center
    "
  >
    <div class="d-flex flex-column justify-content-center align-items-center">
      <b-avatar class="my-4 mx-auto" variant="background" size="115">
        <component v-bind:is="icon"></component>
      </b-avatar>
      <h5 class="mb-0 text-bold-22 text-font-main my-2 mx-2">
        {{ title }}
      </h5>
      <h5 class="mb-0 text-book-20 text-font-sub my-2 mx-2">
        {{ subTitle }}
      </h5>
    </div>
  </section>
</template>

<script> 
export default { 
  props: {
    title: {
      type: String,
      default: null,
    },
    subTitle: {
      type: String,
      default: null,
    },

    icon: {
      type: String,
      default: null,
    },
  }, 
};
</script>
