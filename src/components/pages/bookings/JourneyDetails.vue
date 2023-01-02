<template>
  <div class="journey-details bg-white rounded-14">
    <div class="journey-details__heading">
      <h1 class="text-font-main text-med-14">
        {{ $t('packages.details_title') }}
      </h1>

      <small class="text-font-sub">
        {{ $t('packages.date') }}:
        <span class="text-font-main">{{
          moment(time).format('YYY/MM/DD')
        }}</span>
      </small>
    </div>
    <div class="d-block d-sm-flex flex-wrap journey-details__body">
      <div class="mb-3 mb-sm-0">
        <img
          :src="img"
          alt=""
        >
      </div>

      <b-col xs="12">
        <p class="text-font-main text-med-16">
          {{ title }}
        </p>
        <p class="text-reg-14">
          <location-fill-icon /> {{ country }}, {{ city }}
        </p>
        <div class="d-flex justify-content-between flex-wrap">
          <p class="text-reg-14 text-sub-color mb-3 mb-sm-0">
            {{ $t('packages.journey_status') }} :
            <span :class="'text-' + packageStatus[1][statusCode]">{{
              $t('common.' + packageStatus[0][statusCode])
            }}</span>
          </p>
          <div>
            <router-link
              class="text-font-main change-icon-position"
              :to="{
                name: 'package-details',
                params: { lang: $i18n.locale, id: id },
              }"
            >
              {{ $t('common.view_all') }} <arrow-prev-icon />
            </router-link>
          </div>
        </div>
      </b-col>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      default: '12/12/2021',
    },
    title: {
      type: String,
      default: 'لوريم ايبسوم دولار سيت أميت ,كونسي كتيتور أدايبايايت',
    },
    country: {
      type: String,
      default: 'شرم الشيخ , مصر',
    },
    city: {
      type: String,
      default: 'شرم الشيخ , مصر',
    },
    statusCode: {
      type: Number,
      default: null,
    },
    img: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1622512272112-adeced423785?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    },
  },
  data() {
    return {
      packageStatus: [
        {
          0: 'soon',
          1: 'active',
          2: 'expired',
          3:'not_available'
        },
        {
          0: 'warning',
          1: 'success',
          2: 'danger',
          3: 'danger',
        },
      ],
    };
  },
};
</script>
