<template>
  <b-button
    :pill="pill"
    :type="type"
    :variant="variant"
    :block="block"
    :disabled="disabled"
    :size="size"
    class="wameed-btn"
    :class="classes"
    @click="submitAction"
  >
    <component
      :is="appendIcon"
      v-if="appendIcon"
    />
    {{ title }}
    <component
      :is="prependIcon"
      v-if="prependIcon"
    />
  </b-button>
</template>
<script>
export default {
  props: {
    classes: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: null,
    },
    pill: {
      type: Boolean,
      default: null,
    },
    variant: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'button',
    },
    appendIcon: {
      type: String,
      default: null,
    },
    prependIcon: {
      type: String,
      default: null,
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    submitAction() {
      this.$emit('submitAction');
    },
  },
};
</script>
