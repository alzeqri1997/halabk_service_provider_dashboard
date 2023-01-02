<template> 
    <b-form-checkbox 
   v-bind="$attrs"
      @input.native.stop
      @input="updateValue($event)" 
      class="custom-control-main wameed-checkbox my-2 mb-0"
      :class="classes"
    >
      <span class="text-medium-16 text-font-secondary mx-3">{{
        item[text]+value
      }}</span>
    </b-form-checkbox> 
</template>
<script>
export default {
  
  props: {
    classes: {
      type: String,
      default: null,
    },
    item: {
      type: Object,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "button",
    },
    appendIcon: {
      type: String,
      default: null,
    },
    prependIcon: {
      type: String,
      default: null,
    },
    value:null
  },
  methods: {
    submitAction() {
      this.$emit("submitAction");
    },
    updateValue(val) {
      this.$emit("input", val);
    },
  },
};
</script>
