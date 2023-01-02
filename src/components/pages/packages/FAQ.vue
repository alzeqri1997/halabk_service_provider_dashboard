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
            {{ $t('packages.FAQ') }}
          </h3>
        </div>
      </template>
      <div class="package-modal__container">
        <p class="package-modal__container__title text-med-16">
          {{ $t('packages.what_is_FAQ') }}
        </p>
        <p class="package-modal__container__sub-title text-reg-16">
          {{ $t('packages.FAQ_description') }}
        </p>

        <!-- Add FAQ -->
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
                    :id="'question' + index"
                    v-model="item.question"
                    :name="'question' + index"
                    rules="required"
                    field-classes=" flex-grow-1"
                    :label="$t('packages.question_title')"
                    :placeholder="$t('packages.question_title_placeholder')"
                  />
                </b-col>
                <b-col sm="12" md="6" class="d-flex flex-grow-1">
                  <text-input
                    :id="'answer' + index"
                    v-model="item.answer"
                    :name="'answer' + index"
                    rules="required"
                    field-classes=" flex-grow-1"
                    :label="$t('packages.answer')"
                    :placeholder="$t('packages.answer_placeholder')"
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
          @submitAction="addFAQ()"
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
    faq: {
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
  },
  watch: {
    faq: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        this.contentItems = JSON.parse(JSON.stringify(newValue));
      },
    },
  },
  created() {},
  methods: {
    repeateAgain() {
      const items = this.contentItems;
      items.push({
        id: (this.nextTodoId += this.nextTodoId),
        question: null,
        answer: null,
      });

      this.contentItems = items;
    },
    removeItem(index) {
      const items = this.contentItems;
      items.splice(index, 1);
      this.contentItems = items;
    },
    addFAQ() {
      this.$emit('add-faq', this.contentItems);
    },
  },
};
</script>
