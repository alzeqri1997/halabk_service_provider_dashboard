<template>
  <div class="wameed-dashboard-page-content">
    <page-header
      :title="$t('bookings.title')"
      :sub-title="
        this.$router.currentRoute.name == 'bookings'
          ? $t('bookings.subtitle')
          : ''
      "
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
              v-if="getAllBookings"
              :per-page="filterData.per_page"
              :items="getAllBookings"
              :fields="fields"
              :custimized-items="[
                { name: 'name' },
                { name: 'city' },
                { name: 'action' },
                { name: 'people' },
                { name: 'has_package' },
                { name: 'created_at' },
              ]"
            >
              <template slot="name" slot-scope="{ data }">
                <div class="d-flex justify-center align-items-center">
                  <b-avatar :src="data.item.image" />
                  <span class="text-font-main mx-3">{{ data.item.name }}</span>
                </div>
              </template>
              <template slot="city" slot-scope="{ data }">
                <div class="d-flex">
                  <span class="text-font-main mx-3">{{ data.item.city }}</span>
                </div>
              </template>
              <template slot="created_at" slot-scope="{ data }">
                <div class="d-flex">
                  <span class="text-font-main mx-3">{{
                    moment(data.item.created_at).format('ll')
                  }}</span>
                </div>
              </template>
              <template slot="people" slot-scope="{ data }">
                <div class="d-flex">
                  <span class="text-font-main mx-3">{{
                    data.item.people
                  }}</span>
                  {{ $t('packages.tourist') }}
                </div>
              </template>
              <template slot="has_package" slot-scope="{ data }">
                <div class="d-flex">
                  <span
                    v-if="data.item.has_package === 1"
                    class="text-success mx-3"
                    >{{ $t('subscription.card_selected') }}</span
                  >
                  <span
                    v-else-if="data.item.has_package === 0"
                    class="text-font-main mx-3"
                    >{{ $t('subscription.not_selected') }}</span
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
                    @click="bookingDetails(data.item.id)"
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
              v-if="getAllBookings && getAllBookings.length < 1"
              icon="nodata-icon"
              :title="$t('packages.no_data')"
              :sub-title="$t('packages.no_data_text')"
            />
          </div>
        </b-col>

        <b-col lg="12" md="12" class="px-0">
          <wameed-pagination
            v-model="filterData.page"
            :page="filterData.page"
            :total-items="getTotalBookings.totalItems"
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
import WTables from '../../wameed/WameedTables.vue';

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
        year: '',
        month: '',
        page: 1,
        per_page: 20,
        order_by: 'name',
        search: '',
      },
      content: [
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
          key: 'name',
          label: this.$i18n.t('bookings.user_name'),
          sortable: true,
        },
        {
          key:
            this.$router.currentRoute.name === 'bookings' ? 'service' : 'email',
          label:
            this.$router.currentRoute.name === 'bookings'
              ? this.$i18n.t('bookings.package')
              : this.$i18n.t('bookings.email'),
          sortable: true,
        },
        // {
        //   key: 'email',
        //   label: this.$i18n.t('bookings.email'),
        //   sortable: true,
        // },
        {
          key: 'phone',
          label: this.$i18n.t('bookings.phone_no'),
          sortable: true,
        },
        {
          key: 'created_at',
          label: this.$i18n.t('bookings.booking_time'),
          sortable: true,
        },
        {
          key: 'people',
          label: this.$i18n.t('bookings.individual_count'),
          sortable: true,
        },
        {
          key: 'has_package',
          label: this.$i18n.t('bookings.additions'),
          sortable: true,
        },
        { key: 'action', label: '' },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getAllBookings: 'getAllBookings',
      getTotalBookings: 'getTotalBookings',
      getFilterData: 'getFilterData',
    }),
  },
  watch: {
    getFilterData(newVal) {
      if (newVal) {
        this.content[1].data = newVal.months ? newVal.months : [];
        this.content[0].data = newVal.years ? newVal.years : [];
      }
    },
  },
  created() {
    this.loadData();
    this.loadFilterData('bookings');
  },
  methods: {
    ...mapActions({
      loadBookings: 'loadBookings',
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
      this.loadBookings(this.filterData);
    },
    bookingDetails(id) {
      this.$router.push({
        name: 'booking-details',
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
