<template>
  <div class="wameed-dashboard-page-content">
    <page-header
      :title="$t('financial.title')"
      :sub-title="$t('financial.subtitle')"
    />

    <div>
      <filter-header
        :content="content"
        @applyFilter="applyFilter"
        @resetFilter="resetFilter"
        @orderApplicants="orderItems"
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
              v-if="getAllFinancial"
              :per-page="filterData.per_page"
              :items="getAllFinancial"
              :fields="fields"
              :custimized-items="[
                { name: 'download' },
                { name: 'id' },
                { name: 'amount' },
                { name: 'created_at' },
              ]"
            >
              <template slot="id" slot-scope="{ data }">
                <div class="d-flex">#{{ data.item.id }}</div>
              </template>
              <template slot="amount" slot-scope="{ data }">
                <div class="d-flex">
                  {{ data.item.amount }} {{ $t('common.SR') }}
                </div>
              </template>
              <template slot="created_at" slot-scope="{ data }">
                <div class="d-flex">
                  <span class="text-font-main mx-3">
                    {{
                      moment(data.item.created_at).format(
                        ' MMMM YYYY DD h:mm A'
                      )
                    }}</span
                  >
                </div>
              </template>
              <template slot="download" slot-scope="{ data }">
                <div class="d-flex">
                  <wameed-btn
                    classes="  text-medium-16 rounded-12 download-btn"
                    :title="$t('financial.download')"
                    type="button"
                    append-icon="download-icon"
                    variant="background"
                    @submitAction="downloadReceipt(data.item.id)"
                  />
                </div>
              </template>
            </w-tables>
            <wameed-no-data
              v-if="getAllFinancial && getAllFinancial.length < 1"
              icon="nodata-icon"
              :title="$t('packages.no_data')"
              :sub-title="$t('packages.no_data_text')"
            />
          </div>
        </b-col>

        <b-col lg="12" md="12" class="px-0">
          <wameed-pagination
            v-if="getTotalFinancial"
            v-model="filterData.page"
            :page="filterData.page"
            :total-items="getTotalFinancial.totalItems"
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
import WameedBtn from '@/components/wameed/WameedBtn.vue';

export default {
  components: {
    WameedPagination,
    WameedNoData,
    PageHeader,
    FilterHeader,
    WTables,
    WameedBtn,
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
          key: 'id',
          label: this.$i18n.t('financial.order_no'),
          sortable: true,
        },
        {
          key: 'amount',
          label: this.$i18n.t('financial.amount'),
          sortable: true,
        },
        {
          key: 'created_at',
          label: this.$i18n.t('financial.order_date'),
          sortable: true,
        },
        {
          key: 'download',
          label: this.$i18n.t('financial.download_receipt'),
          sortable: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getAllFinancial: 'getAllFinancial',
      getTotalFinancial: 'getTotalFinancial',
      getFilterData: 'getFilterData',
      getProfileInfo: 'getProfileInfo',
    }),
  },
  watch: {
    getFilterData(newVal) {
      if (newVal) {
        this.content[1].data = newVal.months ? newVal.months : [];
        this.content[0].data = newVal.years ? newVal.years : [];
      }
    },
    getProfileInfo(val) {
      const [reports] = val.restrictions.filter(
        (item) => item.name === 'reports'
      )

      if(reports.code === '02_06_01'){
        this.$router.push({name: 'packages'});
      }
    },
  },
  created() {
    this.loadData();
    this.loadFilterData('financials');
  },
  methods: {
    ...mapActions({
      loadFinancial: 'loadFinancial',
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
      this.loadFinancial(this.filterData);
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
    orderItems(item) {
      this.filterData = {
        ...this.filterData,
        ...item,
      };
      this.loadData();
    },
    downloadReceipt(id) {
      // todo download receipt
      this.$store.commit('loadingStart', null);
      this.$store
        .dispatch('downloadInvoiceReceipt', id)
        .then(res => {
          this.$store.commit('loadingFinish', null);
          window.open(res);
        })
        .catch(err => {
          this.$store.commit('loadingFinish');
        });
    },
  },
};
</script>
