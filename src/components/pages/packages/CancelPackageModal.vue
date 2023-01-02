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
            {{ $t('packages.order_cancel_package') }}
          </h3>
        </div>
      </template>

      <b-row>
        <b-col md="12">
          <text-area
            id="cancel-package-details"
            v-model="cancelPackageModalInput"
            :label="$t('packages.reason_for_cancellation')"
            :placeholder="$t('packages.reason_for_cancellation_placeholder')"
            input-classes="text-med-14 text-font-main"
            name="packageDetails"
            rules="required"
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
import { mapActions } from 'vuex';
import TextArea from '../../wameed/WameedTextArea.vue';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    WameedBtn,
    TextInput,
    TextArea,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    packageId: Number,
  },
  data() {
    return {
      cancelPackageModalInput: null,
    };
  },
  computed: {
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
    submitOrder() {
      const data = {
        service_id: this.packageId,
        reason: this.cancelPackageModalInput,
        day: null,
        status: 'cancel', // or feature
      };

      this.submitChangeStatus(data).then(() => {
        this.$emit('set-message', this.cancelPackageModalInput);
        this.show = false;
        this.cancelPackageModalInput = null;
        this.$store.commit('loadingFinish');
      });
    },
    closeModal() {
      this.cancelPackageModalInput = null;
      this.show = false;
    },
  },
};
</script>
