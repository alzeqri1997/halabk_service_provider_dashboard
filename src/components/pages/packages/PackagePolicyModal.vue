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
          {{ $t('packages.package_conditions') }}
        </h4>
        <b-button variant="gray" size="sm" class="close" @click="show = false">
          <close-icon />
        </b-button>
      </div>
    </template>
    <div class="policies rounded-8">
      <p class="policies__text text-reg-14 text-font-main mb-0">
        {{ content }}
      </p>
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
import WameedCheckbox from '@/components/wameed/WameedCheckbox.vue';
import WameedBtn from '@/components/wameed/WameedBtn.vue';

export default {
  components: { WameedCheckbox, WameedBtn },
  props: {
    content: {
      type: String,
      default: '',
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
 
