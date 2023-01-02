<template>
  <b-card
    v-if="getBusinessProfileInfo"
    no-body
    class="cursor-pointer wameed-card"
  >
    <b-card-header class="align-items-start tab-title">
      <h5 class="text-reg-18 text-font-main">
        {{ $t('settings.company_data') }}
      </h5>
    </b-card-header>
    <wameed-form refs="" @submitAction="submitBusinessProfileInfo">
      <template slot="form-content" slot-scope="{ invalid }">
        <b-card-body
          class="position-relative py-5 justify-content-between px-5"
        >
          <!-- form -->
          <div class="d-flex flex-wrap py-4">
            <b-col cols="12" md="12">
              <multi-images-upload
                :max="1"
                clear-all=""
                :label="$t('personal_information.company_logo')"
                id="upload-logo"
                name="uploadLogo"
                rules="required"
                @changed="setLogoImage"
                :Imgs="currentImg"
              />
            </b-col>
            <b-col cols="12" md="6">
              <text-input
                id="service-provider-name"
                v-model="serviceProviderName"
                :label="$t('personal_information.service_provider_name')"
                inputClasses="text-med-14 text-font-main"
                name="serviceProviderName"
                rules="required"
                placeholder="----------------"
              />
            </b-col>
            <b-col cols="12" md="6">
              <wameed-dropdown
                disabled
                v-if="getAllAccountTypes"
                :label="$t('personal_information.service_provider_type')"
                :subLable="$t('personal_information.can_not_be_changed')"
                classes="  text-med-14 w-100"
                valueClasses="  text-med-14  text-font-secondary"
                title="title"
                v-model="serviceProviderType"
                variant="disable"
                :items="getAllAccountTypes"
                text="title"
                name="serviceProviderType"
                id="service-provider-type"
              />
            </b-col>
            <b-col cols="12" md="6">
              <text-input
                id="email"
                v-model="email"
                :label="$t('personal_information.email')"
                inputClasses="text-med-14 text-font-main"
                name="email"
                rules="required|email"
                placeholder="----------------"
              />
            </b-col>

            <b-col cols="12" md="6">
              <wameed-dropdown
                v-if="getAllSaudiCities"
                :label="$t('personal_information.city')"
                classes="  text-med-14 w-100"
                valueClasses="  text-med-14  text-font-secondary"
                title="title"
                v-model="city"
                variant="disable"
                :items="getAllSaudiCities"
                text="title"
                name="city"
                id="city"
                rules="required"
              />
            </b-col>
            <b-col cols="12" md="12">
              <text-area
                id="personal-information"
                v-model="personalInformation"
                :label="$t('personal_information.personal_information')"
                inputClasses="text-med-14 text-font-main"
                name="personalInformation"
                rules="required"
                placeholder="----------------"
                rows="5"
              />
            </b-col>
            <b-col cols="12" md="12">
              <wameed-dropdown
                v-if="getAllInterests"
                :label="$t('packages.interests')"
                classes="  text-med-14 w-100"
                valueClasses="  text-med-14  text-font-secondary"
                title="title"
                v-model="interests"
                variant="disable"
                :items="getAllInterests"
                :multiple="true"
                text="title"
                name="interests"
                id="interests"
                rules="required"
              />
            </b-col>
          </div>
        </b-card-body>
        <b-card-footer class="px-4 py-3">
          <div class="d-flex flex-wrap justify-content-between">
            <div class="px-4 py-3">
              <wameed-btn
                classes="  text-med-14 text-white rounded-10"
                :title="$t('common.save_edited')"
                :disabled="invalid || isImgUploaded()"
                type="submit"
                variant="main"
              />
            </div>
            <div class="px-4 py-3">
              <wameed-btn
                classes="  text-med-14 text-font-secondary rounded-10 "
                :title="$t('common.cancel')"
                type="button"
                variant="gray"
                @submitAction="resetChanges"
              />
            </div>
          </div>
        </b-card-footer>
      </template>
    </wameed-form>
  </b-card>
</template>

<script>
import WameedForm from '@/components/wameed/WameedForm.vue';

import TextInput from '@/components/wameed/WameedTextInput.vue';
import WameedBtn from '@/components/wameed/WameedBtn.vue';
import WameedDropdown from '@/components/wameed/WameedDropdown.vue';
import WameedAsideModal from '@/components/wameed/WameedAsideModal.vue';
import WameedSwitch from '@/components/wameed/WameedSwitch.vue';
import { mapActions, mapGetters } from 'vuex';

import TextEditor from '@/components/wameed/WameedTextEditor.vue';
import TextArea from '@/components/wameed/WameedTextArea.vue';
import MultiImagesUpload from '@/components/wameed/WameedMultiImagesUpload.vue';

export default {
  components: {
    TextInput,
    WameedBtn,
    WameedDropdown,
    WameedAsideModal,
    WameedSwitch,
    WameedForm,
    TextEditor,
    TextArea,
    MultiImagesUpload,
  },
  data() {
    return {
      currentImg: [],
      uploadLogo: [],
      serviceProviderName: null,
      serviceProviderType: null,
      email: null,
      city: null,
      personalInformation: null,
      interests: null,
    };
  },
  computed: {
    ...mapGetters({
      getBusinessProfileInfo: 'getBusinessProfileInfo',
      getAllSaudiCities: 'getAllSaudiCities',
      getAllAccountTypes: 'getAllAccountTypes',
      getAllInterests: 'getAllInterests',
      getProfileInfo: 'getProfileInfo',
    }),
  },
  methods: {
    ...mapActions({
      loadProfileInfo: 'loadProfileInfo',
      updateBusinessProfileInfo: 'updateBusinessProfileInfo',
    }),
    isImgUploaded() {
      if (this.currentImg.length === 0) {
        return true;
      }
      return false;
    },
    setLogoImage(file) {
      this.currentImg = file;
    },
    resetChanges() {
      if (this.getBusinessProfileInfo) {
        this.currentImg = [this.getBusinessProfileInfo.provider.image];
        this.serviceProviderName = this.getBusinessProfileInfo.provider.name;
        this.serviceProviderType = this.getBusinessProfileInfo.provider.user_type;
        this.email = this.getBusinessProfileInfo.provider.email;
        this.city = this.getBusinessProfileInfo.provider.country;
        this.personalInformation = this.getBusinessProfileInfo.provider.personal_info;
        this.interests = this.getBusinessProfileInfo.provider.interests;
      }
    },
    submitBusinessProfileInfo() {
      const data = {
        image: this.currentImg[0],
        name: this.serviceProviderName,
        interests: this.interests.map(item => item.id),
        info: this.personalInformation,
        city: this.city.city_code,
        email: this.email,
      };
      this.updateBusinessProfileInfo(data).then(() => {
        this.$store.dispatch('loadProfileInfo');
      });
    },
  },
  updated() {
    if (this.getBusinessProfileInfo) {
      this.currentImg = [this.getBusinessProfileInfo.provider.image];
      this.serviceProviderName = this.getBusinessProfileInfo.provider.name;
      this.serviceProviderType = this.getBusinessProfileInfo.provider.user_type;
      this.email = this.getBusinessProfileInfo.provider.email;
      this.city = this.getBusinessProfileInfo.provider.country;
      this.personalInformation = this.getBusinessProfileInfo.provider.personal_info;
      this.interests = this.getBusinessProfileInfo.provider.interests;
    }
  },
};
</script>
 
