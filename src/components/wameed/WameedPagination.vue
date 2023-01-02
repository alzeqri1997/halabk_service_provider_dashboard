<template>
    <div class="d-flex justify-content-between pagination-container my-4">
        <b-pagination
          @input="updateValue($event)"
          :value="value"
          first-number
          last-number
          :per-page="per_page"
          :total-rows="totalItems"
          @change="changePage($event)"
        >
          <template #prev-text>
            <arrow-prev-icon />
          </template>
          <template #next-text>
            <arrow-next-icon />
          </template>
        </b-pagination>
        <wameed-menu
          classes=" text-medium-16  "
          fieldClasses="mb-0  "
          valueClasses="text-medium-16"
          :title="$t('packages.show_from_result')+ ' - ' + per_page"
          variant="white"
          :items="items?items:dropdown_items"
          text="title"
          @dropdownClick="changeCurrentPage"
        /> 
      </div>
</template>

<script>
import WameedMenu from './WameedMenu.vue';
export default {
  components: { WameedMenu },
  props: {
    page: {
      type: Number,
      default:null,
    },
    totalItems: {
      type: Number,
      default: null,
    },
    per_page: {
      type: Number,
      default: null,
    },
    items: {
      type: Array,
      default: null,
    },
   value: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      dropdown_items:[
        {
          title: '20 - 1 '+this.$i18n.t('packages.from_data'),
          id: 20,
        },
        {
          title:  '40 - 1 '+this.$i18n.t('packages.from_data'),
          id: 40,
        },
        {
          title: '60 - 1 '+this.$i18n.t('packages.from_data'),
          id: 60,
        },
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
     changePage(value) {
      this.$emit("changePage", value);
    },
    changeCurrentPage(value){
      this.$emit("changeCurrentPage", value);

    }
  },
};
</script>
<style lang="scss" scoped>
.toastification-close-icon,
.toastification-title {
  line-height: 26px;
}

.toastification-title {
  color: inherit;
}
</style>
