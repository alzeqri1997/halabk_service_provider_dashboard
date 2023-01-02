<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="no-gutters auth-inner m-0">
      <!-- Left Text-->
      <b-col
        lg="5"
        class="
          d-flex
          flex-column
          justify-content-between
          align-items-center
          auth-bg
          px-5
          p-lg-5
        "
      >
        <div class="w-100 px-4">
          <b-col
            sm="8"
            md="9"
            lg="9"
            class="
              px-xl-2
              mx-auto
              d-flex
              align-items-center
              justify-content-between
            "
          >
            <a href="https://www.halabk.sa">
              <logo-light />
            </a>
            <div class="ml-2 mt-3">
              <wameed-menu
                id="dropdown-1"
                classes=" text-reg-14"
                fieldClasses="mb-0"
                valueClasses="text-reg-14 text-font-secondary"
                :title="orderBy.name"
                prependIcon="lang-icon"
                variant="no-color"
                :items="orderByItems"
                text="name"
                activeItem="1"
                @dropdownClick="changeLang"
              />
            </div>
          </b-col>
        </div>
        <b-col class="d-flex align-items-center flex-1">
          <b-col sm="8" md="9" lg="9" class="px-xl-2 mx-auto flex-1">
            <div v-if="!$route.meta.noBackButton" class="">
              <wameed-btn
                :title="$t('common.go_back_to_main')"
                appendIcon="circle-prev-icon"
                variant="link"
                :classes="'change-icon-position px-0 text-medium-14 text-font-sub my-0'"
                @submitAction="goToMain()"
              />
            </div>
            <router-view />
          </b-col>
        </b-col>
        <div class="d-flex align-items-center flex-0 py-5">
          <span class="text-reg-14 text-font-secondary my-5"
            >{{ $t('common.all_rights_reserved') }}
            <a href="https://www.halabk.sa" class="text-reg-14 text-main">{{
              $t('common.halabk')
            }}</a></span
          >
        </div>
      </b-col>
      <!-- Login-->
      <b-col lg="7" class="d-none d-lg-flex align-items-center p-5 login-bg">
        <login-svg1 class="login-svg1" />
        <login-svg2 class="login-svg2" />
        <login-svg3 class="login-svg3" />
        <div
          class="
            w-100
            d-flex
            align-items-center
            justify-content-center
            px-5
            object-fit
          "
        >
          <!-- <img   :src="require('@/assets/images/pages/login-bg.svg')"/> -->
          <component
            style="max-height: 516.468px"
            v-bind:is="$route.meta.authImage"
          ></component>

          <!-- <b-img fluid :src="imgUrl" alt="Login V2" /> -->
        </div>
      </b-col>

      <!-- /Login-->
    </b-row>
    <loading />
  </div>
</template>

<script>
import LayoutFull from '@core/layouts/layout-full/LayoutFull.vue';
import Loading from '@/components/wameed/Wameedloading.vue';
import WameedMenu from '@/components/wameed/WameedMenu.vue';
import WameedBtn from '@/components/wameed/WameedBtn.vue';

export default {
  components: {
    LayoutFull,
    Loading,
    WameedMenu,
    WameedBtn,
  },
  data: () => ({
    orderBy: {
      name: 'عربي',
      id: 'ar',
    },
    orderByItems: [
      {
        name: 'عربي',
        id: 'ar',
      },
      {
        name: 'English',
        id: 'en',
      },
    ],
  }),
  created() {
    this.orderBy = this.$router.currentRoute.params.lang == 'ar'
      ? this.orderByItems[0]
      : this.orderByItems[1];
  },
  methods: {
    goToMain() {
      this.$router.push('/');
    },
    changeLang(item) {
      this.orderBy = item;

      this.$router.push({
        name: this.$router.currentRoute.name,
        params: { lang: item.id },
      });
      this.$router.go();
    },
  },
};
</script>
