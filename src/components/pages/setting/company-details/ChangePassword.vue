<template>
  <!-- <div class="wameed-filter-modal  "> -->
  <validation-observer
    ref="form"
    #default="{ invalid }"
    tag="form"
    style="overflow: visible"
  >
    <b-modal
      header-class="py-5 px-5"
      body-class="py-5 px-5"
      id="wameed-modal"
      v-model="show"
      title=""
      no-fade
      scrollable
    >
      <template #modal-header>
        <div class="d-flex justify-content-between align-items-center w-100">
          <h4 class="text-medium-20">{{ $t('common.change_password') }}</h4>
          <b-button
            variant="white"
            size="sm"
            class="close"
            @click="show = false"
          >
            <close-icon />
          </b-button>
        </div>
      </template>
      <!-- <wameed-form refs="" @submitAction="submitJob">
               <template slot="form-content" slot-scope="{ invalid }"> -->
      <div class="py-1 px-1">
        <text-input
          id="old-password"
          v-model="oldPassword"
          :label="$t('common.old_password')"
          fieldClasses="mb-5"
          inputClasses="text-med-14 text-font-main "
          name="oldPassword"
          rules="required"
          :placeholder="$t('common.old_password_placeholder')"
          isAppend
          :icon="showOldPassword ? 'eyeon-icon' : 'eyeoff-icon'"
          @iconClick="showOldPassword = !showOldPassword"
          :type="showOldPassword ? 'password' : 'text'"
        />
        <text-input
          id="new-password"
          v-model="newPassword"
          :label="$t('common.new_password')"
          fieldClasses="mb-5"
          inputClasses="text-med-14 text-font-main"
          name="newPassword"
          rules="password"
          :placeholder="$t('common.new_password_placeholder')"
          isAppend
          :icon="showNewPassword ? 'eyeon-icon' : 'eyeoff-icon'"
          @iconClick="showNewPassword = !showNewPassword"
          :type="showNewPassword ? 'password' : 'text'"
        />
        <text-input
          id="confirm-new-password"
          v-model="confirmNewPassword"
          :label="$t('common.confirm_new_password')"
          fieldClasses="mb-5"
          inputClasses="text-med-14 text-font-main"
          name="confirmNewPassword Password Confirm"
          rules="required|confirmed:newPassword"
          :placeholder="$t('common.new_password_placeholder')"
          isAppend
          :icon="showConfirmPassword ? 'eyeon-icon' : 'eyeoff-icon'"
          @iconClick="showConfirmPassword = !showConfirmPassword"
          :type="showConfirmPassword ? 'password' : 'text'"
        />
      </div>
      <template slot="modal-footer">
        <div class="d-flex justify-content-between align-items-center w-100">
          <wameed-btn
            classes="  text-med-14 text-white rounded-10"
            :title="$t('common.save_edited')"
            :disabled="invalid"
            type="submit"
            variant="main"
            @submitAction="submitChangedPassword()"
          />
          <wameed-btn
            classes="  text-med-14 text-font-secondary rounded-10 "
            :title="$t('common.cancel')"
            type="button"
            variant="gray"
            @submitAction="closeModal()"
          />
        </div>
      </template>
      <!-- </template>
      </wameed-form> -->
    </b-modal>
  </validation-observer>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import WameedForm from '@/components/wameed/WameedForm.vue';
import WameedBtn from '@/components/wameed/WameedBtn.vue';
import TextInput from '@/components/wameed/WameedTextInput.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    WameedForm,
    WameedBtn,
    TextInput,
    ValidationObserver,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showOldPassword: true,
      showNewPassword: true,
      showConfirmPassword: true,
      oldPassword: null,
      newPassword: null,
      confirmNewPassword: null,
    };
  },
  computed: {
    ...mapGetters({
      getProfileInfo: 'getProfileInfo',
    }),
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
    ...mapActions({
      changeUserPassword: 'changeUserPassword',
    }),
    submitChangedPassword() {
      const data = {
        'current-password': this.oldPassword,
        'new-password': this.newPassword,
      };
      if (data) {
        this.changeUserPassword(data);
      }
      this.show = false;
    },
    closeModal() {
      (this.oldPassword = null),
      (this.newPassword = null),
      (this.confirmNewPassword = null),
      (this.show = false);
    },
  },
};
</script>
 
