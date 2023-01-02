<template>
  <div class="wameed-dashboard-page-content mb-5">
    <page-header
      :title="$t('coupons.coupon_details')"
      :sub-title="$t('coupons.coupon_details_subtitle')"
      :btn-title="$t('coupons.stop_coupon')"
      :btn="
        getCouponDetails &&
        (getCouponDetails.status == 'active' ||
          getCouponDetails.status == 'soon')
      "
      variant="danger"
      @btnAction="showCouponModal = true"
    />
    <section class="wameed-dashboard-page-content_body my-5">
      <b-row>
        <b-col v-if="getCouponDetails" md="12">
          <div
            class="
              package-details-table
              bg-white
              overflow-hidden
              rounded-14
              mx-4
            "
          >
            <h1 class="package-details-table__title text-font-main text-med-14">
              {{ $t('coupons.coupon_details') }}
            </h1>
            <b-row class="package-details-table__body">
              <b-col sm="3" class="mb-5 mb-sm-0 text-reg-16 text-font-sub">
                <p class="mb-0">
                  {{ $t('coupons.coupon_code') }}
                </p>
              </b-col>
              <b-col sm="6" class="text-reg-16 text-font-sub">
                <p class="mb-0">#{{ getCouponDetails.id }}</p>
              </b-col>
            </b-row>

            <b-row class="package-details-table__body">
              <b-col sm="3" class="mb-5 mb-sm-0 text-reg-16 text-font-sub">
                <p class="mb-0">
                  {{ $t('coupons.status') }}
                </p>
              </b-col>
              <div class="text-reg-16 text-font-sub">
                <b-badge
                  pill
                  :variant="'light-' + status[1][getCouponDetails.status]"
                  :class="'border-' + status[1][getCouponDetails.status]"
                  class="text-reg-12 py-0 px-3"
                  >{{
                    $t('common.' + status[0][getCouponDetails.status])
                  }}</b-badge
                >
              </div>
            </b-row>
            <b-row class="package-details-table__body">
              <b-col sm="3" class="mb-5 mb-sm-0 text-reg-16 text-font-sub">
                <p class="mb-0">
                  {{ $t('coupons.coupon_place') }}
                </p>
              </b-col>
              <b-col sm="6" class="text-reg-16 text-font-sub">
                <p class="mb-0">
                  {{ getCouponDetails.services.length }}
                  {{ $t('common.package') }}
                </p>
              </b-col>
            </b-row>

            <b-row class="package-details-table__body">
              <b-col sm="3" class="mb-5 mb-sm-0 text-reg-16 text-font-sub">
                <p class="mb-0">
                  {{ $t('coupons.no_of_avaliable') }}
                </p>
              </b-col>
              <b-col sm="6" class="text-reg-16 text-font-sub">
                <p
                  v-if="getCouponDetails.available_coupon_usage_count == 0"
                  class="mb-0"
                >
                  {{ $t('common.not_used') }}
                </p>
                <p
                  v-if="getCouponDetails.available_coupon_usage_count == 1"
                  class="mb-0"
                >
                  {{ $t('common.only_once') }}
                </p>
                <p
                  v-if="getCouponDetails.available_coupon_usage_count == 2"
                  class="mb-0"
                >
                  {{ $t('common.twice') }}
                </p>
                <p
                  v-if="
                    getCouponDetails.available_coupon_usage_count >= 3 &&
                    getCouponDetails.available_coupon_usage_count < 11
                  "
                  class="mb-0"
                >
                  {{
                    getCouponDetails.available_coupon_usage_count +
                    ' ' +
                    $t('common.times')
                  }}
                </p>
                <p
                  v-if="getCouponDetails.available_coupon_usage_count >= 11"
                  class="mb-0"
                >
                  {{
                    getCouponDetails.available_coupon_usage_count +
                    ' ' +
                    $t('common.once')
                  }}
                </p>
              </b-col>
            </b-row>

            <b-row class="package-details-table__body">
              <b-col sm="3" class="mb-5 mb-sm-0 text-reg-16 text-font-sub">
                <p class="mb-0">
                  {{ $t('coupons.usage_no') }}
                </p>
              </b-col>
              <b-col sm="6" class="text-reg-16 text-font-sub">
                <p v-if="getCouponDetails.coupon_usage_count == 0" class="mb-0">
                  {{ $t('common.not_used') }}
                </p>
                <p v-if="getCouponDetails.coupon_usage_count == 1" class="mb-0">
                  {{ $t('common.only_once') }}
                </p>
                <p v-if="getCouponDetails.coupon_usage_count == 2" class="mb-0">
                  {{ $t('common.twice') }}
                </p>
                <p
                  v-if="
                    getCouponDetails.coupon_usage_count >= 3 &&
                    getCouponDetails.coupon_usage_count < 11
                  "
                  class="mb-0"
                >
                  {{
                    getCouponDetails.coupon_usage_count +
                    ' ' +
                    $t('common.times')
                  }}
                </p>
                <p
                  v-if="getCouponDetails.coupon_usage_count >= 11"
                  class="mb-0"
                >
                  {{
                    getCouponDetails.coupon_usage_count +
                    ' ' +
                    $t('common.once')
                  }}
                </p>
              </b-col>
            </b-row>

            <b-row class="package-details-table__body">
              <b-col sm="3" class="mb-5 mb-sm-0 text-reg-16 text-font-sub">
                <p class="mb-0">
                  {{ $t('coupons.discount') }}
                </p>
              </b-col>
              <b-col sm="6" class="text-reg-16 text-font-sub">
                <p class="mb-0">{{ getCouponDetails.discount_rate }}%</p>
              </b-col>
            </b-row>

            <b-row class="package-details-table__body">
              <b-col sm="3" class="mb-5 mb-sm-0 text-reg-16 text-font-sub">
                <p class="mb-0">
                  {{ $t('coupons.coupon_name') }}
                </p>
              </b-col>
              <b-col sm="6" class="text-reg-16 text-font-sub">
                <p class="mb-0">{{ getCouponDetails.coupon }}</p>
              </b-col>
            </b-row>

            <b-row class="package-details-table__body">
              <b-col sm="3" class="mb-5 mb-sm-0 text-reg-16 text-font-sub">
                <p class="mb-0">
                  {{ $t('coupons.start_date') }}
                </p>
              </b-col>
              <b-col sm="6" class="text-reg-16 text-font-sub">
                <p class="mb-0">
                  {{ moment(getCouponDetails.start_date).format('ll') }}
                </p>
              </b-col>
            </b-row>

            <b-row class="package-details-table__body">
              <b-col sm="3" class="text-reg-16 text-font-sub">
                <p class="mb-0">
                  {{ $t('coupons.end_date') }}
                </p>
              </b-col>
              <b-col sm="6" class="mb-5 mb-sm-0 text-reg-16 text-font-sub">
                <p class="mb-0">
                  {{ moment(getCouponDetails.end_date).format('ll') }}
                </p>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col>
          <div class="wameed-dashboard-page-content">
            <section
              class="
                wameed-dashboard-page-content_body
                d-flex
                flex-column
                justify-content-between
              "
            >
              <div class="d-flex flex-wrap flex-1 px-2 my-1">
                <b-col lg="12" md="12" class="px-0">
                  <h1 class="text-font-main text-med-20 mx-2 py-5">
                    {{ $t('coupons.coupon_users') }}
                  </h1>
                  <div class="w-table d-flex flex-column">
                    <w-tables
                      v-if="getCouponUsers"
                      :per-page="filterData.per_page"
                      :items="getCouponUsers"
                      :fields="fields"
                      :status="[]"
                      :custimized-items="[
                        { name: 'name' },
                        { name: 'start_date' },
                        { name: 'package_user_count' },
                        { name: 'discount' },
                      ]"
                    >
                      <template slot="name" slot-scope="{ data }">
                        <div class="d-flex justify-center align-items-center">
                          <b-avatar :src="data.item.image" />
                          <span class="text-font-main mx-3">{{
                            data.item.name
                          }}</span>
                        </div>
                      </template>
                      <template slot="start_date" slot-scope="{ data }">
                        {{ moment(data.item.created_at).format('ll') }}
                      </template>
                      <template slot="package_user_count" slot-scope="{ data }">
                        {{ data.item.people + ' ' + $t('common.person') }}
                      </template>
                      <template slot="discount" slot-scope="{ data }">
                        {{ data.item.discount + ' ' + $t('common.SR') }}
                      </template>
                    </w-tables>

                    <wameed-no-data
                      v-if="getCouponUsers && getCouponUsers.length < 1"
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
                    :total-items="getTotalCouponUsers.totalItems"
                    :per_page="filterData.per_page"
                    @changePage="changePage"
                    @changeCurrentPage="changeCurrentPage"
                  />
                </b-col>
              </div>
            </section>
          </div>
        </b-col>
      </b-row>
    </section>
    <warning-modal
      variant="danger"
      icon-name="stop-icon"
      :visible="showCouponModal"
      :title="$t('coupons.stop_coupon')"
      :sub-title="$t('coupons.stop_coupon_subtitle')"
      :btn-title="$t('coupons.stop')"
      @close="showCouponModal = false"
      @submitAction="stopCoupon()"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import WTables from '@/components/wameed/WameedTables.vue';
import WameedPagination from '@/components/wameed/WameedPagination.vue';
import WameedNoData from '@/components/wameed/WameedNoData.vue';
import PageHeader from '@/components/wameed/WameedPageHeader.vue';
import WarningModal from '@/components/wameed/WameedWarningModal.vue';

export default {
  components: {
    WTables,
    WameedPagination,
    WameedNoData,
    PageHeader,
    WarningModal,
  },
  data() {
    return {
      showCouponModal: false,
      filterData: {
        couponId: this.$router.currentRoute.params.id,
        page: 1,
        per_page: 20,
      },
      fields: [
        {
          key: 'name',
          label: this.$i18n.t('coupons.user_name'),
          sortable: true,
        },
        {
          key: 'start_date',
          label: this.$i18n.t('coupons.usage_date'),
          sortable: true,
        },
        {
          key: 'package_user_count',
          label: this.$i18n.t('coupons.users_in_package'),
          sortable: true,
        },
        {
          key: 'discount',
          label: this.$i18n.t('coupons.discount_value'),
          sortable: true,
        },
      ],
      status: [
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
      getCouponDetails: 'getCouponDetails',
      getTotalCouponUsers: 'getTotalCouponUsers',
      getCouponUsers: 'getCouponUsers',
    }),
  },
  mounted() {
    this.loadData();
    this.loadCouponDetails(this.$router.currentRoute.params.id);
  },
  methods: {
    ...mapActions({
      loadCouponDetails: 'loadCouponDetails',
      loadCouponUsers: 'loadCouponUsers',
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
      this.loadCouponUsers(this.filterData);
    },
    stopCoupon() {
      this.$store.dispatch('stopCoupon', this.$router.currentRoute.params.id);
    },
  },
};
</script>
