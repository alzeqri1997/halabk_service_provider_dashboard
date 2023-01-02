 
<template>
  <!-- date and time -->
  <b-form-group
    class="wameed-input text-reg-14  text-font-main"
    :class="fieldClasses" 
    :label-for="id"
  >
     <label
     :class="rules && rules.split('|').includes('required') ? 'required' : ''"
     class="text-font-main" :for="id">{{label}}</label> 
  
    <validation-provider
      #default="{ errors }"
      :name="name"
      :vid="name"
      :rules="rules"
    >
      <b-input-group
        class="input-group-merge flatpickr"
        :class="errors.length > 0 ? 'is-invalid' : null"
      >
        <flat-pickr
          @input="updateValue($event)"
          :value="value"
          class="form-control custom-css-class"
          :placeholder="placeholder"
          :config="{...configParams}"
           @on-change="onChangeDate"
        />
        <calender-icon class="calender-icon" data-toggle></calender-icon>
      </b-input-group>
      <small class="text-danger">{{ errors[0] }}</small>
    </validation-provider>
  </b-form-group>
</template>

<script>
// import flatpickr from 'flatpickr';
import { Arabic } from 'flatpickr/dist/l10n/ar.js';
// flatpickr.localize(Arabic);
import flatPickr from 'vue-flatpickr-component';
import { ValidationProvider } from 'vee-validate';

export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    
    value: {
      type: String,
      default: null,
    },
    fieldClasses: {
      type: String,
      default: '',
    },

    name: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      default: null,
    },
    rules: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    configParams: {
      type: Object,
      default: null,
    },
  },
  components: {
    flatPickr,
    ValidationProvider,
  },
  data() {
    return {
      mode: 'range',
    };
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value);
    },
     onChangeDate(selectedDates, dateStr, instance) {
      this.$emit('onChangeDate', dateStr);
    
    },
  },
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>