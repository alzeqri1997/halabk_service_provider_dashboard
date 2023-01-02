<template>
  <div class="h-100">
    <b-form-group
      class="wameed-input text-reg-14  text-font-main"
      :class="fieldClasses" 
      :label-for="id"
    >
   <label v-if="label" class="text-font-main"
     :class="rules && rules.split('|').includes('required') ? 'required' : ''"
    :for="id">{{label}}</label> <span class="text-reg-14 text-icon " v-if="subLable">{{subLable}}</span>
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
          <b-dropdown
            :id="id"
            :disabled="disabled"
            :class="classes"
            :toggle-class="'dropdown-btn-color'"
            :variant="variant"
            :text="title"
            class="dropdown-icon-wrapper"
          >
            <template #button-content>
              <div class="d-flex justify-content-between align-items-center">
                <span class="mr-1" :class="valueClasses">
                  <component
                    v-if="prependIcon"
                    v-bind:is="prependIcon"
                  ></component>
                  {{ title }}
                  <span
                    v-if="subTitle"
                    class="mr-1 text-font-secondary"
                    :class="subClasses"
                    >{{ subTitle }}</span
                  >
                </span>

                <arrow-down-icon class="arrow-down-icon" />
              </div>
            </template>
            <b-dropdown-item
              variant="white"
              :class="item.value == title ? 'active' : ''"
              v-for="(item, i) in items"
              :key="i"
              @click="dropdownClick(item)"
            >
              <span class="text-medium-16 text-font-secondary">{{
                item[text]
              }}</span>
            </b-dropdown-item>
          </b-dropdown>
        </b-input-group>

        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>
  </div>
</template>
<script>
import { ValidationProvider } from 'vee-validate';
import { required, email } from '@validations';
export default {
  props: {
    prependIcon: {
      type: String,
      default: null,
    },
    classes: {
      type: String,
      default: null,
    },
    subTitle: {
      type: String,
      default: null,
    },
    subClasses: {
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
    title: {
      type: String,
      default: null,
    },
    id: {
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
    items: {
      type: Array,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    selectedItem: {
      type: Array,
      default: null,
    },
    valueClasses: {
      type: String,
      default: null,
    },
    fieldClasses: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    rules: {
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
      selected: [],
      email,
      options: [
        { text: 'Orange', value: 'orange' },
        { text: 'Apple', value: 'apple' },
        { text: 'Pineapple', value: 'pineapple' },
        { text: 'Grape', value: 'grape' },
      ],
    };
  },
  mounted() {
    // this.$refs.multiDropdown.hide();
  },
  methods: {
    dropdownClick(item) {
      // this.$refs.multiDropdown.bv::dropdown::hide

      this.$root.$emit('bv::dropdown::hide');
      this.$emit('dropdownClick', item);
    },
  },
};
</script>
