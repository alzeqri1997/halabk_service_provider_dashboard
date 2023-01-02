<template>
  <div class="wameed-dashboard-page-content mb-5">
    <div>
      <page-header
        :title="$t('packages.details_title')"
        :sub-title="$t('packages.details_subtitle')"
      />
    </div>
    <section class="wameed-dashboard-page-content_body">
      <div class="mx-4">
        <b-row class="">
          <b-col md="6" class="my-4">
            <package-details-table :package-details="getPackageDetails" />
          </b-col>
          <b-col md="6" class="my-4">
            <package-details-images
              :images="getPackageDetails.images"
              :image="getPackageDetails.image"
            />
            <div class="package-orders">
              <div
                v-if="getPackageDetails.others"
                class="package-orders__buttons mb-5"
              >
                <wameed-btn
                  :title="$t('packages.order_special_ad')"
                  variant="main"
                  prepend-icon="arrow-circle-left-2-icon"
                  class="
                    change-icon-position
                    text-reg-15 text-white
                    rounded-14
                    px-4
                  "
                  :class="{
                    'text-line-through': checkOrderSpecial(
                      getPackageDetails.others.feature_status, getPackageDetails.others.cancel_status
                    ),
                  }"
                  :disabled="
                    checkOrderSpecial(getPackageDetails.others.feature_status, getPackageDetails.others.cancel_status)
                  "
                  @submitAction="showSpecialPackageModal = true"
                />

                <wameed-btn
                  :disabled="
                    checkCancelPackage(getPackageDetails.others.cancel_status)
                  "
                  :title="$t('packages.order_cancel_package')"
                  variant="danger"
                  prepend-icon="arrow-circle-left-2-icon"
                  class="
                    change-icon-position
                    text-reg-15 text-white
                    rounded-14
                    px-4
                  "
                  :class="{
                    'text-line-through': checkCancelPackage(
                      getPackageDetails.others.cancel_status
                    ),
                  }"
                  @submitAction="showCancelPackageModal = true"
                />
              </div>
              <special-package-modal
                :visible="showSpecialPackageModal"
                :startDate="getPackageDetails.start_date"
                @close="showSpecialPackageModal = false"
                @set-message="setRequestMessage"
              />

              <warning-modal
                hide-cancel-btn
                variant="success"
                icon-name="tick-circle-icon"
                :visible="showSuccessModal"
                :title="$t('packages.request_sent')"
                :sub-title="$t('packages.request_sent_message')"
                :btn-title="$t('common.OK')"
                @close="closeSpecialPackageModal"
                @submitAction="closeSpecialPackageModal"
              />

              <cancel-package-modal
                :visible="showCancelPackageModal"
                :package-id="getPackageDetails.id"
                @close="showCancelPackageModal = false"
                @set-message="setCancellationMessage"
              />
              <template
                v-if="
                  'others' in getPackageDetails &&
                  getPackageDetails.others !== null
                "
              >
                <div
                  v-if="getPackageDetails.others.cancel_reason !== null"
                  class="
                    my-5
                    package-details-table
                    bg-white
                    overflow-hidden
                    rounded-14
                  "
                >
                  <div
                    class="
                      package-details-table__title
                      text-font-main text-med-14
                      d-flex
                      justify-content-between
                      align-items-center
                    "
                  >
                    <span class="text-danger">{{
                      $t('packages.reason_for_cancellation')
                    }}</span>
                    <span class="text-font-secondary text-reg-12">
                      {{ currentDate() }}
                    </span>
                  </div>
                  <div class="package-details-table__body">
                    <p class="text-reg-14 text-font-secondary m-0">
                      {{ getPackageDetails.others.cancel_reason }}
                    </p>
                  </div>
                </div>
                <cancel-status-alert
                  v-if="getPackageDetails.others.cancel_status !== null"
                  :state="getPackageDetails.others.cancel_status"
                />
                <special-package-status-alert
                  v-if="getPackageDetails.others.feature_status !== null"
                  :state="getPackageDetails.others.feature_status"
                />
                <reason-message
                  v-if="getPackageDetails.others.admin_cancel_message !== null"
                  :date="getPackageDetails.others.cancel_date"
                  :text="getPackageDetails.others.admin_cancel_message"
                />
                <reason-message
                  v-if="getPackageDetails.others.admin_feature_message !== null"
                  :date="getPackageDetails.others.feature_date"
                  :text="getPackageDetails.others.admin_feature_message"
                  is-special-package
                />
              </template>
            </div>
          </b-col>
        </b-row>
      </div>
      <fetch-service-bookings :id="serviceId" />
    </section>
  </div>
</template>

<script>
import PackageDetailsTable from '@/components/pages/packages/PackageDetailsTable.vue';
import PackageDetailsImages from '@/components/pages/packages/PackageDetailsImages.vue';
import { mapActions, mapGetters } from 'vuex';
import PageHeader from '@/components/wameed/WameedPageHeader.vue';
import WameedBtn from '@/components/wameed/WameedBtn.vue';
import CancelPackageModal from '@/components/pages/packages/CancelPackageModal.vue';
import SpecialPackageModal from '@/components/pages/packages/SpecialPackageModal.vue';
import WarningModal from '@/components/wameed/WameedWarningModal.vue';
import CancelStatusAlert from '@/components/pages/packages/CancelStatusAlert.vue';
import SpecialPackageStatusAlert from '@/components/pages/packages/SpecialPackageStatusAlert.vue';
import ReasonMessage from '@/components/pages/packages/ReasonMessage.vue';
import FetchServiceBookings from '@/components/pages/packages/fetchServiceBookings.vue';

export default {
  components: {
    PackageDetailsTable,
    PackageDetailsImages,
    PageHeader,
    WameedBtn,
    CancelPackageModal,
    SpecialPackageModal,
    WarningModal,
    CancelStatusAlert,
    SpecialPackageStatusAlert,
    ReasonMessage,
    FetchServiceBookings,
  },
  data() {
    return {
      showSpecialPackageModal: false,
      showCancelPackageModal: false,
      cancellationMessage: '',
      requestMessage: '',
      showSuccessModal: false,
    };
  },
  computed: {
    ...mapGetters({
      getPackageDetails: 'getPackageDetails',
    }),
    serviceId() {
      return this.$router.currentRoute.params.id;
    },
  },
  mounted() {
    this.loadPackagesDetails(this.$router.currentRoute.params.id);
    this.loadAllCouponDropdown();
  },

  methods: {
    ...mapActions({
      loadPackagesDetails: 'loadPackagesDetails',
      loadFile: 'loadFile',
      loadAllCouponDropdown: 'loadAllCouponDropdown',
    }),
    checkOrderSpecial(status, cancelStatus) {
      if (this.getPackageDetails) {
        const isSoon = this.getPackageDetails.status === 'soon';
        if( isSoon && status === null && cancelStatus === null ){
          return false;
        }else{
          return true;
        }
      }
    },
    checkCancelPackage(status) {
      if (this.getPackageDetails) {
        const isSoon = this.getPackageDetails.status === 'soon';
        const isActive = this.getPackageDetails.status === 'active';

        if ((isSoon || isActive) && status === null) {
          return false;
        }
        return true;
      }
    },
    currentDate() {
      if (this.getPackageDetails.others) {
        const current = this.getPackageDetails.others.admin_cancel_message;
        const date = this.moment(current).format('DD/MM/YYYY');
        if (date === 'Invalid date') {
          return '';
        }
        return date;
      }
      return '';
    },
    setCancellationMessage(message) {
      this.cancellationMessage = message;
      this.loadPackagesDetails(this.$router.currentRoute.params.id);
    },
    setRequestMessage(message) {
      this.requestMessage = message;
      this.showSuccessModal = true;
    },
    closeSpecialPackageModal() {
      this.showSuccessModal = false;
      this.loadPackagesDetails(this.$router.currentRoute.params.id);
    },
  },
};
</script>
