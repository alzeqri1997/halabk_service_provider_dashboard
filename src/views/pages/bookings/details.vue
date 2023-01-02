<template>
  <div v-if="getBookingDetails" class="wameed-dashboard-page-content mb-5">
    <div class="mb-4">
      <page-header
        :title="$t('bookings.details_title')"
        :sub-title="$t('bookings.details_subtitle')"
      />
    </div>
    <section class="wameed-dashboard-page-content_body">
      <div class="mx-4">
        <b-row>
          <b-col lg="7" xl="6" class="my-3">
            <journey-details
              v-if="getBookingDetails.service"
              :id="getBookingDetails.service.service_id"
              :time="getBookingDetails.service.created_at"
              :title="getBookingDetails.service.title"
              :img="getBookingDetails.service.image"
              :country="getBookingDetails.service.country"
              :city="getBookingDetails.service.city"
              :status-code="getBookingDetails.service.status"
            />
            <div
              v-if="getBookingDetails"
              class="package-details-table bg-white overflow-hidden rounded-14"
            >
              <h1
                class="package-details-table__title text-font-main text-med-14"
              >
                {{ $t('bookings.details_title') }}
              </h1>

              <b-row class="package-details-table__body">
                <b-col sm="6" class="mb-5 mb-sm-0 package-details-name">
                  <p class="mb-0">
                    {{ $t('bookings.order_number') }}
                  </p>
                </b-col>
                <b-col sm="6" class="package-details-value">
                  <p class="mb-0">
                    {{ '#' + getBookingDetails.id }}
                  </p>
                </b-col>
              </b-row>

              <b-row class="package-details-table__body">
                <b-col sm="6" class="mb-5 mb-sm-0 package-details-name">
                  <p class="mb-0">
                    {{ $t('bookings.booking_date') }}
                  </p>
                </b-col>
                <b-col sm="6" class="package-details-value">
                  <p class="mb-0">
                    {{
                      moment(getBookingDetails.created_at).format('YYYY/MM/DD')
                    }}
                  </p>
                </b-col>
              </b-row>

              <b-row
                v-for="service in getBookingDetails.service_counters"
                :key="service.id"
                class="package-details-table__body"
              >
                <b-col sm="6" class="mb-5 mb-sm-0 package-details-name">
                  <p class="mb-0">
                    {{ service.title }}
                  </p>
                </b-col>
                <b-col sm="6" class="package-details-value">
                  <p v-if="service.value == 1" class="mb-0">
                    {{ $t('common.one_person') }}
                  </p>
                  <p
                    v-if="service.value >= 2 && service.value < 11"
                    class="mb-0"
                  >
                    {{ service.value + ' ' + $t('common.people') }}
                  </p>
                  <p v-if="service.value >= 11" class="mb-0">
                    {{ service.value + ' ' + $t('common.person') }}
                  </p>
                </b-col>
              </b-row>

              <b-row class="package-details-table__body">
                <b-col sm="6" class="mb-5 mb-sm-0 package-details-name">
                  <p class="mb-0">
                    {{ $t('bookings.add-ons') }}
                  </p>
                </b-col>
                <b-col sm="6" class="package-details-value">
                  <p v-if="getBookingDetails.service_packages" class="mb-0">
                    {{ getBookingDetails.service_packages.title }}
                  </p>
                </b-col>
              </b-row>

              <b-row class="package-details-table__body">
                <b-col sm="6" class="mb-5 mb-sm-0 package-details-name">
                  <p class="mb-0">
                    {{ $t('bookings.full_name') }}
                  </p>
                </b-col>
                <b-col sm="6" class="package-details-value">
                  <p class="mb-0">
                    {{ getBookingDetails.name }}
                  </p>
                </b-col>
              </b-row>
              <b-row class="package-details-table__body">
                <b-col sm="6" class="mb-5 mb-sm-0 package-details-name">
                  <p class="mb-0">
                    {{ $t('bookings.phone_number') }}
                  </p>
                </b-col>
                <b-col sm="6" class="package-details-value">
                  <p class="mb-0">
                    {{ getBookingDetails.phone }}
                  </p>
                </b-col>
              </b-row>

              <b-row class="package-details-table__body">
                <b-col sm="6" class="mb-5 mb-sm-0 package-details-name">
                  <p class="mb-0">
                    {{ $t('bookings.phone_number2') }}
                  </p>
                </b-col>
                <b-col sm="6" class="package-details-value">
                  <p class="mb-0">
                    {{
                      getBookingDetails.second_phone
                        ? getBookingDetails.second_phone
                        : '-------------------'
                    }}
                  </p>
                </b-col>
              </b-row>

              <b-row class="package-details-table__body">
                <b-col sm="6" class="mb-5 mb-sm-0 package-details-name">
                  <p class="mb-0">
                    {{ $t('bookings.email') }}
                  </p>
                </b-col>
                <b-col sm="6" class="package-details-value">
                  <p class="mb-0">
                    {{ getBookingDetails.email }}
                  </p>
                </b-col>
              </b-row>
            </div>

            <div
              v-if="getBookingDetails.commnet"
              class="user-comment bg-white overflow-hidden rounded-14"
            >
              <h1 class="user-comment__title text-font-main text-med-14">
                {{ $t('user_comments.title') }}
              </h1>
              <div class="user-comment__body">
                <div class="comment-container m-0">
                  <div class="comment-user">
                    <div class="comment-user-container">
                      <div class="comment-user--img">
                        <img :src="getBookingDetails.commnet.image" />
                      </div>
                      <div class="comment-user--info">
                        <div class="name text-med-16">
                          {{ getBookingDetails.commnet.name }}
                        </div>
                        <div class="user-details">
                          <div class="rate">
                            <symbol id="icon-star" view-box="0 0 12 12">
                              <path
                                id="Path_147238"
                                data-name="Path 147238"
                                d="M13.649,7.759a1.271,1.271,0,0,0,.294-1.3A1.255,1.255,0,0,0,12.928,5.6l-2.576-.4a.084.084,0,0,1-.054-.048l-1.129-2.4a1.268,1.268,0,0,0-2.312-.018l-1.129,2.4a.1.1,0,0,1-.06.048L3.1,5.6a1.273,1.273,0,0,0-1.021.858,1.289,1.289,0,0,0,.3,1.3l1.9,1.95a.1.1,0,0,1,0,.078L3.83,12.51a1.273,1.273,0,0,0,1.88,1.326l2.24-1.242a.078.078,0,0,1,.072,0l2.24,1.242a1.279,1.279,0,0,0,1.88-1.326L11.727,9.8a.072.072,0,0,1,0-.072Z"
                                transform="translate(-2.012 -2)"
                              />
                            </symbol>
                            <rate
                              class="RateCustom"
                              :length="5"
                              :value="getBookingDetails.commnet.rate"
                              :readonly="true"
                              iconref="icon-star"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="time text-reg-13 text-font-secondary">
                      {{ formattedDate(getBookingDetails.commnet.created_at) }}
                    </div>
                  </div>
                  <div class="comment-info">
                    <p class="comment-info--text text-reg-13">
                      {{ getBookingDetails.commnet.comment }}
                    </p>
                    <div class="d-flex flex-wrap comment-info--images">
                      <img
                        v-for="(img, index) in getBookingDetails.commnet
                          .review_images"
                        :key="index"
                        :src="img"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
          <b-col lg="5" xl="4" class="my-3">
            <user-info
              v-if="getBookingDetails.user"
              :id="getBookingDetails.user.id"
              :name="getBookingDetails.user.name"
              :email="getBookingDetails.user.email"
              :image="getBookingDetails.user.image"
            />
            <booking-summary v-if="getBookingDetails.service_counters" />
          </b-col>
        </b-row>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import rate from 'vue-rate/src/Rate.vue';
import 'vue-rate/dist/vue-rate.css';
import JourneyDetails from '@/components/pages/bookings/JourneyDetails.vue';
import UserInfo from '@/components/pages/bookings/UserInfo.vue';
import BookingSummary from '@/components/pages/bookings/BookingSummary.vue';
import PageHeader from '@/components/wameed/WameedPageHeader.vue';

export default {
  components: {
    JourneyDetails,
    UserInfo,
    BookingSummary,
    rate,
    PageHeader,
  },
  computed: {
    ...mapGetters({
      getBookingDetails: 'getBookingDetails',
    }),
  },
  mounted() {
    this.loadBookingsDetails(this.$router.currentRoute.params.id);
  },
  methods: {
    ...mapActions({
      loadBookingsDetails: 'loadBookingsDetails',
      loadFile: 'loadFile',
    }),
    formattedDate(date) {
      return moment().diff(moment(date), 'days') >= 7
        ? moment(date).format('YYYY-MM-DD')
        : moment(date).fromNow(true);
    },
  },
};
</script>
