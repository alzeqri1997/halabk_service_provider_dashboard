<template>
  <div :class="className">
    <div class="feedbacks__header">
      <p class="feedbacks__title text-reg-18">
        {{ $t('reviews.all') }}
      </p>
      <router-link
        v-if="showAll"
        :to="{ name: 'reviews' }"
        class="feedbacks__button btn text-reg-18 p-0"
      >
        {{ $t('common.view_all') }}
      </router-link>
    </div>
    <div class="feedbacks__body">
      <!-- Rate - Start -->
      <div
        v-if="isNeedRate && feedbacks.length !== 0"
        class="rates-container d-flex flex-wrap"
        :class="rateStatus"
      >
        <div class="average">
          <div class="number text-med-38 mb-2">
            {{ getTotalReviews.rateAverage }}
          </div>
          <div class="rate">
            <symbol id="icon-star" view-box="0 0 12 12">
              <path
                id="Path_147238"
                data-name="Path 147238"
                d="M13.649,7.759a1.271,1.271,0,0,0,.294-1.3A1.255,1.255,0,0,0,12.928,5.6l-2.576-.4a.084.084,0,0,1-.054-.048l-1.129-2.4a1.268,1.268,0,0,0-2.312-.018l-1.129,2.4a.1.1,0,0,1-.06.048L3.1,5.6a1.273,1.273,0,0,0-1.021.858,1.289,1.289,0,0,0,.3,1.3l1.9,1.95a.1.1,0,0,1,0,.078L3.83,12.51a1.273,1.273,0,0,0,1.88,1.326l2.24-1.242a.078.078,0,0,1,.072,0l2.24,1.242a1.279,1.279,0,0,0,1.88-1.326L11.727,9.8a.072.072,0,0,1,0-.072Z"
                transform="translate(-2.012 -2)"
              />
            </symbol>
            <rate
              class="RateCustom"
              :length="5"
              :value="
                getTotalReviews.rateAverage ? getTotalReviews.rateAverage : 0
              "
              :readonly="true"
              iconref="icon-star"
            />
          </div>
          <div
            v-if="getTotalReviews.rates"
            class="count text-reg-12 text-font-main"
          >
            ({{ getTotalReviews.rates.rate_count }}) {{ $t('reviews.rates') }}
          </div>
        </div>

        <div class="rates-divider d-none d-md-flex" />
        <div v-if="getTotalReviews.rates" class="rates-data">
          <div
            v-for="rateItem in getTotalReviews.rates.rates"
            :key="rateItem.rate"
            class="rate--item text-med-10 text-font-main"
          >
            <div>{{ rateItem.rate }}</div>
            <KProgress
              :percent="percentage(rateItem.rate_count)"
              color="#FED029"
              bg-color="#EDF0F5"
              :line-height="4"
            />
          </div>
        </div>
      </div>
      <!-- Rate - End -->
      <template v-if="feedbacks.length !== 0">
        <comment
          v-for="feedback in feedbacks"
          :id="feedback.id"
          :key="feedback.id"
          :name="feedback.name"
          :time="feedback.created_at"
          :rate="feedback.rate"
          :show-images="feedback.showImages"
          :avatar="feedback.image"
          :comment="feedback.comment"
          :service="feedback.service"
          :showAll="showAll"
          :filterData="filterData"
        >
        </comment>
      </template>
      <div class="mb-5" v-else>
        <wameed-no-data
          icon="nodata-icon"
          :title="$t('reviews.no_data')"
          :sub-title="$t('reviews.no_data_text')"
        ></wameed-no-data>
      </div>
    </div>
  </div>
</template>

<script>
import KProgress from 'k-progress';
import rate from 'vue-rate/src/Rate.vue';
import Comment from './Comment.vue';
import WameedNoData from './wameed/WameedNoData.vue';

export default {
  components: {
    Comment,
    KProgress,
    rate,
    WameedNoData,
  },
  props: {
    filterData: {
      type: Object,
      default: () => ({
        page: 1,
        per_page: 3,
      }),
    },
    showAll: {
      type: Boolean,
      default: false,
    },
    isNeedRate: {
      type: Boolean,
      default: false,
    },
    feedbacks: {
      type: Array,
      default: () => [],
    },
    rateStatus: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    getTotalReviews: {
      type: Object,
      default: null,
    },
  },
  methods: {
    percentage(partialValue) {
      if (partialValue) {
        return (100 * partialValue) / this.getTotalReviews.totalItems;
      }
      return 0;
    },
  },
};
</script>
