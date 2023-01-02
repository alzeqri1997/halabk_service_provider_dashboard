<template>
  <b-form-group
    class="wameed-input text-reg-14  text-font-main"
    :class="fieldClasses"
    :label="label"
    :label-for="id"
  >
    <validation-provider
      #default="{ errors }"
      :name="name"
      :vid="name"
      :rules="rules"
    >
      <b-input-group
        class="input-group-merge"
        :class="errors.length > 0 ? 'is-invalid' : null"
      >
       
       <code-input
          :fields="fields"
          autoFocus
          class="text-reg-14"
          :fieldWidth="59"
          :fieldHeight="50"
          className="text-reg-14"
          type="text"
          :loading="false"
          ref="code"
          v-on:change="$emit('change', $event)"
          v-on:complete="$emit('complete', $event)"
        />
       
      </b-input-group>
      <small class="text-danger">{{ errors[0] }}</small>
    </validation-provider>
  </b-form-group>
</template>


<script>
/* eslint-disable global-require */
import { ValidationProvider } from 'vee-validate';
import { required, email } from '@validations';
import CodeInput from 'vue-verification-code-input';

export default { 
  props: {
    fields: {
      type: Number,
      default: null,
    },
    appendClass: {
      type: String,
      default: null,
    },
    appendText: {
      type: String,
      default: null,
    },
    prepenIcon: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
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
    inputClasses: {
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
    type: {
      type: String,
      default: 'text',
    },
    rules: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },
  components: {
    ValidationProvider,
    CodeInput,

  },
  data() {
    return {
      // validation rules
      required,
      email,
    };
  },
  methods: {
    iconClick() {
      this.$emit('iconClick');
    },
    prepenIconClick() {
      this.$emit('prepenIconClick');
    },
    updateValue(value) {
      this.$emit('input', value);
    },
  },
};
</script>