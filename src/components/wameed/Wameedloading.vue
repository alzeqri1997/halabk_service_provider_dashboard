<template>
  <div v-if="getloading" class="loading-page">
    <loading
      :active="getloading"
      :can-cancel="false"
      :is-full-page="true"
      class="loading-color"
    />
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapGetters, mapMutations } from 'vuex'
// loading: '~/components/material/loading',
export default {
  components: {
    Loading,
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapGetters({ getloading: 'getloading' }),
  },
  mounted(){
   
  
 
  },
  methods: {
    ...mapMutations({loadingFinish:'loadingFinish',loadingStart:'loadingStart'}),
   start() {
       this.loadingStart();
      },
      finish() {
        this.loadingFinish();
      },
  },
}
</script>
