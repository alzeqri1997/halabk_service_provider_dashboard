<template>
  <validation-observer #default="{ invalid }">
    <b-form class="mt-2" ref="" @submit.prevent="submitAction">
      <slot name="form-content" :invalid="invalid" />
    </b-form>
  </validation-observer>
</template>
<script>
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    ValidationObserver,
  },
  props:{
    refs:{
      type:String,
      default:null
    }
  },
  methods: {
    submitAction() {
      this.$emit("submitAction");
    },
  },
};
</script>
