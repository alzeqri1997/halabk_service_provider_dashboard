<template>
  <div
    class="main-menu menu-fixed menu-accordion menu-shadow"
    :class="[
      {
        expanded:
          !isVerticalMenuCollapsed ||
          (isVerticalMenuCollapsed && isMouseHovered),
      },
      skin === 'semi-dark' ? 'menu-dark' : 'menu-light',
    ]"
    @mouseenter="updateMouseHovered(true)"
    @mouseleave="updateMouseHovered(false)"
  >
    <!-- main menu header-->
    <div class="navbar-header expanded">
      <slot
        name="header"
        :toggleVerticalMenuActive="toggleVerticalMenuActive"
        :toggleCollapsed="toggleCollapsed"
        :collapseTogglerIcon="collapseTogglerIcon"
      >
        <ul class="nav navbar-nav flex-row">
          <!-- Logo & Text -->
          <li class="nav-item mr-auto">
            <b-link class="navbar-brand" to="/">
              <span class="brand-logo">
                <component v-bind:is="collapseTogglerIconLogo"></component>
                <!-- <logo-dark></logo-dark> -->
              </span>
              <!-- <h2 class="brand-text">
                {{ appName }}
              </h2> -->
            </b-link>
          </li>

          <!-- Toggler Button -->
          <li class="nav-item nav-toggle">
            <b-link class="nav-link modern-nav-toggle">
              <!-- <menu-icon
                style="width: 12px; height: 12px"
                class="d-block d-xl-none p-5"
                @click="toggleVerticalMenuActive"
              /> -->
              <!-- <menu-icon  @click="toggleCollapsed"/> -->
              <component
                v-bind:is="collapseTogglerIconFeather"
                :class="collapseTogglerIconFeather"
                class="d-none d-xl-block collapse-toggle-icon"
                @click="toggleCollapsed"
              ></component>

              <!-- <feather-icon
                :icon="collapseTogglerIconFeather"
                size="20"
              
                
              /> -->
            </b-link>
          </li>
        </ul>
      </slot>
    </div>
    <!-- / main menu header-->

    <!-- Shadow -->
    <div :class="{ 'd-block': shallShadowBottom }" class="shadow-bottom" />

    <!-- main menu content-->
    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="
        main-menu-content
        scroll-area
        d-flex
        flex-column
        justify-content-between
      "
      tagname="ul"
      @ps-scroll-y="
        (evt) => {
          shallShadowBottom = evt.srcElement.scrollTop > 0;
        }
      "
    >
      <vertical-nav-menu-items
        :items="navMenuItems"
        class="navigation navigation-main"
      />
      <!-- <vertical-nav-menu-items
        :items="navFooterMenuItems"
        class="navigation navigation-main "
      /> -->
      <ul class="navigation navigation-main">
        <li @click="showLogout = true" class="nav-item">
          <a class="d-flex align-items-center">
            <component
              v-bind:is="'logout-icon'"
              :class="'logout-icon'"
            ></component>
            <span class="menu-title text-truncate text-medium-18">{{
              $t('common.logout')
            }}</span>
          </a>
        </li>
      </ul>
      <warning-modal
        variant="danger"
        iconName="logout2-icon"
        :visible="showLogout"
        @close="showLogout = false"
        @submitAction="logout()"
        :title="logoutTitle"
        :subTitle="logoutMessage"
        :btnTitle="logoutTitle"
      />
    </vue-perfect-scrollbar>
    <!-- /main menu content-->
  </div>
</template>

<script>
import { useUtils as useI18nUtils } from '@core/libs/i18n';
import navMenuItems from '@/navigation/vertical';
import navFooterMenuItems from '@/navigation/vertical/footer';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import { provide, computed, ref } from '@vue/composition-api';
import useAppConfig from '@core/app-config/useAppConfig';
import { $themeConfig } from '@themeConfig';
import WarningModal from '@/components/wameed/WameedWarningModal.vue';
import { mapActions } from 'vuex';
import VerticalNavMenuItems from './components/vertical-nav-menu-items/VerticalNavMenuItems.vue';
import useVerticalNavMenu from './useVerticalNavMenu';

export default {
  components: {
    VuePerfectScrollbar,
    VerticalNavMenuItems,
    WarningModal,
  },
  props: {
    isVerticalMenuActive: {
      type: Boolean,
      required: true,
    },
    toggleVerticalMenuActive: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      showLogout: false,
      logoutTitle: this.$i18n.t('common.logout'),
      logoutMessage: this.$i18n.t('common.logout_message'),
    };
  },
  setup(props) {
    const { t } = useI18nUtils();
    const {
      isMouseHovered,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      updateMouseHovered,
    } = useVerticalNavMenu(props);

    const { skin } = useAppConfig();

    // Shadow bottom is UI specific and can be removed by user => It's not in `useVerticalNavMenu`
    const shallShadowBottom = ref(false);

    provide('isMouseHovered', isMouseHovered);

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    };

    const collapseTogglerIconFeather = computed(() => (collapseTogglerIcon.value === 'unpinned'
      ? 'close-header-icon'
      : 'menu-icon'));
    const collapseTogglerIconLogo = computed(() => (collapseTogglerIcon.value === 'unpinned'
      ? 'logo-image-icon'
      : 'logo-dark'));

    // App Name
    const { appName, appLogoImage } = $themeConfig.app;

    return {
      navMenuItems,
      navFooterMenuItems,
      perfectScrollbarSettings,
      isVerticalMenuCollapsed,
      collapseTogglerIcon,
      toggleCollapsed,
      isMouseHovered,
      updateMouseHovered,
      collapseTogglerIconFeather,
      collapseTogglerIconLogo,

      // Shadow Bottom
      shallShadowBottom,

      // Skin
      skin,
      t,
      // App Name
      appName,
      appLogoImage,
    };
  },
  methods: {
    ...mapActions({ logout: 'logout' }),
  },
};
</script>

<style lang="scss">
@import '~@core/scss/base/core/menu/menu-types/vertical-menu.scss';
</style>
