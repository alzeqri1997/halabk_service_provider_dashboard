<template>
  <!-- <div class="wameed-filter-modal  "> -->
  <b-modal
    id="wameed-modal"
    size="lg"
    content-class="timeline-modal"
    v-model="show"
    no-fade
    body-class="py-5 px-5"
  >
    <template #modal-header>
      <div class="d-flex justify-content-between align-items-center w-100">
        <h4 class="text-medium-20">
          {{ $t('packages.journey_days') }}
        </h4>
        <b-button variant="gray" size="sm" class="close" @click="show = false">
          <close-icon />
        </b-button>
      </div>
    </template>
    <div class="rounded-8">
      <p class="policies__text text-reg-14 text-font-main mb-0">
        <app-collapse v-if="content" accordion :type="collapseType">
          <app-collapse-item
            v-for="(item, i) in content"
            :key="i"
            :title="$t('common.the_day') + ' ' + $t('days.day' + item.day_no)"
          >
            <div>
              <b-row class="package-details-table__body">
                <b-col sm="3" class="package-details-name">
                  <p class="mb-0">
                    {{ $t('packages.traffic_title') }}
                  </p>
                </b-col>
                <b-col sm="9" class="package-details-value">
                  <p class="mb-0">
                    {{ item.title }}
                  </p>
                </b-col>
              </b-row>
              <b-row class="package-details-table__body">
                <b-col sm="3" class="package-details-name">
                  <p class="mb-0">
                    {{ $t('packages.time_from') }}
                  </p>
                </b-col>
                <b-col sm="9" class="package-details-value">
                  <p class="mb-0">
                    {{ item.from }}
                  </p>
                </b-col>
              </b-row>
              <b-row class="package-details-table__body">
                <b-col sm="3" class="package-details-name">
                  <p class="mb-0">
                    {{ $t('packages.time_to') }}
                  </p>
                </b-col>
                <b-col sm="9" class="package-details-value">
                  <p class="mb-0">
                    {{ item.to }}
                  </p>
                </b-col>
              </b-row>
              <b-row class="package-details-table__body">
                <b-col sm="3" class="package-details-name">
                  <p class="mb-0">
                    {{ $t('packages.traffic_description') }}
                  </p>
                </b-col>
                <b-col sm="9" class="package-details-name">
                  <p class="mb-0">
                    {{ item.content }}
                  </p>
                </b-col>
              </b-row>
            </div>
          </app-collapse-item>
        </app-collapse>
      </p>
    </div>

    <template slot="modal-footer">
      <div class="d-flex justify-content-between align-items-center w-100">
        <wameed-btn
          classes="  text-med-14 text-font-secondary rounded-10 "
          :title="$t('common.cancel')"
          type="button"
          variant="gray"
          block
          @submitAction="show = false"
        />
      </div>
    </template>
  </b-modal>
</template>

<script>
import WameedBtn from '@/components/wameed/WameedBtn.vue';
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue';
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue';

export default {
  components: {
    AppCollapse,
    AppCollapseItem,
    WameedBtn,
  },
  props: {
    content: {
      type: Array,
      default: null,
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
  data: () => ({
    collapseType: 'margin',
  }),
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
 
