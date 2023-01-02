<template>
  <div id="signup-nav" class="d-flex">
    <div
      class="container d-flex justify-content-between align-items-center flex-1"
    >
      <router-link class="px-4" to="/">
        <logo-dark />
      </router-link>

      <div class="px-4">
        <wameed-menu
          id="dropdown-1"
          classes=" text-reg-14"
          fieldClasses="mb-0"
          valueClasses="text-reg-14 text-white"
          :title="orderBy.name"
          prependIcon="lang-icon"
          variant="light-white"
          :items="orderByItems"
          text="name"
          activeItem="1"
          @dropdownClick="changeLang"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WameedMenu from '@/components/wameed/WameedMenu.vue';
export default {
  components: { WameedMenu },
  name: 'navbar',
  props: {
    topClass: {
      type: String,
      default: ' top-rounded',
    },
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
    this.orderBy =
      this.$router.currentRoute.params.lang == 'ar'
        ? this.orderByItems[0]
        : this.orderByItems[1];
  },
  methods: {
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
