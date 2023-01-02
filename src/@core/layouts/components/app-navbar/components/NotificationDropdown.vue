<template>
  <b-nav-item-dropdown
    class="dropdown-notification mr-25"
    menu-class="dropdown-menu-media mx-4"
    right
    v-if="getAllNotifications"
  >
    <template #button-content>
      <li class="nav-item">
        <span class="position-relative">
          <notification2-icon />

          <span
            v-if="newNotifications().length !== 0"
            class="custom-notification-badge"
          >
            {{ newNotifications().length }}
          </span>
        </span>
      </li>
      <!-- <feather-icon
        badge="6"
        badge-classes="bg-main"
        class="text-body"
        icon="BellIcon"
        size="21"
      /> -->
    </template>

    <!-- Header -->
    <li class="dropdown-menu-header">
      <div class="dropdown-header d-flex">
        <h4 class="notification-title mb-0 mr-auto text-med-16 text-main-font">
          {{ $t('common.notifications') }}
        </h4>
        <b-badge
          pill
          variant="light-main"
          class="notification-badge py-0 border-main text-reg-9"
        >
          {{ newNotifications().length }} {{ $t('common.new') }}
        </b-badge>
      </div>
    </li>

    <!-- Notifications -->
    <vue-perfect-scrollbar
      v-once
      :settings="perfectScrollbarSettings"
      class="scrollable-container media-list scroll-area"
      tagname="li"
    >
      <!-- Account Notification -->

      <!-- System Notifications -->
      <b-link
        v-for="notification in newNotifications()"
        :key="notification.id"
        :to="{ name: 'notification' }"
      >
        <b-media>
          <template #aside>
            <b-avatar
              size="36"
              class="avatar mx-2"
              :variant="
                notification.is_read === 0 ? 'secondary' : 'font-secondary2'
              "
            >
              <notification-icon />
            </b-avatar>
          </template>
          <p class="media-heading">
            <span class="text-med-14 text-font-main">
              {{ notification.title }}
            </span>
            <span class="text-reg-12 text-font-sub">
              {{ formattedDate(notification.created_at) }}
            </span>
          </p>
          <small class="text-med-11 text-font-secondary">{{
            notification.content
          }}</small>
        </b-media>
      </b-link>
    </vue-perfect-scrollbar>

    <!-- Cart Footer -->
    <li class="dropdown-menu-footer">
      <wameed-btn
        @submitAction="getNotifications()"
        :title="$t('common.show_notifications')"
        block
        type="submit"
        variant="main"
        prependIcon="arrow-next-circle-icon"
        :classes="'change-icon-position medium-btn  text-reg-14 text-white d-flex align-items-center rounded-10  justify-content-between my-2'"
      />
    </li>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown,
  BBadge,
  BMedia,
  BLink,
  BAvatar,
  BButton,
  BFormCheckbox,
} from 'bootstrap-vue';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import Ripple from 'vue-ripple-directive';
import Notification from '@/views/pages/dashboard/notification.vue';
import WameedBtn from '@/components/wameed/WameedBtn.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    BNavItemDropdown,
    BBadge,
    BMedia,
    BLink,
    BAvatar,
    VuePerfectScrollbar,
    BButton,
    BFormCheckbox,
    Notification,
    WameedBtn,
  },
  directives: {
    Ripple,
  },
  computed: {
    ...mapGetters({
      getAllNotifications: 'getAllNotifications',
    }),
  },

  setup() {
    /* eslint-disable global-require */
    const notifications = [
      {
        title: 'Congratulation Sam 🎉',
        avatar: require('@/assets/images/logo/logo.svg'),
        subtitle: 'Won the monthly best seller badge',
        type: 'light-success',
      },
    ];
    /* eslint-disable global-require */

    const systemNotifications = [
      {
        title: 'هذا النص هو مثال',
        message:
          'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد ',

        isSeen: false,
        time: 'منذ 5 دقائق',
      },
      {
        title: 'هذا النص هو مثال',
        message:
          'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد ',

        isSeen: false,
        time: 'منذ 5 دقائق',
      },
      {
        title: 'هذا النص هو مثال',
        message:
          'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد ',
        isSeen: true,
        time: 'منذ 5 دقائق',
      },
    ];

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    };

    return {
      notifications,
      systemNotifications,
      perfectScrollbarSettings,
    };
  },
  methods: {
    ...mapActions({
      loadAllNotifications: 'loadAllNotifications',
    }),
    getNotifications() {
      this.$router.push({ name: 'notification' });
    },
    formattedDate(date) {
      return this.moment().diff(this.moment(date), 'days') >= 7
        ? this.moment(date).format('YYYY-MM-DD')
        : this.moment(date).fromNow(true);
    },
    newNotifications() {
      return this.getAllNotifications.filter(
        notification => notification.is_read === 0,
      );
    },
  },
  created() {
    this.loadAllNotifications(5);
  },
};
</script>

<style>
</style>
