<template>
  <div class="toastification">
    <div class="d-flex flex-grow-1 align-items-center">
      <span class="cursor-pointer toastification-close-icon">
        <tick-icon v-if="!hideClose" />
      </span>
      <span
        v-if="title"
        class="text-medium-16 text-white mb-0 ml-auto"
        v-text="title"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    hideClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    messagewith() {
      // if (window.innerWidth < 600) {
      //  return '90%'
      // } else {
      return '40%';
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.toastification-close-icon,
.toastification-title {
  line-height: 26px;
}

.toastification-title {
  color: inherit;
}
</style>
