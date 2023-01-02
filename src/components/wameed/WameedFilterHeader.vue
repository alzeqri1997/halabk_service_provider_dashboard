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
          id="login-email"
          v-model="search"
          v-debounce:1000ms="searchItem"
          icon="search-icon"
          is-append
          input-classes="text-reg-14 "
          name="search"
          :placeholder="$t('common.search') + ' ...'"
          field-classes="mb-0 search-form-control"
        />
      </div>
      <div class="d-flex flex-wrap">
        <div class="mx-2 mt-3">
          <wameed-btn
            classes="  text-medium-16 rounded-12"
            :title="$t('common.filter_data')"
            type="button"
            append-icon="filter-icon"
            variant="white"
            @submitAction="filterOn = !filterOn"
          />
          <wameed-aside-modal
            :visible="filterOn"
            :content="content"
            @close="filterOn = !filterOn"
            @applyFilter="applyFilter"
            @resetFilter="resetFilter"
          />
        </div>
        <div class="ml-2 mt-3">
          <wameed-menu
            id="dropdown-1"
            classes=" text-medium-16"
            field-classes="mb-0 search-form-control "
            value-classes="text-medium-16"
            :title="$t('common.order_by') + ' : '"
            :sub-title="orderBy.name"
            variant="white"
            :items="orderByItems"
            text="name"
            active-item="1"
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
  data() {
    return {
      search: '',
      filterOn: false,
      orderBy: {
        name: this.$i18n.t('common.alphabetical'),
        id: 'name',
      },
      orderByItems: [
        {
          name: this.$i18n.t('common.newest'),
          id: 'desc',
        },
        {
          name: this.$i18n.t('common.older'),
          id: 'asc',
        },
        {
          name: this.$i18n.t('common.alphabetical'),
          id: 'name',
        },
      ],
    };
  },
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
