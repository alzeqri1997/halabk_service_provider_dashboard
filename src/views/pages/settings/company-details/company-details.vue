<template>
  <div class="wameed-dashboard-page-content">
    <page-header
      :title="$t('personal_information.title')"
      :subTitle="$t('personal_information.subTitle')"
    />
    <section class="wameed-dashboard-page-content_body">
      <b-row class="px-2">
        <b-col lg="12" md="12" class="px-0">
          <b-card
            no-body
            class="cursor-pointer wameed-card py-5 px-5"
            @click="changePassword = true"
          >
            <div
              class="
                d-flex
                py-1
                px-1
                align-items-center
                justify-content-between
              "
            >
              <h4 class="h-panel__title text-reg-20">
                {{ $t('common.change_password') }}
              </h4>
              <arrow-down-icon />
            </div>
          </b-card>
          <change-password
            :visible="changePassword"
            @close="changePassword = false"
          />
        </b-col>
        <b-col lg="12" md="12" class="px-0">
          <details-form />
        </b-col>
        <b-col lg="12" md="12" class="px-0">
          <social-media-form v-if="getBusinessProfileInfo" />
        </b-col>
      </b-row>
    </section>
  </div>
</template>

<script>
import WameedForm from '@/components/wameed/WameedForm.vue';

import WameedBtn from '@/components/wameed/WameedBtn.vue';
import WameedDropdown from '@/components/wameed/WameedDropdown.vue';
import WameedAsideModal from '@/components/wameed/WameedAsideModal.vue';
import WameedSwitch from '@/components/wameed/WameedSwitch.vue';
import { mapActions, mapGetters } from 'vuex';

import TextEditor from '@/components/wameed/WameedTextEditor.vue';
import DetailsForm from '@/components/pages/setting/company-details/DetailsForm.vue';
import SocialMediaForm from '@/components/pages/setting/company-details/SocialMediaForm.vue';
import PageHeader from '@/components/wameed/WameedPageHeader.vue';
import ChangePassword from '@/components/pages/setting/company-details/ChangePassword.vue';

export default {
  components: {
    WameedBtn,
    WameedDropdown,
    WameedAsideModal,
    WameedSwitch,
    WameedForm,
    TextEditor,
    DetailsForm,
    SocialMediaForm,
    PageHeader,
    ChangePassword,
  },
  data() {
    return {
      changePassword: false,
    };
  },
  computed: {
    ...mapGetters({
      getBusinessProfileInfo: 'getBusinessProfileInfo',
    }),
  },

  methods: {
    ...mapActions({
      loadAllSaudiCities: 'loadAllSaudiCities',
      loadAllAccountTypes: 'loadAllAccountTypes',
      loadBusinessProfileInfo: 'loadBusinessProfileInfo',
      loadAllInterests: 'loadAllInterests',
      updateBusinessProfileInfo: 'updateBusinessProfileInfo',
    }),
  },
  created() {
    this.loadAllSaudiCities();
    this.loadAllAccountTypes();
    this.loadBusinessProfileInfo();
    this.loadAllInterests();
  },
};
</script>
