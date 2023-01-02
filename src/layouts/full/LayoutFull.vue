<template>
  <div>
    <layout-full>
      <router-view />
    </layout-full>
      <loading />
  </div>
</template>

<script>
import LayoutFull from "@core/layouts/layout-full/LayoutFull.vue";
import Loading from "@/components/wameed/Wameedloading.vue";

export default {
  components: {
    LayoutFull,
    Loading,
  },
};
</script>
