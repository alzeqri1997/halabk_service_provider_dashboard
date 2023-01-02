<template>
  <router-link
    :to="link"
    :class="
      'service-card '.concat(isFavorite ? 'isFavorite ' : '') + this.cssClass
    "
  >
    <div class="service-card-header">
      <div class="overlay"></div>

      <div class="header-info">
        <div class="offers">
          <!--          <slot/>-->

          <div
            class="service-card-offer-tag secondary-color text-reg-14"
            v-if="closePercent >= 50"
          >
            {{ $t('common.close_soon') }}
            {{ closePercent }}%
          </div>
          <div
            class="service-card-offer-tag main-color"
            v-if="service.offer != null"
          >
            {{ $t('common.discount') }}
            {{ service.offer.discount_percent }}%
          </div>
        </div>

        <!-- <div class="favorite">
          <heart-empty-icon/>
        </div> -->
      </div>

      <img :src="service.image" alt="" />
    </div>
    <div class="service-card-footer">
      <div class="provider text-reg-14">
        <h3 class="title text-reg-14">{{ service.provider }}</h3>
        <div class="rate text-reg-12">
          <star-fill-icon />
          <div>{{ service.rate }}</div>
        </div>
      </div>
      <p class="desc text-med-18">
        {{ service.excerpt }}
      </p>

      <div class="info">
        <!--todo:: fix the price-->
        <div class="price-info">
          <div
            class="price text-semi-20"
            :class="service.offer == null ? ' mb-2' : ''"
          >
            {{ servicePrice }} {{ $t('common.sr_currency') }}
            <div class="price--old text-reg-16" v-if="service.offer != null">
              {{ service.price }} {{ $t('common.sr_currency') }}
            </div>
          </div>
        </div>

        <div class="info-end text-reg-14">
          <p style="margin-bottom: 0">{{ $t('service.person_price') }}</p>
          <div class="location-info">
            <location-fill-icon />
            <div>{{ service.city }} , {{ service.country }}</div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'ServiceCard',
  props: {
    service: {
      type: Object,
      default: () => ({
        id: 2,
        title: 'اسم الخدمة',
        excerpt: 'وصف صغير عن الخدمة',
        slug: 'اسم-الخدمة',
        city: 'صنعاء',
        country: 'اليمن',
        provider: 'الاسم العربي',
        max_people: '7',
        rate: '4.7',
        available_people: 1,
        price: 24,
        offer: {
          discount_percent: 16,
        },
        image:
          'https://images.unsplash.com/photo-1508050919630-b135583b29ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
      }),
    },
    image: String,
    cssClass: String,
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    link() {
      return {
        name: 'package-details',
        params: {
          id: this.service.id,
        },
      };
    },
    servicePrice() {
      if (this.service.offer != null) {
        return (
          this.service.price
          - (
            (this.service.price * this.service.offer.discount_percent)
            / 100
          ).toFixed(2)
        );
      }
      return this.service.price;
    },
    closePercent() {
      return (
        ((this.service.max_people - this.service.available_people)
          / this.service.max_people)
        * 100
      ).toFixed(1);
    },
  },
};
</script>
