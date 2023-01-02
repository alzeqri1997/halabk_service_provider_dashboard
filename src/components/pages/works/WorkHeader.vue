<template>
  <section class="wameed-dashboard-page-content_header">
    <div
      class="
        align-items-center
        justify-content-between
        flex-wrap
        mb-3
        pb-1
        px-4
        d-none d-flex
      "
    >
      <div class="col-md-5 col-sm-12 px-0 mt-3">
        <text-input
          icon="search-icon"
          isAppend
          id="login-email"
          v-model="search"
          v-debounce:1000ms="searchItem"
          inputClasses="text-reg-14 "
          name="search"
          placeholder="Search ..."
          fieldClasses="mb-0 search-form-control"
        />
      </div>
      <div class="d-flex flex-wrap">
        <div class="mx-2 mt-3">
          <wameed-btn
            classes="  text-medium-16 rounded-12"
            title="فلترة الطلبات"
            type="button"
            appendIcon="filter-icon"
            variant="white"
            @submitAction="filterOn = !filterOn"
          />
          <wameed-aside-modal
            :visible="filterOn"
            @close="filterOn = !filterOn"
            @applyFilter="applyFilter"
            @resetFilter="resetFilter"
            :content="content"
          />
        </div>
        <div class="ml-2 mt-3">
          <wameed-menu
            id="dropdown-1"
            classes=" text-medium-16"
            fieldClasses="mb-0 search-form-control "
            valueClasses="text-medium-16"
            title="ترتيب حسب الاحدث : "
            :subTitle="orderBy.name"
            variant="white"
            :items="orderByItems"
            text="name"
            activeItem="1"
            @dropdownClick="orderApplicants"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import WameedMenu from '@/components/wameed/WameedMenu.vue';
import WameedBtn from '@/components/wameed/WameedBtn.vue';
import TextInput from '@/components/wameed/WameedTextInput.vue';
import WameedAsideModal from '@/components/wameed/WameedAsideModal.vue';

export default {
  components: {
    WameedMenu,
    WameedBtn,
    TextInput,
    WameedAsideModal,
  },
  props: {
    subTitle: {
      type: String,
      default: null,
    },

    content: {
      type: Array,
      default: null,
    },
  },
  data: () => ({
    search: '',
    filterOn: false,
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
  methods: {
    searchItem() {
      this.$emit('orderApplicants', {
        search: this.search,
        order_by: this.orderBy.id,
      });
    },
    applyFilter() {
      this.$emit('applyFilter');
    },
    resetFilter() {
      this.$emit('resetFilter');
    },
    orderApplicants(item) {
      if (item) {
        this.orderBy = item;
      }
      this.$emit('orderApplicants', {
        search: this.search,
        order_by: this.orderBy.id,
      });
    },
  },
};
</script>
