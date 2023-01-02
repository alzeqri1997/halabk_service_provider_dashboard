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
          {{ $t('packages.the_adds_on') }}
        </h4>
        <b-button variant="gray" size="sm" class="close" @click="show = false">
          <close-icon />
        </b-button>
      </div>
    </template>
    <div class="package-modal__container d-inline-block">
      <p class="package-modal__container__title text-med-16">
        {{ $t('packages.what_is_package_content') }}
      </p>
      <p class="package-modal__container__sub-title text-reg-16">
        {{ $t('packages.package_content_description') }}
      </p>
      <div class="package-modal__container__examples">
        <b-row class="examples-container">
          <b-col v-if="content.included.length === 0">
            {{ $t('common.nothing_found') }}
          </b-col>
          <b-col v-else md="6" class="include">
            <template v-for="(include, index) in content.included">
              <div :key="index" class="examples-content">
                <true-check-icon />
                <p class="examples-content__item text-reg-14 m-0">
                  {{ include }}
                </p>
              </div>
            </template>
          </b-col>
          <b-col v-if="content.excluded.length === 0">
            {{ $t('common.nothing_found') }}
          </b-col>
          <b-col v-else md="6" class="not-include">
            <template v-for="(include, index) in content.excluded">
              <div :key="index" class="examples-content">
                <false-check-icon />
                <p class="examples-content__item text-reg-14 m-0">
                  {{ include }}
                </p>
              </div>
            </template>
          </b-col>
        </b-row>
      </div>
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
      type: Object,
      default: () => {},
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
 
