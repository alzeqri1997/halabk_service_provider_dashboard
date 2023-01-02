<template>
  <div class="wameed-dashboard-page-content">
    <page-header
      :title="$t('profits.title')"
      :sub-title="'23 ' + $t('profits.subtitle')"
    />

    <div>
      <filter-header
        :content="content"
        @applyFilter="applyFilter"
        @resetFilter="resetFilter"
        @orderApplicants="orderApplicants"
      />
    </div>
    <section
      class="
        wameed-dashboard-page-content_body
        d-flex
        flex-column
        justify-content-between
        overflow-hidden
      "
    >
      <div class="d-flex flex-wrap flex-1 px-2">
        <b-col lg="12" md="12" class="px-0">
          <div class="w-table d-flex flex-column">
            <w-tables
              v-if="getAllProfits"
              :per-page="filterData.per_page"
              :items="getAllProfits"
              :fields="fields"
              :status="status"
              :custimized-items="[
                { name: 'title' },
                { name: 'registered' },
                { name: 'action' },
                { name: 'start_date' },
                { name: 'end_date' },
                { name: 'people' },
                { name: 'amount' },
              ]"
            >
              <template slot="title" slot-scope="{ data }">
                <div class="d-flex justify-center align-items-center">
                  <b-avatar :src="data.item.image" />
                  <span class="text-font-main mx-3">{{ data.item.title }}</span>
                </div>
              </template>
              <template slot="start_date" slot-scope="{ data }">
                <div class="d-flex">
                  <span class="text-font-main mx-3">{{
                    moment(data.item.start_date).format('ll')
                  }}</span>
                </div>
              </template>
              <template slot="end_date" slot-scope="{ data }">
                <div class="d-flex">
                  <span class="text-font-main mx-3">{{
                    moment(data.item.end_date).format('ll')
                  }}</span>
                </div>
              </template>
              <template slot="people" slot-scope="{ data }">
                <div class="d-flex">
                  <span class="text-font-main mx-3"
                    >{{ data.item.people }} {{ $t('packages.tourist') }}</span
                  >
                </div>
              </template>
              <template slot="amount" slot-scope="{ data }">
                <div class="d-flex">
                  <span class="text-font-main mx-3"
                    >{{ data.item.amount }} {{ $t('common.SR') }}</span
                  >
                </div>
              </template>
              <template slot="action" slot-scope="{ data }">
                <b-dropdown
                  variant="background"
                  toggle-class="text-decoration-none rounded-10 px-2 py-2 "
                  menu-class="rounded-14"
                  no-caret
                  dropleft
                >
                  <template v-slot:button-content>
                    <vertical-dots-icon class="mx-3 my-1" />
                  </template>
                  <b-dropdown-item
                    link-class="py-0min-height: 52px;"
                    @click="packageDetails(data.item.id)"
                  >
                    <span class="text-regular-14 text-font-secondary">
                      <eyeon-icon class="mx-2" />
                      {{ $t('common.show_details') }}
                    </span>
                  </b-dropdown-item>
                </b-dropdown>
              </template>
            </w-tables>
            <wameed-no-data
              v-if="getAllProfits && getAllProfits.length < 1"
              icon="nodata-icon"
              :title="$t('packages.no_data')"
              :sub-title="$t('packages.no_data_text')"
            />
          </div>
        </b-col>

        <b-col lg="12" md="12" class="px-0">
          <wameed-pagination
            v-if="getTotalProfits"
            v-model="filterData.page"
            :page="filterData.page"
            :total-items="getTotalProfits.totalItems"
            :per_page="filterData.per_page"
            @changePage="changePage"
            @changeCurrentPage="changeCurrentPage"
          />
        </b-col>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import WameedPagination from '@/components/wameed/WameedPagination.vue';
import WameedNoData from '@/components/wameed/WameedNoData.vue';
import PageHeader from '@/components/wameed/WameedPageHeader.vue';
import FilterHeader from '@/components/wameed/WameedFilterHeader.vue';
import WTables from '@/components/wameed/WameedTables.vue';

export default {
  components: {
    WameedPagination,
    WameedNoData,
    PageHeader,
    FilterHeader,
    WTables,
  },
  data() {
    return {
      filterData: {
        status: '',
        year: '',
        month: '',
        page: 1,
        per_page: 20,
        order_by: 'name',
        search: '',
      },
      content: [
        {
          title: 'status',
          key: 'status',
          id: 'id',
          name: 'title',
          selectedData: [],
          translate: true,
          data: [
            {
              id: 'soon',
              title: 'soon',
            },
            {
              id: 'active',
              title: 'active',
            },
            {
              id: 'expired',
              title: 'expired',
            },
          ],
        },
        {
          title: 'year',
          key: 'year',
          id: 'id',
          name: 'name',
          selectedData: [],
          data: [],
        },
        {
          title: 'month',
          key: 'month',
          id: 'id',
          name: 'name',
          translate: true,
          selectedData: [],
          data: [],
        },
      ],
      fields: [
        {
          key: 'title',
          label: this.$i18n.t('packages.package_name'),
          sortable: true,
        },
        {
          key: 'city',
          label: this.$i18n.t('packages.city'),
          sortable: true,
        },
        {
          key: 'start_date',
          label: this.$i18n.t('packages.start_date'),
          sortable: true,
        },
        {
          key: 'end_date',
          label: this.$i18n.t('packages.end_date'),
          sortable: true,
        },
        {
          key: 'people',
          label: this.$i18n.t('profits.booking'),
          sortable: true,
        },
        {
          key: 'amount',
          label: this.$i18n.t('profits.total_profit'),
          sortable: true,
        },
        {
          key: 'status',
          label: this.$i18n.t('packages.status'),
          sortable: true,
        },
        { key: 'action', label: '' },
      ],
      status: [
        {
          active: 'active',
          not_active: 'not_active',
          soon: 'soon',
          expired: 'expired',
          not_available: 'not_available',
        },
        {
          active: 'success',
          soon: 'warning',
          not_active: 'danger',
          expired: 'danger',
          not_available: 'danger',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getAllProfits: 'getAllProfits',
      getTotalProfits: 'getTotalProfits',
      getFilterData: 'getFilterData',
    }),
  },
  watch: {
    getFilterData(newVal) {
      if (newVal) {
        this.content[2].data = newVal.months ? newVal.months : [];
        this.content[1].data = newVal.years ? newVal.years : [];
      }
    },
  },
  created() {
    this.loadData();
    this.loadFilterData('profits');
  },
  methods: {
    ...mapActions({
      loadProfits: 'loadProfits',
      loadFilterData: 'loadFilterData',
    }),
    changeCurrentPage(item) {
      this.filterData = {
        ...this.filterData,
        per_page: item.id,
      };
      this.loadData();
    },
    changePage(event) {
      this.filterData = {
        ...this.filterData,
        page: event,
      };
      this.loadData();
    },
    loadData() {
      this.loadProfits(this.filterData);
    },
    packageDetails(id) {
      this.$router.push({
        name: 'package-details',
        params: { lang: this.$i18n.locale, id },
      });
    },
    applyFilter() {
      this.content.forEach(item => {
        this.filterData[item.key] = item.selectedData.toString();
      });
      this.loadData();
    },
    resetFilter() {
      this.content.forEach((item, i) => {
        this.content[i].selectedData = [];
        this.filterData[item.key] = item.selectedData.toString();
      });
      this.loadData();
    },
    orderApplicants(item) {
      this.filterData = {
        ...this.filterData,
        ...item,
      };
      this.loadData();
    },
  },
};
</script>
