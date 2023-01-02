<template>
  <div v-if="getDashboardContent" class="wameed-dashboard-page-content">
    <template v-if="getProfileInfo.complete_status === 'active'">
      <expired-subscription
        :end_date="getDashboardContent.end_date"
        :package_type="getDashboardContent.package_type"
      />
      <h-panel
        :profits="getDashboardContent.profits"
        :package_added="getDashboardContent.package_added"
        :current_bookings="getDashboardContent.current_bookings"
        :expired_bookings="getDashboardContent.expired_bookings"
      />
      <div v-if="getDashboardContent.services.length !== 0" class="services">
        <h3 class="services__title">
          {{ $t('service.title') }}
        </h3>
        <div class="services__body">
          <template v-for="card in getDashboardContent.services">
            <ServiceCard :key="card.id" :service="card" />
          </template>
        </div>
      </div>
      <Feedback
        v-if="getDashboardContent.reviews.length !== 0"
        class-name="feedbacks"
        :feedbacks="reviews"
        show-all
      />
    </template>

    <rejected-account v-if="getProfileInfo.complete_status === 'rejected'" />
    <restricted-account v-if="getProfileInfo.complete_status === 'suspended'" />
    <setup-account v-if="getProfileInfo.complete_status === 'pending'" />
  </div>
</template>

<script>
import SetupAccount from '@/components/pages/dashboard/SetupAccount.vue';
import RestrictedAccount from '@/components/pages/dashboard/RestrictedAccount.vue';
import RejectedAccount from '@/components/pages/dashboard/RejectedAccount.vue';
import ExpiredSubscription from '@/components/pages/dashboard/ExpiredSubscription.vue';
import { mapGetters } from 'vuex';
import hPanel from '../../../components/pages/dashboard/HPanel.vue';
import ServiceCard from '../../../components/ServiceCard.vue';
import Feedback from '../../../components/FeedBack.vue';

export default {
  components: {
    hPanel,
    ServiceCard,
    Feedback,
    SetupAccount,
    RestrictedAccount,
    ExpiredSubscription,
    RejectedAccount,
  },
  data() {
    return {};
  },
  watch: {
    getProfileInfo(val) {
      if(val){
        const [dashboard] = val.restrictions.filter(
          (item) => item.name === 'dashboard'
        )
  
        if(dashboard.code === '02_07_01'){
          this.$router.push({name: 'packages'});
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      getDashboardContent: 'getDashboardContent',
      getProfileInfo: 'getProfileInfo',
    }),
    reviews() {
      return this.getDashboardContent.reviews.slice(0, 4);
    },
  },
  created() {
    this.$store.dispatch('loadDashboardContent');
  },
  mounted() {
    if(this.getProfileInfo){
      if(this.getProfileInfo.restrictions){
        const [dashboard] = this.getProfileInfo.restrictions.filter(
          (item) => item.name === 'dashboard'
        )
        // once the dashboard is loaded, we check
        // accessing the dashboard whether on not the the provider account has restrictions on
        if(dashboard.code === '02_07_01'){
          this.$router.push({name: 'packages'});
        }
      }
    }
  },
};
</script>
