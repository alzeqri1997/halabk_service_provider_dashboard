<template>
  <div class="wameed-dashboard-page-content mb-5">
    <section class="wameed-dashboard-page-content_body">
      <b-row class="no-gutters px-2">
        <b-col lg="3" md="4" class="px-0">
          <b-card
            no-body
            class="
              cursor-pointer
              wameed-card
              align-items-center
              justify-content-center
              py-5
            "
            @click="companyDetails"
          >
            <b-avatar variant="light-main" class="my-4" rounded size="60">
              <company-icon></company-icon>
            </b-avatar>
            <h4 class="h-panel__title text-reg-20 my-4">
              {{ $t('settings.company_data') }}
            </h4>
          </b-card>
        </b-col>
        <b-col lg="3" md="4" class="px-0">
          <b-card
            no-body
            class="
              cursor-pointer
              wameed-card
              align-items-center
              justify-content-center
              py-5
            "
            @click="packageDetails"
          >
            <b-avatar variant="light-main" class="my-4" rounded size="60">
              <packages-icon></packages-icon>
            </b-avatar>
            <h4 class="h-panel__title text-reg-20 my-4">
              {{ $t('settings.package_details') }}
            </h4>
          </b-card>
        </b-col>
        <b-col lg="3" md="4" class="px-0 d-none">
          <b-card
            no-body
            class="
              cursor-pointer
              wameed-card
              align-items-center
              justify-content-center
              py-5
            "
            @click="jobs"
          >
            <b-avatar variant="light-main" class="my-4" rounded size="60">
              <users-icon></users-icon>
            </b-avatar>
            <h4 class="h-panel__title text-reg-20 my-4">
              {{ $t('settings.users') }}
            </h4>
          </b-card>
        </b-col>
      </b-row>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },

  methods: {
    companyDetails() {
      this.$router.push({
        name: 'company-details',
        params: { lang: this.$i18n.locale },
      });
    },
    jobs() {
      this.$router.push({ name: 'jobs', params: { lang: this.$i18n.locale } });
    },
    packageDetails() {
      this.$router.push({
        name: 'subscription',
      });
    },
  },
};
</script>
 
