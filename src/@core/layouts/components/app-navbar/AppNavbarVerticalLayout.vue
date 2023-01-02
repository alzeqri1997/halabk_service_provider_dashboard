<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <menu-icon class="menu-icon" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->

    <search-header></search-header>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <!-- <locale /> -->
      <language-switch/>
      <search-bar />
      <messages />
      <notification-dropdown />
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>
import LanguageSwitch from './components/LanguageSwitch.vue';
import SearchHeader from '@/components/wameed/WameedSearchHeader.vue';
import SearchBar from './components/SearchBar.vue';
import Messages from './components/Messages.vue';
import NotificationDropdown from './components/NotificationDropdown.vue';
import UserDropdown from './components/UserDropdown.vue';

export default {
  components: {
    // Locale,
    LanguageSwitch,
    SearchBar,
    NotificationDropdown,
    UserDropdown,
    Messages,
    SearchHeader,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
