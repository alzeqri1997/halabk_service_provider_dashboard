<template>
  <!-- <div class="wameed-filter-modal  "> -->
  <b-modal
    id="wameed-modal"
    class="warnings-modal ahmed"
    v-model="show"
    title=""
    no-fade
    hide-footer
    hide-header
    scrollable
    dialog-class="fixed-modal-width"
  >
    <div class="align-items-center w-100">
      <b-button
        v-if="showCloseButton"
        class="justify-end close px-2"
        variant="light"
        size="sm"
        @click="show = false"
      >
        <close-icon />
      </b-button>
      <div
        class="
          d-flex
          flex-column
          justify-content-between
          align-items-center
          w-100
        "
      >
        <b-avatar :variant="'light-' + variant" rounded size="70" class="my-3">
          <component v-bind:is="iconName"></component>
        </b-avatar>

        <h4 class="text-med-20 py-2 text-dark">{{ title }}</h4>
        <h4 class="text-reg-16 py-2 text-center text-font-secondary">
          {{ subTitle }}
        </h4>
        <div class="d-flex w-100 justify-content-between">
          <wameed-btn
            @submitAction="submitAction()"
            :variant="variant"
            size="sm"
            :title="btnTitle"
            classes="text-book-18 py-5 mx-2 rounded-12 px-4 mt-5 text-white"
            block
          />
          <wameed-btn
            v-if="!hideCancelBtn"
            @submitAction="show = false"
            variant="disable"
            size="sm"
            :title="$t('common.cancel')"
            classes="text-book-18 py-5 mx-2 rounded-12 px-4 w-50 mt-5 text-font-secondary"
          />
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import WameedBtn from './WameedBtn.vue';

export default {
  components: { WameedBtn },
  props: {
    hideCancelBtn: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: null,
    },
    variant: {
      type: String,
      default: null,
    },
    iconName: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    subTitle: {
      type: String,
      default: null,
    },
    btnTitle: {
      type: String,
      default: null,
    },
    showCloseButton: {
      type: Boolean,
      default: false,
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
    submitAction() {
      this.$emit('submitAction');
    },
  },
};
</script>