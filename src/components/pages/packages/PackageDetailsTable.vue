<template>
  <!-- <b-table bordered borderless stacked :items="items"></b-table> -->
  <div class="package-details-table bg-white rounded-14">
    <h1 class="package-details-table__title text-font-main text-med-14">
      {{ $t('packages.details_title') }}
    </h1>
    <b-row class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.package_no') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value">
        <p class="mb-0">
          {{ packageDetails.id }}
        </p>
      </b-col>
    </b-row>

    <b-row class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.status') }}
        </p>
      </b-col>
      <div class="package-details-value">
        <b-badge
          pill
          :variant="'light-' + status[1][packageDetails.status]"
          :class="'border-' + status[1][packageDetails.status]"
          class="text-reg-12 py-0 px-3"
          >{{ $t('common.' + status[0][packageDetails.status]) }}</b-badge
        >
      </div>
    </b-row>

    <b-row class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.package_name') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value">
        <p class="mb-0">
          {{ packageDetails.title }}
        </p>
      </b-col>
    </b-row>

    <b-row class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.journey_type') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value">
        <p class="mb-0">
          {{ packageDetails.category }}
        </p>
      </b-col>
    </b-row>

    <b-row class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.package_city') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value">
        <p class="mb-0">
          {{ packageDetails.city }}
        </p>
      </b-col>
    </b-row>

    <b-row class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.map_address') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value">
        <a class="link text-nowrap" @click="showMapModal = true">
          {{ $t('packages.show_address') }}</a
        >
        <map-modal
          :visible="showMapModal"
          :location="packageDetails.location"
          @close="showMapModal = false"
        />
      </b-col>
    </b-row>

    <b-row class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.supervisors_count') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value">
        <p class="mb-0">
          {{ packageDetails.supervisors }} {{ $t('packages.supervisors') }}
        </p>
      </b-col>
    </b-row>

    <b-row class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.individual_count') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value">
        <p class="mb-0">
          {{ packageDetails.people_count }} {{ $t('packages.tourist') }}
        </p>
      </b-col>
    </b-row>

    <b-row class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.registared') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value">
        <p class="mb-0">
          {{ packageDetails.people_count - packageDetails.available_people }}
          {{ $t('packages.tourist') }}
        </p>
      </b-col>
    </b-row>

    <b-row class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.journey_start_date') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value">
        <p class="mb-0">
          {{ moment(packageDetails.start_date).format('YYYY/MM/DD') }}
        </p>
      </b-col>
    </b-row>

    <b-row class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.journey_end_date') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value">
        <p class="mb-0">
          {{ moment(packageDetails.end_date).format('YYYY/MM/DD') }}
        </p>
      </b-col>
    </b-row>

    <b-row class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.interests') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value d-flex">
        <b-badge
          v-for="interest in packageDetails.interests"
          :key="interest.id"
          variant="light-icon"
          class="bg-icon text-white text-reg-12 rounded-8"
        >
          {{ interest.title }}
        </b-badge>
      </b-col>
    </b-row>
    <b-row
      v-for="counter in packageDetails.counters"
      :key="counter.id"
      class="package-details-table__body"
    >
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.individual_type') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value">
        <span> {{ counter.title }} = </span>
        <span class="text-success">{{ counter.price }} </span>
        <span class="text-success">{{ $t('packages.SR') }} </span>
        <span>{{ $t('packages.for_single_person') }}</span>
      </b-col>
    </b-row>
    <b-row
      v-if="packageDetails.service_packages"
      class="package-details-table__body"
    >
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.the_adds_on') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value d-flex">
        <b-badge
          v-for="interest in packageDetails.service_packages"
          :key="interest.id"
          variant="light-icon"
          class="bg-icon text-white text-reg-12 rounded-8"
        >
          {{
            interest.title +
            ' - ' +
            interest.additional_price +
            ' ' +
            $t('packages.SR')
          }}
        </b-badge>
      </b-col>
    </b-row>
    <b-row class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('settings.package_details') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value">
        <a class="link text-nowrap" @click="showPackageContentModal = true">
          {{ $t('common.view_content') }}</a
        >
        <package-content-modal
          :content="packageDetails.detail"
          :visible="showPackageContentModal"
          @close="showPackageContentModal = !showPackageContentModal"
        />
      </b-col>
    </b-row>
    <b-row class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.terms_and_condations') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value">
        <a class="link text-nowrap" @click="showPackagePolicyModal = true">{{
          $t('common.show_details')
        }}</a>
        <package-policy-modal
          :content="packageDetails.terms_and_conditions"
          :visible="showPackagePolicyModal"
          @close="showPackagePolicyModal = !showPackagePolicyModal"
        />
      </b-col>
    </b-row>

    <b-row v-if="packageDetails.content" class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.package_content') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value">
        <a class="link text-nowrap" @click="showAddonsModal = true">{{
          $t('common.view_content')
        }}</a>
        <addons-modal
          :content="packageDetails.content"
          :visible="showAddonsModal"
          @close="showAddonsModal = !showAddonsModal"
        />
      </b-col>
    </b-row>

    <b-row class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.journey_days') }}
        </p>
      </b-col>
      <b-col
        v-if="packageDetails.timeline"
        sm="6"
        class="package-details-value date-picker"
      >
        <span>{{ packageDetails.timeline.length }}</span>
        <span> {{ $t('packages.days') }} </span>
        <a class="link text-nowrap" @click="showTimelineModal = true">{{
          $t('common.show_details')
        }}</a>
        <package-timeline
          :content="packageDetails.timeline"
          :visible="showTimelineModal"
          @close="showTimelineModal = !showTimelineModal"
        />
      </b-col>
    </b-row>

    <b-row v-if="packageDetails.faqs" class="package-details-table__body">
      <b-col sm="6" class="package-details-name">
        <p class="mb-0">
          {{ $t('packages.FAQ') }}
        </p>
      </b-col>
      <b-col sm="6" class="package-details-value">
        <span>{{ packageDetails.faqs.length }}</span>
        <span> {{ $t('common.questions') }} </span>
        <a class="link text-nowrap" @click="showFAQModal = true">{{
          $t('common.show_details')
        }}</a>
        <faq-modal
          :content="packageDetails.faqs"
          :visible="showFAQModal"
          @close="showFAQModal = !showFAQModal"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PackageContentModal from '@/components/pages/packages/PackageContentModal.vue';
import PackageTimeline from '@/components/pages/packages/PackageTimeline.vue';
import AddonsModal from '@/components/pages/packages/AddonsModal.vue';
import FaqModal from '@/components/pages/packages/FAQModal.vue';
import PackagePolicyModal from '@/components/pages/packages/PackagePolicyModal.vue';
import MapModal from '@/components/pages/packages/mapModal.vue';

export default {
  components: {
    PackageContentModal,
    PackageTimeline,
    AddonsModal,
    FaqModal,
    PackagePolicyModal,
    MapModal,
  },
  props: {
    packageDetails: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      date: ['2022-04-22', '2022-04-23'],
      showMapModal: false,
      showPackageConditionsModal: false,
      showPackageContentModal: false,
      showAddonsModal: false,
      showFAQModal: false,
      showPackagePolicyModal: false,
      showTimelineModal: false,
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
    dateAttributes() {
      const startDate = this.packageDetails.start_date;
      const endDate = this.packageDetails.end_date;
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
