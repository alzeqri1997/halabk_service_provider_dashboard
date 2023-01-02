<template>
  <!-- <div class="wameed-filter-modal  "> -->
  <b-modal
    id="wameed-modal"
    size="lg"
    content-class="package-modal"
    v-model="show"
    no-fade
    body-class="py-5 px-5"
  >
    <template #modal-header>
      <div class="d-flex justify-content-between align-items-center w-100">
        <h4 class="text-medium-20">
          {{ $t('packages.FAQ') }}
        </h4>
        <b-button variant="gray" size="sm" class="close" @click="show = false">
          <close-icon />
        </b-button>
      </div>
    </template>
    <div class="package-modal__container">
      <p class="package-modal__container__title text-med-16">
        {{ $t('packages.what_is_FAQ') }}
      </p>
      <p
        class="
          package-modal__container__sub-title
          border-bottom
          pb-5
          text-reg-16
        "
      >
        {{ $t('packages.FAQ_description') }}
      </p>
      <div v-if="content.length != 0" class="p-5">
        <b-row v-for="faq in content" :key="faq.id" class="examples-container mb-5">
          <b-col md="12" class="mb-5">
            <span>{{ faq.question }}</span>
          </b-col>
          <b-col md="12">
            <div class="input-group input-group-merge">
              <div class="fqa-answer">
                {{faq.answer}}
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
      <div v-else class="p-5">{{ $t('common.nothing_found') }}</div>
    </div>

    <template slot="modal-footer">
      <div class="d-flex justify-content-between align-items-center w-100">
        <wameed-btn
          block
          classes="  text-med-14 text-font-secondary rounded-10 "
          :title="$t('common.cancel')"
          type="button"
          variant="gray"
          @submitAction="show = false"
        />
      </div>
    </template>
  </b-modal>
</template>

<script>
import TextInput from '@/components/wameed/WameedTextInput.vue';
import WameedCheckbox from '@/components/wameed/WameedCheckbox.vue';
import WameedBtn from '@/components/wameed/WameedBtn.vue';

export default {
  components: { WameedCheckbox, WameedBtn, TextInput },
  props: {
    content: {
      type: Array,
      default: () => [],
    },
    visible: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: null,
    },
  },
  data: () => ({}),
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
  methods: {
    closeModal() {
      this.show = false;
    },
  },
};
</script>
 
