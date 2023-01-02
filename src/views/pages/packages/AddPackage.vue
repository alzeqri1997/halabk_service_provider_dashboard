<template>
  <div class="wameed-dashboard-page-content">
    <page-header
      :title="$t('packages.add_package')"
      :subTitle="$t('packages.add_package_subtitle')"
    ></page-header>

    <FormWizard />
  </div>
</template>

<script>
import PageHeader from '@/components/wameed/WameedPageHeader.vue';
import FormWizard from './form-wizard/FormWizardNumber.vue';
export default {
  components: {
    FormWizard,
    PageHeader
  },
};
</script>