<template>
  <b-card no-body class="cursor-pointer wameed-card">
    <b-card-header class="align-items-start tab-title">
      <h5 class="text-reg-18 text-font-main">
        {{ $t('company_details.title') }}
      </h5>
    </b-card-header>
    <wameed-form refs="" @submitAction="submitContact">
      <template slot="form-content" slot-scope="{ invalid }">
        <b-card-body
          class="position-relative py-5 justify-content-between px-5"
        >
          <div class="mb-2 mx-4">
            <h4 class="text-med-16 text-font-main">
              {{ $t('company_details.how_type_your_name') }}
            </h4>
            <h5 class="text-reg-16 text-font-sub">
              {{ $t('company_details.description') }}
            </h5>
          </div>
          <!-- form -->
          <div class="d-flex flex-wrap py-4">
            <b-col
              v-for="contact in contacts.contacts"
              :key="contact.id"
              cols="12"
              md="6"
            >
              <text-input
                :id="contact.name"
                v-model="contact.value"
                :label="$t('common.' + contact.name)"
                inputClasses="text-med-14 text-font-main"
                :name="contact.name"
                :placeholder="$t('common.' + contact.name + '_placeholder')"
              />
            </b-col>
          </div>
        </b-card-body>
        <b-card-footer class="px-4 py-3">
          <div class="d-flex flex-wrap justify-content-between">
            <div class="px-4 py-3">
              <wameed-btn
                classes="  text-medium-16 text-white rounded-10"
                :title="$t('common.save_edited')"
                :disabled="invalid"
                type="submit"
                variant="main"
              />
            </div>
            <div class="px-4 py-3">
              <wameed-btn
                classes="  text-medium-16 text-font-secondary rounded-10 "
                :title="$t('common.cancel')"
                type="button"
                variant="gray"
                @submitAction="resetChanges"
              />
            </div>
          </div>
        </b-card-footer>
      </template>
    </wameed-form>
  </b-card>
</template>

<script>
import WameedForm from '@/components/wameed/WameedForm.vue';

import TextInput from '@/components/wameed/WameedTextInput.vue';
import WameedBtn from '@/components/wameed/WameedBtn.vue';
import WameedDropdown from '@/components/wameed/WameedDropdown.vue';
import WameedAsideModal from '@/components/wameed/WameedAsideModal.vue';
import WameedSwitch from '@/components/wameed/WameedSwitch.vue';
import { mapActions, mapGetters } from 'vuex';

import TextEditor from '@/components/wameed/WameedTextEditor.vue';

export default {
  components: {
    TextInput,
    WameedBtn,
    WameedDropdown,
    WameedAsideModal,
    WameedSwitch,
    WameedForm,
    TextEditor,
  },
  data() {
    return {
      contacts: {},
    };
  },
  methods: {
    resetChanges() {
      // parse the data that comes from the server
      const updatedContacts = JSON.parse(
        JSON.stringify(this.getBusinessProfileInfo),
      );
      // update the form with the data using $set, because vue can not detect the change in the data if 
      // it is an array or object.
      this.$set(this.contacts, 'contacts', updatedContacts.contacts);
    },
    submitContact() {
      const data = {
        contacts: this.contacts.contacts.map(contact => ({
          id: contact.id,
          value: contact.value,
        })),
      };
      this.$store.dispatch('updateBusinessProfileInfoContact', data);
    },
  },
  computed: {
    ...mapGetters({
      getBusinessProfileInfo: 'getBusinessProfileInfo',
    }),
  },
  created() {
    this.contacts = JSON.parse(JSON.stringify(this.getBusinessProfileInfo));
  },
};
</script>
 
