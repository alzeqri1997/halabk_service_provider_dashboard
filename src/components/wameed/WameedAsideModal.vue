<template>
  <!-- <div class="wameed-filter-modal  "> -->
  <b-modal
    id="wameed-filter-modal"
    v-model="show"
    class="wameed-filter-modal"
    title=""
    no-fade
    scrollable
  >
    <template #modal-header>
      <div class="d-flex justify-content-between align-items-center w-100">
        <h4 class="text-medium-20">
          {{ $t('common.filter_data') }}
        </h4>
        <b-button
          variant="white"
          size="sm"
          outlined
          class="close"
          @click="show = false"
        >
          <close-icon />
        </b-button>
      </div>
    </template>
    <div class="wameed-filter-modal__section">
      <!-- types -->
      <app-collapse accordion :type="collapseType">
        <app-collapse-item
          v-for="(item, i) in content"
          :key="i"
          :title="$t('common.' + item.title)"
        >
          <div v-if="item.title == 'status'" class="wameed-checkbox">
            <b-form-group v-if="item.data">
              <b-form-checkbox
                v-for="(value, i) in item.data"
                :key="i"
                v-model="item.selectedData"
                :value="value[item.id]"
                class="custom-control-main my-2 wameed-checkbox"
              >
                <span class="text-reg-14 text-font-sub mx-4" dir="ltr">
                  {{ $t('common.' + value[item.name]) }}</span
                >
              </b-form-checkbox>
            </b-form-group>
            <!-- <b-button class="px-0 text-book-16" variant="flat-main"
              >عرض المزيد....</b-button
            > -->
          </div>
          <div v-else class="wameed-checkbox">
            <b-form-group v-if="item.data">
              <b-form-checkbox
                v-for="(value, i) in item.data"
                :key="i"
                v-model="item.selectedData"
                :value="value[item.id]"
                class="custom-control-main my-2 wameed-checkbox"
              >
                <span class="text-reg-14 text-font-sub mx-4" dir="ltr">
                  {{
                    item.translate
                      ? $t('common.' + value[item.name])
                      : value[item.name]
                  }}</span
                >
                <span v-if="item.count" class="text-reg-14 text-font-secondary">
                  ({{ value[item.count] }})
                </span>
              </b-form-checkbox>
            </b-form-group>
            <!-- <b-button class="px-0 text-book-16" variant="flat-main"
              >عرض المزيد....</b-button
            > -->
          </div>
        </app-collapse-item>
      </app-collapse>
    </div>
    <template #modal-footer>
      <div class="w-100">
        <wameed-btn
          variant="main"
          size="sm"
          :title="$t('common.filter')"
          classes="text-book-18 py-5 mx-2 applyBtn text-white rounded-10"
          @submitAction="applyFilter()"
        />
        <wameed-btn
          variant="white"
          :title="$t('common.reset')"
          size="sm"
          classes="text-book-17 text-font-sub mx-2 "
          @submitAction="resetFilter()"
        />
      </div>
    </template>
  </b-modal>
</template>

<script>
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue';
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue';
import WameedBtn from './WameedBtn.vue';

export default {
  components: {
    AppCollapse,
    AppCollapseItem,
    WameedBtn,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    content: {
      type: Array,
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
    applyFilter() {
      this.$emit('applyFilter');
      this.show = false;
    },
    resetFilter() {
      this.$emit('resetFilter');
      this.show = false;
    },
  },
};
</script>
