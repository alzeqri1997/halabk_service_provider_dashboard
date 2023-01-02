<template>
  <b-form-group
    class="wameed-input text-reg-14"
    :class="fieldClasses"
    :label-for="id"
  >
    <label
      v-if="label"
      :class="rules && rules.split('|').includes('required') ? 'required' : ''"
      class="text-font-main"
      :for="id"
      >{{ label }}</label
    >
    <span class="text-reg-14 text-icon" v-if="subLable">{{ subLable }}</span>
    <validation-provider
      #default="{ errors }"
      :name="name"
      :vid="name"
      :rules="rules"
      ref="provider"
    >
      <b-input-group
        class="input-group-merge overflow-hidden"
        :class="errors.length > 0 ? 'is-invalid' : null"
      >
        <b-input-group-prepend v-if="prepenIcon" is-text>
          <component
            class="cursor-pointer"
            v-if="prepenIcon"
            v-bind:is="prepenIcon"
            @click="prepenIconClick"
          ></component>
        </b-input-group-prepend>
        <b-form-input
          :id="id"
          @input="updateValue($event)"
          :class="inputClasses"
          :value="value"
          :state="errors.length > 0 ? false : null"
          :name="id"
          :placeholder="placeholder"
          :type="type"
          :readonly="readonly"
        />
        <b-input-group-append v-if="isAppend" :class="appendClass" is-text>
          <component
            v-if="icon"
            @click="iconClick"
            class="cursor-pointer"
            v-bind:is="icon"
          ></component>
          <span v-if="appendText">{{ appendText }}</span>
        </b-input-group-append>

        <!-- <component
            class="cursor-pointer"
            v-if="prepenIcon"
            v-bind:is="prepenIcon"
            @click="prepenIconClick"
          ></component>
          <span v-if="appendText">{{ appendText }}</span> -->
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
    readonly: {
      type: Boolean,
      default: false,
    },
    isAppend: {
      type: Boolean,
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
    subLable: {
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
      const arabicNumbers = [
        /٠/g,
        /١/g,
        /٢/g,
        /٣/g,
        /٤/g,
        /٥/g,
        /٦/g,
        /٧/g,
        /٨/g,
        /٩/g,
      ];
      const persianNumbers = [
        /۰/g,
        /۱/g,
        /۲/g,
        /۳/g,
        /۴/g,
        /۵/g,
        /۶/g,
        /۷/g,
        /۸/g,
        /۹/g,
      ];
      if (typeof value === 'string') {
        for (let i = 0; i < 10; i++) {
          if(value.includes('٫')) {
            value = value.replace('٫', '.');
          }
          value = value
            .replace(persianNumbers[i], i)
            .replace(arabicNumbers[i], i);
        }
      }
      // return str;
      const { valid } = await this.$refs.provider.validate(value);

      if (valid) {
        this.$emit('input', value);
      }
      this.$emit('input', value);
    },
  },
};
</script>