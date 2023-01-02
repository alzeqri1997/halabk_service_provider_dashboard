<template>
  <div class="wameed-dashboard-page-content">
    <page-header
      :title="$t('coupons.title')"
      :sub-title="$t('coupons.subtitle')"
      :btn-title="$t('coupons.add_new_coupons')"
      route-name="addCoupon"
    />

    <div>
      <filter-header
        :content="content"
        @applyFilter="applyFilter"
        @resetFilter="resetFilter"
        @orderApplicants="orderCoupons"
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
              v-if="getAllCoupons"
              :per-page="filterData.per_page"
              :items="getAllCoupons"
              :fields="fields"
              :status="couponStatus"
              :custimized-items="[
                { name: 'city' },
                { name: 'action' },
                { name: 'start_date' },
                { name: 'end_date' },
                { name: 'services' },
                { name: 'coupon_usage_count' },
                { name: 'discount_rate' },
              ]"
            >
              <template slot="city" slot-scope="{ data }">
                <div class="d-flex">
                  <span class="text-font-main mx-3">{{ data.item.city }}</span>
                </div>
              </template>
              <template slot="start_date" slot-scope="{ data }">
                {{ moment(data.item.start_date).format('ll') }}
              </template>
              <template slot="end_date" slot-scope="{ data }">
                {{ moment(data.item.end_date).format('ll') }}
              </template>
              <template slot="services" slot-scope="{ data }">
                <span v-if="data.item.services == 1" class="mb-0">
                  {{ $t('common.one_package') }}
                </span>
                <span
                  v-if="data.item.services >= 2 && data.item.services < 11"
                  class="mb-0"
                >
                  {{ data.item.services + ' ' + $t('common.packages') }}
                </span>
                <span v-if="data.item.services >= 11" class="mb-0">
                  {{ data.item.services + ' ' + $t('common.package') }}
                </span>
              </template>
              <template slot="coupon_usage_count" slot-scope="{ data }">
                <span v-if="data.item.coupon_usage_count == 0" class="mb-0">
                  {{ $t('common.not_used') }}
                </span>
                <span v-if="data.item.coupon_usage_count == 1" class="mb-0">
                  {{ $t('common.only_once') }}
                </span>
                <span v-if="data.item.coupon_usage_count == 2" class="mb-0">
                  {{ $t('common.twice') }}
                </span>
                <span
                  v-if="
                    data.item.coupon_usage_count >= 3 &&
                    data.item.coupon_usage_count < 11
                  "
                  class="mb-0"
                >
                  {{ data.item.coupon_usage_count + ' ' + $t('common.times') }}
                </span>
                <span v-if="data.item.coupon_usage_count >= 11" class="mb-0">
                  {{ data.item.coupon_usage_count + ' ' + $t('common.once') }}
                </span>
              </template>
              <template slot="discount_rate" slot-scope="{ data }">
                {{ data.item.discount_rate + '%' }}
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
                    @click="couponDetails(data.item.id)"
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
              v-if="getAllCoupons && getAllCoupons.length < 1"
              icon="nodata-icon"
              :title="$t('packages.no_data')"
              :sub-title="$t('packages.no_data_text')"
            />
          </div>
        </b-col>

        <b-col lg="12" md="12" class="px-0">
          <wameed-pagination
            v-if="getTotalCoupons"
            v-model="filterData.page"
            :page="filterData.page"
            :total-items="getTotalCoupons.totalItems"
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
        city: '',
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
          title: 'city',
          key: 'city',
          id: 'id',
          name: 'name',
          selectedData: [],
          data: [],
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
          key: 'coupon',
          label: this.$i18n.t('coupons.coupon_name'),
          sortable: true,
        },
        {
          key: 'services',
          label: this.$i18n.t('coupons.coupon_place'),
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
          key: 'coupon_usage_count',
          label: this.$i18n.t('coupons.usage'),
          sortable: true,
        },
        {
          key: 'discount_rate',
          label: this.$i18n.t('coupons.discount'),
          sortable: true,
        },
        {
          key: 'status',
          label: this.$i18n.t('coupons.status'),
          sortable: true,
        },
        { key: 'action', label: '' },
      ],
      couponStatus: [
        {
          active: 'active',
          not_active: 'expired',
          soon: 'soon',
          expired: 'expired',
        },
        {
          active: 'success',
          soon: 'warning',
          not_active: 'danger',
          expired: 'danger',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getAllCoupons: 'getAllCoupons',
      getTotalCoupons: 'getTotalCoupons',
      getFilterData: 'getFilterData',
    }),
  },
  watch: {
    getFilterData(newVal) {
      if (newVal) {
        this.content[3].data = newVal.months ? newVal.months : [];
        this.content[2].data = newVal.years ? newVal.years : [];
        this.content[1].data = newVal.cities ? newVal.cities : [];
      }
    },
  },
  created() {
    this.loadData();
    this.loadFilterData('coupons');
  },
  methods: {
    ...mapActions({
      loadCoupons: 'loadCoupons',
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
      this.loadCoupons(this.filterData);
    },
    couponDetails(id) {
      this.$router.push({
        name: 'coupon-details',
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
    orderCoupons(item) {
      this.filterData = {
        ...this.filterData,
        ...item,
      };
      this.loadData();
    },
  },
};
</script>
