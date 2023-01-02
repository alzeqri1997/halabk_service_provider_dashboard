

<template>
  <div class="wameed-dashboard-page-content">
    <page-header
      btn
      variant="main"
      v-if="getAllPackages"
      :title="$t('packages.title')"
      :subTitle="getAllPackages.length + ' ' + $t('packages.subtitle')"
      :btnTitle="$t('packages.add_new_packages')"
      @btnAction="checkMaximumPackages()"
    />

    <div>
      <filter-header
        @applyFilter="applyFilter"
        @resetFilter="resetFilter"
        @orderApplicants="orderApplicants"
        :content="content"
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
              :perPage="filterData.per_page"
              :items="getAllPackages"
              :fields="fields"
              v-if="getAllPackages"
              :status="status"
              :custimizedItems="[
                { name: 'title' },
                { name: 'action' },
                { name: 'start_date' },
                { name: 'end_date' },
                { name: 'registered' },
              ]"
            >
              <template slot="title" slot-scope="{ data }">
                <div class="d-flex justify-center align-items-center">
                  <b-avatar :src="data.item.image" />
                  <span class="text-font-main mx-3">{{ data.item.title }}</span>
                </div>
              </template>

              <template slot="start_date" slot-scope="{ data }">
                {{ moment(data.item.start_date).format('ll') }}
              </template>
              <template slot="end_date" slot-scope="{ data }">
                {{ moment(data.item.end_date).format('ll') }}
              </template>

              <template slot="registered" slot-scope="{ data }">
                <div>
                  {{ data.item.max_people - data.item.available_people }}
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
                    @click="packageDetails(data.item.id)"
                    link-class="py-0min-height: 52px;"
                  >
                    <span class="text-regular-14 text-font-secondary">
                      <eyeon-icon class="mx-2" />
                      {{ $t('common.show_details') }}
                    </span>
                  </b-dropdown-item>
                  <b-dropdown-item
                    v-if="checkOrderSpecial(data.item.others.feature_status, data.item.others.cancel_status , data.item.status)"
                    @click="openSpecialOrderPackage(data.item.start_date, data.item.id)"
                    link-class="py-0min-height: 52px;"
                  >
                    <span class="text-regular-14 text-secondary">
                      <crown-icon class="mx-2" />
                      {{ $t('packages.activate_as_spacial_package') }}
                    </span>
                  </b-dropdown-item>

                  <b-dropdown-item
                    v-if="checkCancelPackage(data.item.others.cancel_status, data.item.status)"
                    @click="openCancelPackage(data.item.id)"
                    link-class="py-0min-height: 52px;"
                  >
                    <span class="text-regular-14 text-danger">
                      <forbidden-icon class="mx-2" />
                      {{ $t('packages.order_cancel_package') }}
                    </span>
                  </b-dropdown-item>
                </b-dropdown>
              </template>
            </w-tables>
            <wameed-no-data
              v-if="getAllPackages && getAllPackages.length < 1"
              icon="nodata-icon"
              :title="$t('packages.no_data')"
              :subTitle="$t('packages.no_data_text')"
            />
          </div>
        </b-col>

        <b-col lg="12" md="12" class="px-0">
          <wameed-pagination
            v-model="filterData.page"
            :page="filterData.page"
            @changePage="changePage"
            :totalItems="getTotalPackages.totalItems"
            :per_page="filterData.per_page"
            @changeCurrentPage="changeCurrentPage"
          />
        </b-col>
      </div>
    </section>
    <special-package-modal
      :visible="showSpecialPackageModal"
      :startDate="packageDate"
      :packageId="packageId"
      @close="showSpecialPackageModal = false"
      @set-message="setRequestMessage"
    ></special-package-modal>

    <warning-modal
      hideCancelBtn
      variant="success"
      iconName="tick-circle-icon"
      :visible="showSuccessModal"
      @close="showSuccessModal = false"
      @submitAction="showSuccessModal = false"
      :title="$t('packages.request_sent')"
      :subTitle="$t('packages.request_sent_message')"
      :btnTitle="$t('common.OK')"
    ></warning-modal>
    <warning-modal
      variant="secondary"
      iconName="alert-warning-icon"
      :visible="showMaximumLimitModal"
      @close="closeMaximumLimitModal"
      @submitAction="goto('subscription')"
      :title="$t('packages.you_have_reached_the_limit')"
      :subTitle="$t('packages.you_have_reached_the_limit_placeholder')"
      :btnTitle="$t('common.upgrade_package')"
    ></warning-modal>
    <cancel-package-modal
      :packageId="packageId"
      :visible="showCancelPackageModal"
      @close="showCancelPackageModal = false"
      @set-message="setCancellationMessage"
    ></cancel-package-modal>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';
import WameedPagination from '@/components/wameed/WameedPagination.vue';
import WameedNoData from '@/components/wameed/WameedNoData.vue';
import PageHeader from '@/components/wameed/WameedPageHeader.vue';
import FilterHeader from '@/components/wameed/WameedFilterHeader.vue';
import WTables from '@/components/wameed/WameedTables.vue';
import CancelPackageModal from '@/components/pages/packages/CancelPackageModal.vue';
import SpecialPackageModal from '@/components/pages/packages/SpecialPackageModal.vue';
import WarningModal from '@/components/wameed/WameedWarningModal.vue';

export default {
  components: {
    WameedPagination,
    WameedNoData,
    PageHeader,
    FilterHeader,
    WTables,
    CancelPackageModal,
    SpecialPackageModal,
    WarningModal,
  },
  data() {
    return {
      packageId: null,
      packageDate:null,
      showMaximumLimitModal: false,
      showSpecialPackageModal: false,
      showSuccessModal: false,
      showCancelPackageModal: false,
      filterData: {
        status: '',
        city: '',
        page: 1,
        per_page: 20,
        order_by: 'name',
        search: '',
      },
      content: [
        {
          title: 'status',
          id: 'id',
          name: 'title',
          count: null,
          key: 'status',
          selectedData: [],
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
          key: 'max_people',
          label: this.$i18n.t('packages.individual_count'),
          sortable: true,
        },
        {
          key: 'registered',
          label: this.$i18n.t('packages.registared'),
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
      getAllPackages: 'getAllPackages',
      getTotalPackages: 'getTotalPackages',
      getFilterData: 'getFilterData',
    }),
  },
  watch: {
    getFilterData(newVal) {
      if (newVal) {
        this.content[1].data = newVal.cities ? newVal.cities : [];
      }
    },
  },
  created() {
    this.loadData();
    this.loadFilterData('services');
  },
  methods: {
    ...mapActions({
      loadPackages: 'loadPackages',
      loadFilterData: 'loadFilterData',
    }),
    openSpecialOrderPackage(date, id){
      this.showSpecialPackageModal = true
      this.packageDate = date;
      this.packageId = id;
    },
    openCancelPackage(id){
      this.showCancelPackageModal = true
      this.packageId = id;
    },
    closeMaximumLimitModal() {
      this.showMaximumLimitModal = false;
    },
    goto(destination) {
      this.$router.push({ name: destination });
    },
    setRequestMessage(message) {
      this.requestMessage = message;
      this.showSuccessModal = true;
    },
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
      this.loadPackages(this.filterData);
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
      this.content.forEach(item => {
        item.selectedData = [];
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
    setCancellationMessage(message) {
      this.cancellationMessage = message;
    },
    checkOrderSpecial(status, cancelStatus, packageStatus) {
        const isSoon = packageStatus === 'soon';
        if( isSoon && status === null && cancelStatus === null ){
          return true;
        }else{
          return false;
        }
    },
    checkCancelPackage(status, packageStatus) {
        const isSoon = packageStatus === 'soon';
        const isActive = packageStatus === 'active';

        if ((isSoon || isActive) && status === null) {
          return true;
        }
        return false;
    },
    checkMaximumPackages() {
      if (this.getTotalPackages.restrictions === '02_01_00') {
        this.$router.push({
          name: 'addPackage',
        });
      }
      if (this.getTotalPackages.restrictions === '02_01_01') {
        this.showMaximumLimitModal = true;
      }
    },
  },
};
</script>
 

