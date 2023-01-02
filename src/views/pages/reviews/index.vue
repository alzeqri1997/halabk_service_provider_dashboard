<template>
  <div class="wameed-dashboard-page-content">
    <div class="mb-4">
      <page-header
        :title="$t('reviews.title')"
        :subTitle="$t('reviews.subtitle')"
      />
    </div>
    <Feedback
      :isNeedRate="true"
      :feedbacks="getAllReviews"
      className="feedbacks"
      :getTotalReviews="getTotalReviews"
      :filterData="filterData"
    />
    <wameed-pagination
      v-if="getAllReviews.length !== 0"
      v-model="filterData.page"
      :page="filterData.page"
      @changePage="changePage"
      :totalItems="getTotalReviews.totalItems"
      :per_page="filterData.per_page"
      @changeCurrentPage="changeCurrentPage"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import WameedPagination from '@/components/wameed/WameedPagination.vue';
import PageHeader from '@/components/wameed/WameedPageHeader.vue';
import ServiceCard from '../../../components/ServiceCard.vue';
import Feedback from '../../../components/FeedBack.vue';

export default {
  components: {
    ServiceCard,
    Feedback,
    WameedPagination,
    PageHeader,
  },
  data() {
    return {
      filterData: {
        page: 1,
        per_page: 3,
      },
    };
  },
  computed: {
    ...mapGetters({
      getAllReviews: 'getAllReviews',
      getTotalReviews: 'getTotalReviews',
    }),
  },
  created() {
    this.loadData();
  },
  methods: {
    ...mapActions({
      loadReviews: 'loadReviews',
    }),
    changeCurrentPage(item) {
      this.filterData = {
        ...this.filterData,
        per_page: item.id,
      };
      this.loadData();
    },
    changePage(event) {
      this.filterData = {
        ...this.filterData,
        page: event,
      };
      this.loadData();
    },
    loadData() {
      this.loadReviews(this.filterData);
    },
  },
};
</script>
 
