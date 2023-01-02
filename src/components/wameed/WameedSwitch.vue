<template>
  <b-form-group class="wameed-switch">
    <b-form-checkbox
      :checked="checked"
      :name="name"
      switch
      inline
      class="custom-control-main"
      @change="submitAction"
      :class="classes"
    >
      <span :class="labelClass">
        {{ title }}
      </span>
       <h5  v-if="subTitle" :class="sublabelClass">
        {{ subTitle }}
      </h5>
    </b-form-checkbox>
  </b-form-group>
</template>
<script>
export default {
  props: {
    labelClass: {
      type: String,
      default: null,
    },
    sublabelClass: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    subTitle: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    classes: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: null,
    },
    variant: {
      type: String,
      default: null,
    },
    checked: {
      type: Boolean,
      default: null,
    },
  },
  methods: {
    submitAction() {
      this.$emit("submitAction");
    },
  },
};
</script>
