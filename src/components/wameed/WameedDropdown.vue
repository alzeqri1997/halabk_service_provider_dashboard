<template>
  <!-- <div class="h-100"> -->
  <b-form-group
    class="wameed-input text-reg-14 text-font-main"
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
        class="input-group-merge"
        :class="errors.length > 0 ? 'is-invalid' : null"
      >
        <v-select
          @input="updateValue($event)"
          :value="value"
          :dir="'rtl'"
          :label="title"
          :multiple="multiple"
          :state="errors.length > 0 ? false : null"
          :name="id"
          :class="classes"
          :options="items"
          :placeholder="placeholder"
          :clearable="clearable"
          :closeOnSelect="!multiple"
          :deselectFromDropdown="true"
          :searchable="false"
          :disabled="disabled"
          taggable
        >
          <template
            v-if="multiple"
            #selected-option-container="{ option, deselect }"
          >
            <div
              class="vs__selected"
              v-if="
                value &&
                value.findIndex(
                  (item) => item[identifier] == option[identifier]
                ) <= 3
              "
            >
              {{ option[title]
              }}<close-icon style="padding: 2px" @click="deselect(option)" />
            </div>
            <div class="vs__selected" v-else>
              {{ '+' + (value.length - 1) }}
            </div>
          </template>
          <template v-if="multiple" v-slot:option="option">
            <b-form-checkbox
              class="custom-control-main"
              :class="
                value &&
                value.findIndex(
                  (item) => item[identifier] == option[identifier]
                ) > -1
                  ? 'active'
                  : ''
              "
              :checked="
                value &&
                value.findIndex(
                  (item) => item[identifier] == option[identifier]
                ) > -1
              "
            >
              <span class="text-reg-14 text-font-sub mx-2">{{
                option[title]
              }}</span>
            </b-form-checkbox>
          </template>
          <template slot="no-options"> {{ $t('packages.no_data') }} </template>
        </v-select>

        <!-- <b-dropdown
            :id="id"
            :disabled="disabled"
            :class="classes"
            :variant="variant"
            :text="title"
            class="dropdown-icon-wrapper"
          >
            <template #button-content>
              <div class="d-flex justify-content-between align-items-center">
                <span class="mr-1" :class="valueClasses">{{ title }}</span>

                <arrow-down-icon />
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
            </b-dropdown-item> -->
        <!-- </b-dropdown> -->
      </b-input-group>

      <small class="text-danger">{{ errors[0] }}</small>
    </validation-provider>
  </b-form-group>
  <!-- </div> -->
</template>
<script>
import { ValidationProvider } from 'vee-validate';

export default {
  props: {
    clearable: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    classes: {
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
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
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
    activeItem: {
      type: String,
      default: null,
    },
    valueClasses: {
      type: String,
      default: null,
    },
    value: {
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
    identifier: {
      type: String,
      default: 'id',
    },
  },
  components: {
    ValidationProvider,
  },
  methods: {
    dropdownClick(item) {
      this.$emit('dropdownClick', item);
    },
    async updateValue(value) {
      const { valid } = await this.$refs.provider.validate(value);

      if (valid) {
        // TODO: Upload the file
        this.$emit('input', value);
      }
      this.$emit('input', value);
    },
  },
};
</script>
