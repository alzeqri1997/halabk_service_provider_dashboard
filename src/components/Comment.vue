<template>
  <div class="comment-container">
    <div class="comment-user">
      <div class="comment-user-container">
        <div class="comment-user--img">
          <img :src="avatar" />
        </div>
        <div class="comment-user--info">
          <div class="name text-med-16">{{ name }}</div>
          <div class="user-details">
            <div class="rate">
              <symbol id="icon-star" viewBox="0 0 12 12">
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
                :value="rate"
                :readonly="true"
                iconref="icon-star"
              />
            </div>

            <div class="time text-reg-13">{{ formatedDate(time) }}</div>
          </div>
        </div>
      </div>
      <button
        @click="showCommentModal = true"
        class="comment-user--button btn text-reg-13"
      >
        {{ $t('reviews.delete') }}
      </button>
    </div>
    <div class="comment-info">
      <p class="comment-info--text text-reg-13">
        {{ comment }}
      </p>
      <router-link
        :to="goToPackageDetails(service.id)"
        class="comment-info--service rounded-8"
      >
        <div class="right">
          <img :src="service.image" alt="package" />
          <div>
            <p class="mb-1 text-reg-12 text-font-main">{{ service.title }}</p>
            <span class="text-reg-12 text-font-sub">
              {{ $t('packages.show_package') }}
            </span>
          </div>
        </div>
        <div class="left change-icon-position">
          <arrow-prev-icon></arrow-prev-icon>
        </div>
      </router-link>
    </div>
    <warning-modal
      variant="danger"
      iconName="stop-icon"
      :visible="showCommentModal"
      @close="showCommentModal = false"
      @submitAction="deleteComment()"
      :title="$t('reviews.delete')"
      :subTitle="$t('reviews.sub_delete_title')"
      :btnTitle="$t('common.continue_delete')"
    />
  </div>
</template>

<script>
import rate from 'vue-rate/src/Rate';
import 'vue-rate/dist/vue-rate.css';
import { mapActions } from 'vuex';
import moment from 'moment';
import WarningModal from '@/components/wameed/WameedWarningModal.vue';

export default {
  name: 'comment',
  components: { rate, WarningModal },
  props: {
    id: Number,
    avatar: String,
    name: String,
    rate: Number,
    time: String,
    comment: String,
    service: Object,
    showAll: {
      type: Boolean,
      default: false,
    },
    filterData: Object,
  },
  data() {
    return {
      showCommentModal: false,
    };
  },
  computed: {},
  methods: {
    ...mapActions({
      deleteCurrentReview: 'deleteReview',
      loadDashboardContent: 'loadDashboardContent',
      loadReviews: 'loadReviews',
    }),
    deleteComment() {
      this.deleteCurrentReview(this.id).then(() => {
        if (this.showAll) {
          this.loadDashboardContent();
        } else {
          this.loadReviews(this.filterData);
        }
      });
    },
    formatedDate(date) {
      return moment().diff(moment(date), 'days') >= 7
        ? moment(date).format('YYYY-MM-DD')
        : moment(date).fromNow(true);
    },
    goToPackageDetails(id) {
      return {
        name: 'package-details',
        params: {
          id,
        },
      };
    },
  },
};
</script>