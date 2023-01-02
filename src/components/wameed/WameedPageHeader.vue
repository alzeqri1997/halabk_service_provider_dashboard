<template>
  <div class="section-heading px-4">
    <div>
      <h1 class="section-heading__title text-semi-24">{{ title }}</h1>
      <p v-if="subTitle" class="section-heading__sub-title">{{ subTitle }}</p>
    </div>
    <router-link
      v-if="routeName"
      :to="{ name: routeName }"
      class="section-heading__button"
    >
      <span class="mx-2">{{ btnTitle }}</span>
      <add-circle-icon class="mx-2" />
    </router-link>
    <wameed-btn
      classes="rounded-14 text-white"
      v-if="btn"
      :title="btnTitle"
      type="button"
      :variant="variant"
      @submitAction="btnAction"
    />
  </div>
</template>

<script>
import WameedBtn from './WameedBtn.vue';

export default {
  components: { WameedBtn },
  props: {
    title: {
      type: String,
      default: null,
    },

    subTitle: {
      type: String,
      default: null,
    },
    routeName: {
      type: String,
      default: null,
    },
    btnTitle: {
      type: String,
      default: null,
    },
    btn: {
      type: Boolean,
      default: null,
    },
    variant: {
      type: String,
      default: null,
    },
  },
  data: () => ({}),
  methods: {
    btnAction() {
      this.$emit('btnAction');
    },
  },
};
</script>