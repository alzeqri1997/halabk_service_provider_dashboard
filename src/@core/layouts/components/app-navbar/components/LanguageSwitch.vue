<template>
  <b-nav-item-dropdown
    v-if="getProfileInfo"
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <li class="nav-item">
        <span class="position-relative">
          <component
            :is="$i18n.locale+'-icon'"
          />  </span>
      </li>
    </template>

    <b-dropdown-item
      :to="{ name: $router.currentRoute.name, params: {
          lang: 'ar'
        } }"
      link-class="d-flex align-items-center nav-item "
      :disabled="$i18n.locale=='ar'"
    >

      <ar-icon />
      <span
        class="text-reg-14 text-secondary-color mx-2"
        :class="
          $i18n.locale=='ar'?'text-main':''
      "
      >
        العربية
      </span>

    </b-dropdown-item>
    <b-dropdown-item
      link-class="d-flex align-items-center  nav-item "
      :to="{ name: $router.currentRoute.name, params: {
          lang: 'en'
        } }"
      :disabled="$i18n.locale=='en'"
    >
      <en-icon />
      <span class="text-reg-14 text-secondary-color mx-2"
      :class="
          $i18n.locale=='en'?'text-main':''
      "> English </span>
    </b-dropdown-item>
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
  },
};
</script>
