<template>
  <div>
    <layout-vertical>
      <router-view />
    </layout-vertical>
    <loading />
  </div>
</template>

<script>
import LayoutVertical from '@core/layouts/layout-vertical/LayoutVertical.vue';
import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue';
import { $themeConfig } from '@themeConfig';
import Loading from '@/components/wameed/Wameedloading.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    AppCustomizer,
    LayoutVertical,
    Loading,
  },
  data() {
    return {
      showCustomizer: $themeConfig.layout.customizer,
    };
  },
  created() {
    this.loadProfileInfo();
  },
  methods: {
    ...mapActions({
      loadProfileInfo: 'loadProfileInfo',
      loadAllNotifications: 'loadAllNotifications',
    }),
  },
};
</script>
