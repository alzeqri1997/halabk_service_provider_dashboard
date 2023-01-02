<template>
  <validation-observer
    ref="form"
    #default="{ invalid }"
    tag="form"
    class="repeater__form"
    style="overflow: visible"
  >
    <b-modal
      v-model="show"
      size="lg"
      content-class="package-modal rounded-14 mx-4"
      no-fade
    >
      <template slot="modal-header-close">
        <close-icon />
      </template>
      <template slot="modal-title">
        <div class="d-block text-center">
          <h3 class="text-reg-18">
            {{ $t('packages.request_special_offer') }}
          </h3>
        </div>
      </template>

      <b-alert show class="rounded-14" variant="warning">
        <div class="alert-body text-reg-14 rounded-14">
          <story-icon class="mr-3"></story-icon>
          <span class="ml-25">{{ $t('packages.check_manually') }}</span>
        </div>
      </b-alert>

      <b-row>
        <b-col md="12">
          <div
            class="d-flex justify-content-between align-items-center flex-wrap"
          >
            <label class="text-font-main mb-3 text-reg-14 required">{{
              $t('packages.number_of_advertising_days')
            }}</label>
            <span class="text-secondary text-reg-12">{{ remainingDays }}</span>
          </div>
          <text-input
            id="package-ad"
            v-model="days"
            :placeholder="$t('packages.number_of_advertising_days_placeholder')"
            :name="$t('packages.number_of_advertising_days')"
            :rules="`required|numeric|max_value:${durationAsDays(startDate)}`"
          />
        </b-col>
        <b-col md="12">
          <text-area
            id="package-request-reason"
            v-model="requestReason"
            :label="$t('packages.request_reason')"
            :placeholder="$t('packages.request_reason_placeholder')"
            input-classes="text-med-14 text-font-main"
            name="requestReason"
            rows="5"
          />
        </b-col>
      </b-row>

      <template slot="modal-footer">
        <wameed-btn
          classes="  text-med-14 text-white mx-0 rounded-10"
          :title="$t('common.send')"
          :disabled="invalid"
          type="submit"
          variant="main"
          @submitAction="submitOrder()"
        />
        <wameed-btn
          classes="  text-med-14 text-font-secondary mx-0 rounded-10 "
          :title="$t('common.cancel')"
          type="button"
          variant="gray"
          @submitAction="closeModal()"
        />
      </template>
    </b-modal>
  </validation-observer>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import WameedBtn from '@/components/wameed/WameedBtn.vue';
import TextInput from '@/components/wameed/WameedTextInput.vue';
import WameedDropdown from '@/components/wameed/WameedDropdown.vue';
import { mapActions } from 'vuex';
import TextArea from '../../wameed/WameedTextArea.vue';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    WameedBtn,
    TextInput,
    TextArea,
    WameedDropdown,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    startDate: String,
    packageId: Number
  },
  data() {
    return {
      days: null,
      requestReason: null,
      showSuccessModal: false,
    };
  },
  computed: {
    remainingDays() {
      if (this.startDate) {
        const days = this.durationAsDays(this.startDate);
        if (days === 0) {
          return;
        }
        const textAr = `تبقى لك ${days} ${this.$i18n.t(
          'packages.days',
        )} لبدء الباقة`;
        const textEn = `you have ${days} ${this.$i18n.t(
          'packages.days',
        )} left to start the package`;
        return this.$i18n.locale === 'ar' ? textAr : textEn;
      }
    },
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit('close');
        }
      },
    },
  },
  methods: {
    ...mapActions(['submitChangeStatus']),
    durationAsDays(givenDate) {
      const current = this.moment().startOf('day');
      const given = this.moment(givenDate);

      // Difference in number of days

      const totalDays = this.moment(given)
        .startOf('day')
        .diff(this.moment(current).startOf('day'), 'days');

      if (totalDays <= 7) {
        if (totalDays === 1) {
          return totalDays;
        }
        if (totalDays <= 0) {
          return 0;
        }
        return totalDays;
      }

      return totalDays;
    },
    submitOrder() {
      const data = {
        service_id: this.$router.currentRoute.params.id ? this.$router.currentRoute.params.id : this.packageId,
        day: this.days,
        reason: this.requestReason,
        status: 'feature',
      };
      this.submitChangeStatus(data).then(() => {
        this.$emit('set-message', data);
        this.show = false;
        this.showModal = true;
        this.days = null;
        this.requestReason = null;
        this.$store.commit('loadingFinish');
      });
    },
    closeModal() {
      this.days = null;
      this.requestReason = null;
      this.show = false;
    },
  },
};
</script>
