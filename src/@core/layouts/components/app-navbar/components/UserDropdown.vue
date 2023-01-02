<template>
  <b-nav-item-dropdown
    v-if="getProfileInfo"
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <img :src="getProfileInfo.image" alt="" class="company-logo" />
      <div class="d-sm-flex d-none user-nav">
        <p :title="getProfileInfo.name" class="user-name font-weight-bolder mb-0">
          {{ shortenText(getProfileInfo.name, 10) }}
        </p>
        <span class="user-status">{{ getProfileInfo.user_type }}</span>
      </div>
      <div class="user-arrow-down ml-3 ml-sm-0">
        <arrow-down-icon></arrow-down-icon>
      </div>
    </template>

    <b-dropdown-item
      :to="{ name: 'settings' }"
      link-class="d-flex align-items-center  "
    >
      <setting-icon class="setting-icon mr-3" />
      <span class="text-reg-14 text-secondary-color">{{
        $t('nav.settings')
      }}</span>
    </b-dropdown-item>
    <b-dropdown-item
      link-class="d-flex align-items-center"
      @click="showLogout = true"
    >
      <logout-icon class="logout-icon mr-3" />
      <span class="text-danger"> {{ $t('common.logout') }}</span>
    </b-dropdown-item>
    <warning-modal
      variant="danger"
      iconName="logout2-icon"
      :visible="showLogout"
      @close="showLogout = false"
      @submitAction="logout()"
      :title="$t('common.logout')"
      :subTitle="$t('common.logout_message')"
      :btnTitle="$t('common.logout')"
    />
  </b-nav-item-dropdown>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import WarningModal from '@/components/wameed/WameedWarningModal.vue';

export default {
  components: { WarningModal },
  data() {
    return {
      showLogout: false,
    };
  },
  computed: {
    ...mapGetters({
      getProfileInfo: 'getProfileInfo',
    }),
  },
  methods: {
    ...mapActions({ logout: 'logout' }),
    shortenText(text, length) {
      return text.length > length ? text.split('').splice(0, length).join('').concat('', ' ...') : text;
    },
  },
};
</script>
