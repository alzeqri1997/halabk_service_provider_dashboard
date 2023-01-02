<template>
  <div>
    <signup-header />
    <div class="container">
      <div v-if="getProfileInfo" class="user-info bg-white rounded-14 mt-5">
        <h1 class="user-info__heading text-danger text-med-14">
          {{ $t('common.problem_description') }}
        </h1>
        <div class="user-info__body">
          <p class="text-reg-14 text-font-secondary mb-0">
            {{ getProfileInfo.reject_reason }}
          </p>
        </div>
      </div>
      <wameed-form refs="" @submitAction="submitAccount">
        <template slot="form-content" slot-scope="{ invalid }">
          <b-card-body
            class="
              position-relative
              py-5
              justify-content-between
              px-0
              bg-white
              rounded-14
            "
          >
            <!-- form -->
            <div class="d-flex flex-wrap py-4">
              <b-col cols="12" md="12">
                <validation-provider
                  name="uploadLogo"
                  vid="uploadLogo"
                  rules="required"
                >
                  <multi-images-upload
                    id="upload-logo"
                    :max="1"
                    clear-all=""
                    :label="$t('personal_information.company_logo')"
                    name="uploadLogo"
                    rules="required"
                    @changed="setLogoImage"
                    required
                  />
                  <input
                    type="text"
                    hidden
                    class="d-none"
                    v-model="uploadLogo"
                  />
                </validation-provider>
              </b-col>
              <b-col cols="12" md="6">
                <text-input
                  id="service-provider-name"
                  v-model="serviceProviderName"
                  :label="$t('personal_information.service_provider_name')"
                  input-classes="text-med-14 text-font-main"
                  name="serviceProviderName"
                  rules="required"
                  :placeholder="
                    $t('personal_information.service_provider_name_placeholder')
                  "
                />
              </b-col>
              <b-col cols="12" md="6">
                <wameed-dropdown
                  id="service-provider-type"
                  v-model="serviceProviderType"
                  :label="$t('personal_information.service_provider_type')"
                  :placeholder="
                    $t('personal_information.service_provider_type_placeholder')
                  "
                  classes="  text-med-14 w-100"
                  value-classes="  text-med-14  text-font-secondary"
                  title="title"
                  variant="disable"
                  :items="getAllAccountTypes"
                  text="title"
                  name="serviceProviderType"
                />
              </b-col>
              <b-col cols="12" md="6">
                <text-input
                  readonly
                  id="email"
                  :label="$t('personal_information.email')"
                  input-classes="text-med-14 text-font-main"
                  name="email"
                  :placeholder="$t('personal_information.email_placeholder')"
                  fieldClasses="opacity-30"
                />
              </b-col>
              <b-col cols="12" md="6">
                <wameed-dropdown
                  v-if="getAllSaudiCities"
                  id="city"
                  v-model="city"
                  :label="$t('personal_information.city')"
                  :placeholder="$t('personal_information.city_placeholder')"
                  classes="  text-med-14 w-100"
                  value-classes="  text-med-14  text-font-secondary"
                  title="title"
                  variant="disable"
                  :items="getAllSaudiCities"
                  text="title"
                  name="city"
                  identifier="country_code"
                  rules="required"
                />
              </b-col>
              <b-col cols="12" md="12">
                <text-area
                  id="personal-information"
                  v-model="personalInformation"
                  :label="$t('personal_information.personal_information')"
                  input-classes="text-med-14 text-font-main"
                  name="personalInformation"
                  rules="required"
                  :placeholder="
                    $t('personal_information.personal_information_placeholder')
                  "
                  rows="5"
                />
              </b-col>
              <b-col cols="12" md="12">
                <validation-provider
                  name="uploadFile"
                  vid="uploadFile"
                  rules="required"
                >
                  <multi-images-upload
                    id="legal-files"
                    :max="4"
                    clear-all=""
                    :label="$t('personal_information.legal_files')"
                    name="legalFiles"
                    rules="required"
                    file-type="file"
                    @changed="setCompanyFiles"
                    fileType="file"
                    required
                  />
                  <input
                    type="text"
                    hidden
                    class="d-none"
                    v-model="uploadFilesInput"
                  />
                </validation-provider>
                <span class="text-reg-14 text-icon">{{
                  $t('personal_information.enter_legal_files')
                }}</span>
              </b-col>
            </div>
            <div class="px-4 py-3">
              <wameed-btn
                classes="text-med-14 text-white rounded-10"
                :title="$t('common.resend_again')"
                :disabled="invalid"
                block
                type="submit"
                variant="main"
              />
            </div>
          </b-card-body>
        </template>
      </wameed-form>
    </div>
    <div class="d-flex align-items-center justify-content-center flex-0 py-5">
      <span class="text-reg-14 text-font-secondary my-5"
        >{{ $t('common.all_rights_reserved') }}
        <a href="/" class="text-reg-14 text-main">{{
          $t('common.halabk')
        }}</a></span
      >
    </div>
  </div>
</template>

<script>
import SignupHeader from '@/components/SignupHeader.vue';
import WameedDropdown from '@/components/wameed/WameedDropdown.vue';
import WameedBtn from '@/components/wameed/WameedBtn.vue';
import WameedForm from '@/components/wameed/WameedForm.vue';
import TextInput from '@/components/wameed/WameedTextInput.vue';
import MultiImagesUpload from '@/components/wameed/WameedMultiImagesUpload.vue';
import TextArea from '@/components/wameed/WameedTextArea.vue';
import { mapActions, mapGetters } from 'vuex';
import { ValidationProvider } from 'vee-validate';

export default {
  components: {
    SignupHeader,
    WameedDropdown,
    WameedBtn,
    WameedForm,
    TextInput,
    MultiImagesUpload,
    TextArea,
    ValidationProvider,
  },

  data: () => ({
    showPassword: false,
    showConfirmPassword: false,
    password: null,
    confirmPassword: null,
    uploadLogo: null,
    uploadFiles: null,
    uploadFilesInput: null,
    serviceProviderName: null,
    serviceProviderType: null,
    email: null,
    city: null,
    personalInformation: null,
    types: [
      { title: 'Full Time', id: 1 },
      { title: 'Part Time', id: 2 },
    ],
    experiences: [
      { title: 'experience one', id: 1 },
      { title: 'experience tow', id: 2 },
    ],
  }),
  computed: {
    ...mapGetters({
      getAllSaudiCities: 'getAllSaudiCities',
      getAllAccountTypes: 'getAllAccountTypes',
      getProfileInfo: 'getProfileInfo',
    }),
  },
  created() {
    this.loadAllSaudiCities();
    this.loadAllAccountTypes();
    this.loadProfileInfo();
  },
  methods: {
    ...mapActions({
      loadAllSaudiCities: 'loadAllSaudiCities',
      loadAllAccountTypes: 'loadAllAccountTypes',
      submitResendInformation: 'submitResendInformation',
      loadProfileInfo: 'loadProfileInfo',
    }),
    setLogoImage(file) {
      const [logo] = file[0] ? file : [];
      this.uploadLogo = logo;
    },
    setCompanyFiles(file) {
      this.uploadFiles = file;
      this.uploadFilesInput = this.uploadFiles.length === 0 ? null : 'uploaded';
    },
    submitAccount() {
      this.submitResendInformation({
        id: this.getProfileInfo.id,
        image: this.uploadLogo,
        name: this.serviceProviderName,
        email: this.getProfileInfo.email,
        city: this.city.city_code,
        type: this.serviceProviderType.id,
        personal_info: this.personalInformation,
        files: this.uploadFiles,
      }).then(() => {
        this.$router.push({ name: 'dashboard' });
      });
    },
  },
};
</script>
