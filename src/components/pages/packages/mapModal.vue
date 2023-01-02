<template>
  <validation-observer
    ref="form"
    tag="form"
    class="repeater__form"
    style="overflow: visible"
  >
    <b-modal
      v-model="show"
      size="lg"
      content-class="package-modal mx-4"
      no-fade
    >
      <template slot="modal-header-close">
        <close-icon />
      </template>
      <template slot="modal-title">
        <div class="d-block text-center">
          <h3 class="text-reg-18">
            {{ $t('packages.map_address') }}
          </h3>
        </div>
      </template>

      <div class="w-100 rounded-8 position-relative">
        <GmapMap
          ref="map"
          :center="center"
          :zoom="17"
          map-type-id="roadmap"
          style="width: 100%; height: 356px; border-radius: 8px"
          class="rounded-8"
          :options="{
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            disableDefaultUi: true,
          }"
        >
          <GmapMarker
            v-if="marker"
            :position="marker"
            :draggable="false"
          />
        </GmapMap>
      </div>

      <template slot="modal-footer">
        <wameed-btn
          block
          classes="  text-med-14 text-font-secondary mx-0 rounded-10 "
          :title="$t('common.cancel')"
          type="button"
          variant="gray"
          @submitAction="show = false"
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

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    WameedBtn,
    TextInput,
    WameedDropdown,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      place: null,
      type: '',
      contentItems: [],
      nextTodoId: 1,
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
    center() {
      if (this.location) {
        const tempLat = parseFloat(this.location.split(',')[0]);
        const tempLng = parseFloat(this.location.split(',')[1]);
        return {
          lat: tempLat,
          lng: tempLng,
        };
      }
      return {
        lat: 0,
        lng: 0,
      };
    },
    marker() {
      if (this.location) {
        const tempLat = parseFloat(this.location.split(',')[0]);
        const tempLng = parseFloat(this.location.split(',')[1]);
        return {
          lat: tempLat,
          lng: tempLng,
        };
      }
      return {
        position: {
          lat: 0,
          lng: 0,
        },
      };
    },
  },
};
</script>
