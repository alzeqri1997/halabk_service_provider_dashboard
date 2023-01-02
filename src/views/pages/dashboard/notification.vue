<template>
  <div class="wameed-dashboard-page-content">
    <page-header :title="title" :subTitle="subTitle"></page-header>
    <div class="notifications mt-4 px-4">
      <b-col
        v-for="(notification, index) in getAllNotifications"
        :key="index"
        class="bg-white py-5 rounded-14 mb-5 d-flex"
        md="12"
      >
        <b-avatar
          size="50"
          class="p-4 avatar mx-2"
          :variant="
            notification.is_read === 0 ? 'secondary' : 'font-secondary2'
          "
        >
          <notification-icon />
        </b-avatar>
        <div class="mx-2">
          <div class="mb-5">
            <h3
              class="
                notifications__title
                text-med-16 text-font-main
                d-inline
                mr-3
                text-font-main
              "
            >
              {{ notification.title }}
            </h3>
            <small
              class="notifications__time text-reg-12 text-font-secondary"
              >{{ formattedDate(notification.created_at) }}</small
            >
          </div>
          <p class="text-med-16 text-font-secondary">
            {{ notification.content }}
          </p>
        </div>
      </b-col>
    </div>
  </div>
</template>
<script>
import PageHeader from '@/components/wameed/WameedPageHeader.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      title: this.$i18n.t('notification.title'),
      subTitle: this.$i18n.t('notification.sub_title'),
    };
  },
  components: {
    PageHeader,
  },
  computed: {
    ...mapGetters({
      getAllNotifications: 'getAllNotifications',
    }),
  },
  methods: {
    ...mapActions({
      loadAllNotifications: 'loadAllNotifications',
      markAsRead: 'markAsRead',
    }),
    formattedDate(date) {
      return this.moment().diff(this.moment(date), 'days') >= 7
        ? this.moment(date).format('YYYY-MM-DD')
        : this.moment(date).fromNow(true);
    },
  },
  created() {
    this.loadAllNotifications();
    this.markAsRead();
  },
};
</script>