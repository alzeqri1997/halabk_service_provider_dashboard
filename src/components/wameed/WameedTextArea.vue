<template>
  <b-form-group
    class="wameed-input text-reg-14 text-font-main"
    :class="fieldClasses"
  >
    <label
      v-if="label"
      :class="rules && rules.split('|').includes('required') ? 'required' : ''"
      class="text-font-main"
      :for="id"
      >{{ label }}</label
    >

    <validation-provider
      #default="{ errors }"
      :name="name"
      :vid="name"
      :rules="rules"
      ref="provider"
    >
      <b-input-group
        class="input-group-merge"
        :class="errors.length > 0 ? 'is-invalid' : null"
      >
        <b-form-textarea
          @input="updateValue($event)"
          :value="value"
          :class="inputClasses"
          :id="id"
          :name="id"
          :state="errors.length > 0 ? false : null"
          :placeholder="placeholder"
          :rows="rows"
          no-resize
          class="h-100"
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

export default {
  props: {
    rows: {
      type: String,
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
    async updateValue(value) {
      const { valid } = await this.$refs.provider.validate(value);

      if (valid) {
        this.$emit('input', value);
      } else {
        this.$emit('input', null);
      }
    },
  },
};
</script>