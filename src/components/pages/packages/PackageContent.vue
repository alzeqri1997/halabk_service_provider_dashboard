<template>
  <validation-observer
    ref="form"
    #default="{ invalid }"
    tag="form"
    class="repeater__form"
    style="overflow: visible"
  >
    <b-modal
      v-model="show"
      size="lg"
      content-class="package-modal mx-4"
      no-fade
    >
      <template slot="modal-header-close">
        <close-icon />
      </template>
      <template slot="modal-title">
        <div class="d-block text-center">
          <h3 class="text-reg-18">
            {{ $t('packages.package_content') }}
          </h3>
        </div>
      </template>
      <div class="package-modal__container">
        <p class="package-modal__container__title text-med-16">
          {{ $t('packages.what_is_package_content') }}
        </p>
        <p class="package-modal__container__sub-title text-reg-16">
          {{ $t('packages.package_content_description') }}
        </p>
        <div class="package-modal__container__examples">
          <h3 class="examples-title text-reg-16">
            {{ $t('packages.package_content_examples') }}
          </h3>
          <div class="examples-container">
            <div class="examples-content float-space">
              <true-check-icon />
              <p class="examples-content__item text-reg-14 m-0">
                {{ $t('packages.package_content_example_one') }}
              </p>
            </div>

            <div class="examples-content">
              <false-check-icon />
              <p class="examples-content__item text-reg-14 m-0">
                {{ $t('packages.package_content_example_two') }}
              </p>
            </div>

            <div class="examples-content">
              <true-check-icon />
              <p class="examples-content__item text-reg-14 m-0">
                {{ $t('packages.package_content_example_three') }}
              </p>
            </div>
          </div>
        </div>
        <!-- Add Package -->
        <div class="package-modal__container__repeater">
          <div>
            <!-- Row Loop -->

            <div
              v-for="(item, index) in contentItems"
              :id="item.id"
              :key="item.id"
              class="mb-2 d-flex flex-wrap"
            >
              <b-col class="d-flex flex-wrap align-item-center px-0">
                <b-col sm="12" md="6" class="d-flex flex-grow-1">
                  <text-input
                    :id="'individual-type' + index"
                    v-model="item.name"
                    :name="'individualType' + index"
                    rules="required"
                    field-classes=" flex-grow-1"
                    :label="$t('packages.add_on_title')"
                    :placeholder="$t('packages.add_on_title_placeholder')"
                  />
                </b-col>
                <b-col sm="12" md="6" class="d-flex flex-grow-1">
                  <wameed-dropdown
                    :id="'include-type' + index"
                    v-model="item.isInclude"
                    :label="$t('packages.type')"
                    field-classes=" flex-grow-1  "
                    :placeholder="$t('packages.type_placeholder')"
                    classes="text-medium-16 w-100"
                    value-classes="  text-medium-16  text-font-secondary"
                    title="text"
                    variant="disable"
                    :items="packageTypes"
                    text="text"
                    :name="'includeType' + index"
                    rules="required"
                  />
                </b-col>
              </b-col>
              <div class="d-flex align-items-center px-4">
                <button
                  type="button"
                  class="trash-icon"
                  @click="removeItem(index)"
                >
                  <trash-icon />
                </button>
              </div>
            </div>
            <div>
              <button
                class="single-add-button"
                type="button"
                @click="repeateAgain()"
              >
                <add-filled-circle-icon />
                <span>{{ $t('packages.add_new') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <template slot="modal-footer">
        <wameed-btn
          classes="  text-med-14 text-white mx-0 rounded-10"
          :title="$t('common.add_data')"
          :disabled="invalid"
          type="submit"
          variant="main"
          @submitAction="addPackageContent()"
        />
        <wameed-btn
          classes="  text-med-14 text-font-secondary mx-0 rounded-10 "
          :title="$t('common.cancel')"
          type="button"
          variant="gray"
          @submitAction="show = false"
        />
      </template>
    </b-modal>
  </validation-observer>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import WameedBtn from '@/components/wameed/WameedBtn.vue';
import TextInput from '@/components/wameed/WameedTextInput.vue';
import WameedDropdown from '@/components/wameed/WameedDropdown.vue';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    WameedBtn,
    TextInput,
    WameedDropdown,
  },
  props: {
    packagesContent: {
      type: Array,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formValid: true,
      type: '',
      packageTypes: [
        { isInclude: true, text: 'تشمل' },
        { isInclude: false, text: 'لا تشمل' },
      ],
      contentItems: [],
      nextTodoId: 1,
    };
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit('close');
        }
      },
    },
    //  contentItems: {
    //   get() {
    //     return  [...this.packagesContent];
    //   },
    //   set(value) {
    //      if (value) {
    //       return
    //     }
    //   },
    // },
    // contentItems() {
    //   return [...this.packagesContent]
    // }
  },
  watch: {
    packagesContent: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        this.contentItems = JSON.parse(JSON.stringify(newValue));
      },
    },
  },
  methods: {
    repeateAgain() {
      const items = this.contentItems;
      items.push({
        id: (this.nextTodoId += this.nextTodoId),
        name: null,
        isInclude: { isInclude: true, text: 'تشمل' },
      });

      this.contentItems = items;
    },
    removeItem(index) {
      const items = this.contentItems;
      items.splice(index, 1);
      this.contentItems = items;
    },
    addPackageContent() {
      this.$emit('add-package-content', this.contentItems);
    },
  },
};
</script>
