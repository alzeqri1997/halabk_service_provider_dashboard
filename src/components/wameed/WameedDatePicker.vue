<template>
  <b-form-group
    class="wameed-input text-reg-14 text-font-main"
    :class="fieldClasses"
    :label-for="id"
  >
    <label
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
    >
      <b-input-group
        class="input-group-merge date-picker"
        :class="errors.length > 0 ? 'is-invalid' : null"
      >
        <calender-date-picker
          @input="updateValue($event)"
          :value="value"
          :locale="$i18n.locale"
          :mode="mode"
          :popover="popover"
          :is-required="isRequired"
          :update-on-input="updateOnInput"
          :modelConfig="config"
          class="w-100"
          :attributes="[...attributes, ...localAttrs]"
          :select-attribute="selectedAttribute"
          :min-date="minDate"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <input
              class="form-control custom-css-class"
              readonly
              :value="inputValue"
              v-on="isDisabled(inputEvents)"
              :placeholder="placeholder"
            />
          </template>
        </calender-date-picker>
        <calender-icon class="calender-icon" data-toggle></calender-icon>
      </b-input-group>
      <small class="text-danger">{{ errors[0] }}</small>
    </validation-provider>
  </b-form-group>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: null,
    placeholder: {
      type: String,
      default: null,
    },
    config: {
      type: Object,
      default: () => ({}),
    },
    mode: {
      type: String,
      default: 'date',
    },
    popover: {
      type: Object,
      default: () => ({
        visibility: 'click',
      }),
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    updateOnInput: {
      type: Boolean,
      default: false,
    },
    label: {
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
    isRange: {
      type: Boolean,
      default: false,
    },
    attributes: {
      type: Array,
      default: () => [],
    },
    minDate: {
      type: String,
      default: () => new Date().toString(),
    },
    selectedAttribute: {
      type: Object,
      default: () => ({
        order: 1,
        highlight: {
          style: {
            backgroundColor: '#FED029',
            borderRadius: '6px',
          },
        },
      }),
    },
  },
  components: {
    ValidationProvider,
  },
  data() {
    return {
      localAttrs: [
        {
          key: 'today',
          highlight: {
            style: {
              backgroundColor: '#f0f0f0',
              borderRadius: '6px',
            },
          },
          dates: new Date(),
        },
      ],
    };
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value);
    },
    isDisabled(events) {
      if (this.disabled) {
        return;
      }
      return { ...events };
    },
  },
};
</script>