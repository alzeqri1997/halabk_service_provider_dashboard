<template>
  <div>
    <form-wizard
      :title="null"
      color="#f5c000"
      :subtitle="null"
      shape="circle"
      finish-button-text="Submit"
      back-button-text="Previous"
      class="mb-3"
      @on-complete="onComplete"
    >
      <template slot="step" scope="props">
        <custom-step
          :key="props.tab.title"
          :tab="props.tab"
          :transition="props.transition"
          :index="props.index"
        />
      </template>
      <!-- step 1 tab -->
      <tab-content
        :title="$t('packages.details_title')"
        :before-change="validationStepOneForm"
      >
        <validation-observer ref="stepOneForm" tag="form">
          <b-row>
            <b-col cols="12">
              <h5 class="tab-title">
                {{ $t('packages.package_info') }}
              </h5>
            </b-col>
            <b-col md="6">
              <div @click="$refs.imageinput.click()">
                <text-input
                  id="main-image"
                  v-model="imageName"
                  readonly
                  name="mainImage"
                  rules="required"
                  :label="$t('packages.main_image')"
                  :placeholder="$t('packages.main_image_placeholder')"
                  is-append
                  append-class="append-btn"
                  :append-text="$t('packages.browse')"
                />
              </div>
              <input
                ref="imageinput"
                type="file"
                accept="image/png, image/jpeg"
                style="display: none"
                @change="uploadImageAction($event)"
              />
            </b-col>
            <b-col md="6">
              <text-input
                id="package-name"
                v-model="submitData.packageName"
                :label="$t('packages.tourism_package_name')"
                :placeholder="$t('packages.tourism_package_name_placeholder')"
                :name="$t('packages.tourism_package_name')"
                rules="required|max:40"
              />
            </b-col>
            <b-col md="6">
              <wameed-dropdown
                id="journey-type"
                v-if="getAllPackageDropdown"
                v-model="submitData.journeyType"
                :label="$t('packages.journey_type')"
                :placeholder="$t('packages.journey_type_placholder')"
                classes="text-medium-16 w-100"
                value-classes="  text-medium-16  text-font-secondary"
                title="title"
                variant="disable"
                :items="getAllPackageDropdown.service_types"
                text="title"
                name="journeyType"
                rules="required"
              />
            </b-col>
            <b-col md="6">
              <wameed-dropdown
                id="package-city"
                v-if="getAllPackageDropdown"
                v-model="submitData.packageCity"
                :label="$t('packages.package_city')"
                :placeholder="$t('packages.package_city_placeholder')"
                classes="text-medium-16 w-100"
                value-classes="  text-medium-16  text-font-secondary"
                title="title"
                variant="disable"
                :items="getAllPackageDropdown.service_destinations"
                text="title"
                name="packageCity"
                rules="required"
              />
            </b-col>
            <b-col md="12">
              <div @click="showPackageMap = true">
                <text-input
                  id="map-address"
                  v-model="address"
                  readonly
                  name="location"
                  rules="required"
                  :label="$t('packages.map_address')"
                  :placeholder="$t('packages.map_address_placeholder')"
                  append-class="append-btn"
                  :append-text="$t('packages.browse')"
                />
              </div>
            </b-col>
            <package-map
              @setLocation="setLocation"
              :visible="showPackageMap"
              @close="showPackageMap = false"
            ></package-map>
            <b-col md="6">
              <text-input
                id="admin-number"
                v-model="submitData.adminNumber"
                :label="$t('packages.supervisors_count')"
                :placeholder="$t('packages.supervisors_count_placeholder')"
                :name="$t('packages.supervisors_count')"
                rules="required|numeric|min_value:1"
              />
            </b-col>
            <b-col md="6">
              <text-input
                id="tourist-capacity"
                v-model="submitData.touristCapacity"
                :label="$t('packages.tourist_capacity')"
                :placeholder="$t('packages.tourist_capacity_placeholder')"
                :name="$t('packages.tourist_capacity')"
                rules="required|numeric|min_value:1"
                is-append
                :append-text="$t('packages.person')"
              />
            </b-col>
            <!-- date picker  -->
            <b-col md="6">
              <date-picker
                id="start-date"
                v-model="submitData.journeyStartDate"
                name="journeyStartDate"
                rules="required"
                :label="$t('packages.journey_start_date')"
                :placeholder="$t('packages.journey_start_date_placeholder')"
                :config="{
                  type: 'string',
                  mask: 'YYYY/MM/DD',
                }"
                :popover="{
                  visibility: 'click',
                }"
              ></date-picker>
            </b-col>
            <b-col md="6">
              <date-picker
                :disabled="submitData.journeyStartDate ? false : true"
                id="end-date"
                v-model="submitData.journeyEndDate"
                name="journeyEndDate"
                rules="required"
                :label="$t('packages.journey_end_date')"
                :placeholder="$t('packages.journey_end_date_placeholder')"
                :config="{
                  type: 'string',
                  mask: 'YYYY/MM/DD',
                }"
                :popover="{
                  visibility: 'click',
                }"
                :attributes="dateAttributes"
                :minDate="submitData.journeyStartDate"
              ></date-picker>
            </b-col>

            <b-col md="12">
              <wameed-dropdown
                id="package-interests"
                v-if="getAllPackageDropdown"
                v-model="submitData.packageInterests"
                :label="$t('packages.interests')"
                :placeholder="$t('packages.interests_placeholder')"
                classes="text-medium-16 w-100"
                value-classes="  text-medium-16  text-font-secondary"
                title="title"
                variant="disable"
                :items="getAllPackageDropdown.service_interests"
                text="title"
                name="packageInterests"
                rules="required"
                multiple
              />
            </b-col>

            <b-col md="12">
              <text-area
                id="package-details"
                v-model="submitData.packageDetails"
                :label="$t('packages.details_title')"
                :placeholder="$t('packages.details_title_placeholder')"
                input-classes="text-med-14 text-font-main"
                name="packageDetails"
                rules="required"
                rows="5"
              />
            </b-col>

            <b-col md="12">
              <text-area
                id="package-conditions"
                v-model="submitData.packageConditions"
                :label="$t('packages.package_conditions')"
                :placeholder="$t('packages.package_conditions_placeholder')"
                input-classes="text-med-14 text-font-main"
                name="packageConditions"
                rules="required"
                rows="3"
              />
            </b-col>

            <b-col md="6">
              <b-form-group>
                <label label class="text-font-main required">{{
                  $t('packages.package_content')
                }}</label>
                <validation-provider
                  #default="{ errors }"
                  name="packageContent"
                  vid="packageContent"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <div
                      class="package-contents form-control overflow-hidden"
                      :class="errors.length > 0 ? 'is-invalid' : null"
                      @click="showPackageContent = true"
                    >
                      <input
                        type="text"
                        hidden
                        v-model="submitData.packageContents"
                      />
                      <span
                        v-if="submitData.packageContents.length === 0"
                        class="placeholder"
                      >
                        {{ $t('packages.please_select_package_content') }}
                      </span>

                      <template
                        v-else
                        v-for="(
                          packageItem, index
                        ) in submitData.packageContents"
                      >
                        <b-badge
                          v-if="packageItem.name"
                          :key="index"
                          variant="primary"
                          class="package-contents__badge text-reg-12"
                          :class="{
                            'green-badge': packageItem.isInclude.isInclude,
                          }"
                        >
                          {{ shortenText(packageItem.name, 25) }}
                        </b-badge>
                      </template>

                      <arrow-down-icon class="absolute-arrow-down" ></arrow-down-icon>
                    </div>
                  </b-input-group>

                  <package-content
                    :visible="showPackageContent"
                    :packages-content="submitData.packageContents"
                    @close="showPackageContent = false"
                    @add-package-content="updatePackageContents"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <!-- FAQ -->
            <b-col md="6">
              <b-form-group>
                <label label class="text-font-main">{{
                  $t('packages.FAQ')
                }}</label>
                <validation-provider #default="{ errors }" name="FAQ" vid="FAQ">
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <div
                      class="package-contents form-control"
                      :class="errors.length > 0 ? 'is-invalid' : null"
                      @click="showFAQ = true"
                    >
                      <input type="text" hidden v-model="submitData.FAQ" />
                      <span
                        v-if="submitData.FAQ.length === 0"
                        class="placeholder"
                      >
                        {{ $t('packages.please_add_FAQ') }}
                      </span>

                      <b-badge
                        v-if="submitData.FAQ.length !== 0"
                        variant="icon"
                        class="package-contents__badge bg-icon text-reg-12"
                      >
                        {{
                          $t('packages.added') +
                          submitData.FAQ.length +
                          $t('packages.FAQ-added')
                        }}
                      </b-badge>
                      <arrow-down-icon class="absolute-arrow-down" ></arrow-down-icon>
                    </div>
                  </b-input-group>

                  <FAQ
                    :visible="showFAQ"
                    :faq="submitData.FAQ"
                    @close="showFAQ = false"
                    @add-faq="updateFAQ"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="12">
              <multi-images-upload
                id="packageImages"
                :max="4"
                clear-all=""
                :label="$t('packages.package_images')"
                name="packageImages"
                rules="required"
                @changed="updateImages"
              />
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>

      <!-- step 2 tab - خط السير -->
      <tab-content
        :title="$t('packages.journey_line')"
        :before-change="validationStepTwoForm"
      >
        <validation-observer ref="stepTwoForm" tag="form">
          <b-row
            v-for="(traffic, index) in submitData.repeaterTraffic"
            :key="index"
            class="pb-5"
          >
            <b-col cols="12" class="mb-2">
              <div
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  tab-title
                "
              >
                <h5>{{ traffic.heading }}{{ $t('days.day' + (index + 1)) }}</h5>
                <small>{{ dateRange[index] }}</small>
              </div>
            </b-col>
            <b-col md="12">
              <text-input
                :id="'traffic-title' + index"
                v-model="traffic.title"
                :name="'trafficTitle' + index"
                rules="required"
                :label="$t('packages.traffic_title')"
                :placeholder="$t('packages.traffic_title_placeholder')"
              />
            </b-col>
            <b-col md="6">
              <calender
                :id="'time-from' + index"
                v-model="traffic.from"
                :name="'timeFrom' + index"
                rules="required"
                :label="$t('packages.time_from')"
                :placeholder="$t('packages.time_from_placeholder')"
                :config-params="{
                  noCalendar: true,
                  enableTime: true,
                  dateFormat: 'H:i',
                }"
              />
            </b-col>
            <b-col md="6">
              <calender
                :id="'time-to' + index"
                v-model="traffic.to"
                :name="'timeTo' + index"
                rules="required"
                :label="$t('packages.time_to')"
                :placeholder="$t('packages.time_to_placeholder')"
                :config-params="{
                  noCalendar: true,
                  enableTime: true,
                  dateFormat: 'H:i',
                }"
              />
            </b-col>

            <b-col md="12">
              <text-area
                :id="'traffic-description' + index"
                v-model="traffic.desc"
                :label="$t('packages.traffic_description')"
                :placeholder="$t('packages.traffic_description_placeholder')"
                input-classes="text-med-14 text-font-main"
                :name="'trafficDescription' + index"
                rules="required"
                rows="5"
              />
            </b-col>
          </b-row>
        </validation-observer>
      </tab-content>

      <!-- step 3 tab - سعر الباقة -->
      <tab-content
        :title="$t('packages.package_price')"
        :before-change="validationStepThreeForm"
        class="pb-5"
      >
        <validation-observer ref="stepThreeForm" tag="form" class="mb-5 pb-2">
          <b-col cols="12" class="mb-2 px-0">
            <h5 class="tab-title">
              {{ $t('packages.package_main_price') }}
            </h5>
          </b-col>
          <!-- FIRST REPEATER - START -->

          <div
            v-for="(item, index) in submitData.basicPackagePrice"
            :id="item.id"
            :key="item.id"
            class="mb-2 d-flex align-item-center"
          >
            <b-row class="align-item-center px-0 w-100">
              <b-col md="6" class="d-flex">
                <TextInput
                  :id="'individual-type' + index"
                  v-model="item.individualType"
                  :name="'individualType' + index"
                  rules="required"
                  field-classes="w-100"
                  :label="$t('packages.individual_type')"
                  :placeholder="$t('packages.individual_type_placeholder')"
                />
              </b-col>
              <b-col md="6" class="d-flex">
                <TextInput
                  :id="'individual-price' + index"
                  v-model="item.individaulPrice"
                  :name="$t('packages.person_price')"
                  rules="required|decimal"
                  field-classes="w-100"
                  :label="$t('packages.person_price')"
                  :placeholder="$t('packages.person_price_placeholder')"
                  is-append
                  :append-text="$t('packages.SR')"
                />
              </b-col>
            </b-row>
            <div
              v-if="submitData.basicPackagePrice.length !== 1"
              class="d-flex align-items-center px-4"
            >
              <button
                class="trash-icon"
                @click="removeBasicPackagePrice(index)"
              >
                <trash-icon />
              </button>
            </div>
          </div>
          <!-- FIRST REPEATER - END -->

          <b-col md="12">
            <WameedBtn
              variant="light-secondary"
              append-icon="add-filled-circle-icon"
              classes="text-font-main rounded-12 border-secondary  medium-btn pricing-icon"
              :title="$t('packages.add_new_pricing')"
              @submitAction="addBasicPackagePrice"
            />
          </b-col>

          <b-col md="12">
            <div class="package-addons rounded-8">
              <p class="text-med-18 text-font-main px-4">
                {{ $t('packages.adds_on_package') }}
              </p>
              <p class="text-med-16 text-font-sub px-4">
                {{ $t('packages.adds_on_package_placeholder') }}
              </p>
              <!-- SECOND REPEATER - START -->
              <b-row class="d-inline">
                <div
                  v-for="(item, index) in submitData.extraPackagePrice"
                  :id="item.id"
                  :key="item.id"
                  class="mb-2 d-flex align-item-center"
                >
                  <b-col class="d-flex align-item-center px-0 flex-wrap">
                    <b-col md="6" class="d-flex">
                      <TextInput
                        :id="'addon-name' + index"
                        v-model="item.packageName"
                        :name="'addonName' + index"
                        rules="required"
                        field-classes="w-100 search-form-control"
                        :label="$t('packages.add_on_name')"
                        :placeholder="$t('packages.add_on_name_placeholder')"
                      />
                    </b-col>
                    <b-col md="6" class="d-flex">
                      <TextInput
                        :id="'addon-price' + index"
                        v-model="item.packagePrice"
                        :name="$t('packages.add_on_price')"
                        rules="required|decimal"
                        :label="$t('packages.add_on_price')"
                        :placeholder="$t('packages.add_on_price_placeholder')"
                        is-append
                        :append-text="$t('packages.SR')"
                        field-classes="w-100 search-form-control"
                      />
                    </b-col>
                  </b-col>
                  <div
                    v-if="submitData.extraPackagePrice.length !== 1"
                    class="d-flex align-items-center"
                  >
                    <button
                      class="trash-icon"
                      @click="removeExtraPackagePrice(index)"
                    >
                      <trash-icon />
                    </button>
                  </div>
                </div>

                <b-col md="6" class="">
                  <WameedBtn
                    variant="light-light"
                    append-icon="add-filled-circle-icon"
                    classes="text-font-secondary rounded-12 border-font-secondary2 medium-btn"
                    :title="$t('packages.add_new')"
                    @submitAction="addExtraPackagePrice"
                  />
                </b-col>
              </b-row>
              <!-- SECOND REPEATER - END -->
            </div>
          </b-col>
        </validation-observer>
      </tab-content>

      <template slot="footer" slot-scope="props">
        <div class="wizard-footer-left">
          <wameed-btn
            classes="  text-med-14 text-white rounded-10"
            :title="!props.isLastStep ? $t('common.next') : $t('common.send')"
            type="submit"
            variant="main"
            @submitAction="props.nextTab()"
          />
        </div>
        <div class="wizard-footer-right">
          <wameed-btn
            classes="  text-med-14 text-font-secondary rounded-10 "
            :title="
              props.activeTabIndex > 0
                ? $t('common.previous')
                : $t('common.cancel')
            "
            type="button"
            variant="gray"
            @submitAction="props.prevTab()"
          />
        </div>
      </template>
      <policy-modal
        :visible="showPolicy"
        @close="showPolicy = !showPolicy"
        @submitAction="formSubmitted()"
      />
    </form-wizard>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import WameedBtn from '@/components/wameed/WameedBtn.vue';
import TextInput from '@/components/wameed/WameedTextInput.vue';
import WameedDropdown from '@/components/wameed/WameedDropdown.vue';
import PackageContent from '@/components/pages/packages/PackageContent.vue';
import MultiImagesUpload from '@/components/wameed/WameedMultiImagesUpload.vue';
import FormWizard from '@/components/vue-form-wizard/FormWizard.vue';
import TabContent from '@/components/vue-form-wizard/TabContent.vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import '@/assets/scss/wizard.scss';
// import 'vue-form-wizard/dist/vue-form-wizard.min.css';

import PolicyModal from '@/components/pages/packages/PolicyModal.vue';
import Calender from '@/components/wameed/WameedCalender.vue';
import TextArea from '@/components/wameed/WameedTextArea.vue';
import CustomStep from '@/components/CustomStep.vue';
import PackageMap from '@/components/pages/packages/PackageMap.vue';
import FAQ from '@/components/pages/packages/FAQ.vue';
import DatePicker from '@/components/wameed/WameedDatePicker.vue';

export default {
  components: {
    WameedBtn,
    WameedDropdown,
    TextInput,
    MultiImagesUpload,
    PackageContent,
    ValidationProvider,
    ValidationObserver,
    FormWizard,
    TabContent,
    PolicyModal,
    Calender,
    TextArea,
    CustomStep,
    PackageMap,
    FAQ,
    DatePicker,
  },

  data() {
    return {
      imageName: null,
      address: null,
      dateRange: [],
      dateConfig: {
        start: {
          noCalendar: false,
          enableTime: false,
          dateFormat: 'Y-m-d',
          minDate: new Date().toString(),
          maxDate: null,
        },
        end: {
          noCalendar: false,
          enableTime: false,
          dateFormat: 'Y-m-d',
          minDate: null,
        },
      },
      showPackageContent: false,
      showFAQ: false,
      showPackageMap: false,
      showPolicy: false,

      // DATA THAT WILL BE SUBMITED - START

      submitData: {
        // STEP ONE
        mainImage: null,
        file: [],
        packageName: null,
        journeyType: null,
        packageCity: null,
        adminNumber: null,
        touristCapacity: null,
        journeyStartDate: null,
        journeyEndDate: null,
        packageInterests: [],
        packageDetails: null,
        packageConditions: null,
        packageContents: [],
        location: null,
        FAQ: [],

        // STEP TWO

        repeaterTraffic: [
          {
            heading: 'اليوم ',
            title: '',
            from: null,
            to: null,
            desc: null,
          },
        ],

        // STEP THREE

        basicPackagePrice: [
          { id: 1, individualType: null, individaulPrice: null },
        ],

        extraPackagePrice: [{ id: 1, packageName: null, packagePrice: null }],
      },

      nextBasicPackagePrice: 1,
      nextExtraPackagePrice: 1,

      // DATA THAT WILL BE SUBMITTED - END
    };
  },
  watch: {
    getProfileInfo(val) {
      const [offersCount] = this.getProfileInfo.restrictions.filter(
          (item) => item.name === 'offers_count'
        )
      if (val && offersCount.code === '02_01_01') {
        this.$router.push({name: 'packages'});
      }
    },
  },
  methods: {
    ...mapActions({
      loadAllPackageDropdown: 'loadAllPackageDropdown',
      uploadFiles: 'uploadFiles',
      addPackage: 'addPackage',
    }),

    getNumberOfDates(startDate, endDate, steps = 1) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // getDate Range - START
      const dateArray = [];
      const currentDate = new Date(startDate);

      while (currentDate <= new Date(endDate)) {
        dateArray.push(new Date(currentDate).toDateString());
        // Use UTC date to prevent problems with time zones and DST
        currentDate.setUTCDate(currentDate.getUTCDate() + steps);
      }
      this.dateRange = dateArray;
      // getDate Range - END
      return Array.from({ length: diffDays + 1 }, () => ({
        heading: `${this.$i18n.t('common.the_day')} `,
        title: '',
        from: null,
        to: null,
        desc: null,
      }));
    },
    updatePackageContents(value) {
      this.submitData.packageContents = value;
      this.showPackageContent = false;
    },
    updateFAQ(value) {
      this.submitData.FAQ = value;
      this.showFAQ = false;
    },
    onComplete() {
      this.showPolicy = true;
    },
    formSubmitted() {
      const basicPackagePrice = this.submitData.basicPackagePrice.map(item => {
        const roundedPrice = this.round100(item.individaulPrice);
        return {
          individualType: item.individualType,
          individaulPrice: roundedPrice,
        };
      });
      const extraPackagePrice = this.submitData.extraPackagePrice.map(item => {
        const roundedPrice = this.round100(item.packagePrice);
        return {
          packageName: item.packageName,
          packagePrice: roundedPrice,
        };
      });
      const data = {
        ...this.submitData,
        packageInterests: this.submitData.packageInterests.map(item => item.id),
        packageCity: this.submitData.packageCity.id,
        journeyType: this.submitData.journeyType.id,
        basicPackagePrice,
        extraPackagePrice,
      };
      this.addPackage(data);
    },
    validationStepOneForm() {
      return new Promise((resolve, reject) => {
        this.$refs.stepOneForm.validate().then(success => {
          if (success) {
            this.submitData.repeaterTraffic = this.getNumberOfDates(
              new Date(this.submitData.journeyStartDate),
              new Date(this.submitData.journeyEndDate),
            );
            resolve(true);
          } else {
            reject();
          }
        });
      });
    },
    validationStepTwoForm() {
      return new Promise((resolve, reject) => {
        this.$refs.stepTwoForm.validate().then(success => {
          if (success) {
            resolve(true);
          } else {
            reject();
          }
        });
      });
    },
    validationStepThreeForm() {
      return new Promise((resolve, reject) => {
        this.$refs.stepThreeForm.validate().then(success => {
          if (success) {
            resolve(true);
          } else {
            reject();
          }
        });
      });
    },
    validationStepFormSocial() {
      return new Promise((resolve, reject) => {
        this.$refs.socialRules.validate().then(success => {
          if (success) {
            resolve(true);
          } else {
            reject();
          }
        });
      });
    },
    addBasicPackagePrice() {
      this.submitData.basicPackagePrice.push({
        id: (this.nextBasicPackagePrice += this.nextBasicPackagePrice),
      });
    },
    addExtraPackagePrice() {
      this.submitData.extraPackagePrice.push({
        id: (this.nextExtraPackagePrice += this.nextExtraPackagePrice),
      });
    },
    removeBasicPackagePrice(index) {
      this.submitData.basicPackagePrice.splice(index, 1);
    },
    removeExtraPackagePrice(index) {
      this.submitData.extraPackagePrice.splice(index, 1);
    },
    shortenWord(value) {
      return `${value.split('').splice(0, 15).join('')}...`;
    },
    uploadImageAction(event, type = 'upload') {
      this.$store.commit('loadingStart', null);
      let files = [];
      if (type == 'upload') {
        files = event.currentTarget.files;
      } else {
        files = event;
      }

      if (!files.length) return;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
        // todo img push
        this.uploadFiles(formData).then(response => {
          this.submitData.mainImage = response;
          this.imageName = files[i].name;
          this.$store.commit('loadingFinish');
        });
      }
    },
    updateImages(images) {
      this.submitData.file = images;
    },
    setLocation(value) {
      this.address = value.address;
      this.submitData.location = value.location;
    },
    round100(value) {
      if (!value) return;
      if (value % 1 == 0) return value;
      return Math.round(value * 100) / 100;
    },
    shortenText(text, length) {
      return text.length > length
        ? text.split('').splice(0, length).join('').concat('', ' ...')
        : text;
    },
  },
  mounted() {
    this.loadAllPackageDropdown();
    if(this.getProfileInfo){
      if(this.getProfileInfo.restrictions){
        const [offersCount] = this.getProfileInfo.restrictions.filter(
          (item) => item.name === 'offers_count'
        )
        console.log('inside mounted')
        // once the offers_count is loaded, we check
        // accessing the offers_count whether on not the the provider account has restrictions on
        if(offersCount.code === '02_01_01'){
          this.$router.push({name: 'packages'});
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      getProfileInfo: 'getProfileInfo',
      getAllPackageDropdown: 'getAllPackageDropdown',
    }),
    dateAttributes() {
      const startDate = this.submitData.journeyStartDate;
      const endDate = this.submitData.journeyEndDate
        ? this.submitData.journeyEndDate
        : this.submitData.journeyStartDate;
      return [
        {
          order: 2,
          highlight: {
            start: {
              style: {
                backgroundColor: '#FED029',
                borderRadius: '6px',
              },
            },
            base: {
              style: {
                backgroundColor: '#FED029',
                borderRadius: '6px',
              },
            },
            end: {
              style: {
                backgroundColor: '#FED029',
                borderRadius: '6px',
              },
            },
          },
          dates: {
            start: startDate,
            end: endDate,
          },
        },
      ];
    },
  },
};
</script>

