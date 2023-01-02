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

      <div
        @click="showMap = true"
        v-if="!showMap"
        class="map-container bg-light-input rounded-8"
      >
        <map-address-icon></map-address-icon>
        <span>{{ $t('packages.press_to_enter_location') }}</span>
      </div>
      <div v-if="showMap" class="w-100 rounded-8 position-relative">
        <div class="gmap-container">
          <div class="input position-relative">
            <gmap-autocomplete
              class="text-reg-14 rounded-8"
              @place_changed="initMarker"
            ></gmap-autocomplete>
            <button class="search-icon" @click="initMarker">
              <search-icon></search-icon>
            </button>
          </div>
          <div
            @click="resetMap()"
            class="current-location rounded-8 bg-white text-main text-reg-14"
          >
            <gps-icon></gps-icon>
            {{ $t('packages.my_current_location') }}
          </div>
        </div>
        <GmapMap
          ref="input"
          :center="center"
          :zoom="10"
          map-type-id="roadmap"
          style="width: 100%; height: 356px; border-radius: 8px"
          class="rounded-8"
          @click="updateCenter"
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
            v-if="mapMarkar2"
            :position="mapMarkar2"
            :draggable="false"
          />
        </GmapMap>
      </div>

      <template slot="modal-footer">
        <wameed-btn
          classes=" text-med-14 text-white mx-0 rounded-10"
          :title="$t('common.add_address')"
          :disabled="!isThereLocation || invalid"
          type="submit"
          variant="main"
          @submitAction="addLocation()"
        />
        <wameed-btn
          classes=" text-med-14 text-font-secondary mx-0 rounded-10 "
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
import { gmapApi } from 'vue2-google-maps';

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    WameedBtn,
    TextInput,
    WameedDropdown,
  },
  props: {
    packagesContent: {
      type: Array,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    centervalue: {
      type: Object,
      default: null,
    },
    mapMarkar: {
      type: Object,
      default: null,
    },
    mapType: {
      type: Boolean,
      default: false,
    },
    branchLimits: {
      type: String,
      default: '100',
    },
  },
  data() {
    return {
      isThereLocation: false,
      place: null,
      showMap: false,
      center: { lat: 24.774265, lng: 46.738586 },
      mapMarkar2: { lat: 24.774265, lng: 46.738586 },
      type: '',
      contentItems: [],
      nextTodoId: 1,
    };
  },
  computed: {
    google: gmapApi,
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
  watch: {
    packagesContent: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        this.contentItems = JSON.parse(JSON.stringify(newValue));
      },
    },
    branchLimits(newVal) {
      this.limits = newVal;
      if (parseFloat(this.limits) > 100) {
        this.setLimits = true;
      }
    },
    mapMarkar(newValue) {
      if (newValue != null) {
        this.mapMarkar2 = {
          lat: parseFloat(newValue.lat),
          lng: parseFloat(newValue.lng),
        };
        this.center = {
          lat: parseFloat(newValue.lat),
          lng: parseFloat(newValue.lng),
        };
        this.updateCenter(null);
      }
    },
  },
  methods: {
    addLocation() {
      const location = {
        location: `${this.mapMarkar2.lat},${this.mapMarkar2.lng}`,
        address: this.mapMarkar2.address,
      };
      this.$emit('setLocation', location);
      this.show = false;
    },

    resetMap() {
      this.geolocate();
    },
    initMarker(loc) {
      this.center = {
        lat: loc.geometry.location.lat(),
        lng: loc.geometry.location.lng(),
        address: loc.formatted_address,
      };
      this.mapMarkar2 = {
        lat: loc.geometry.location.lat(),
        lng: loc.geometry.location.lng(),
        address: loc.formatted_address,
      };
    },
    updateCenter(location) {
      location != null
        ? (this.mapMarkar2 = {
          lat: parseFloat(location.latLng.lat()),
          lng: parseFloat(location.latLng.lng()),
        })
        : '';

      // this.$parent.center = this.center
      // this.$emit("child-center", NewCenter);
      this.location = false;
      this.$gmapApiPromiseLazy().then(() => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: this.mapMarkar2 }, (results, status) => {
          if (status === 'OK') {
            // this.currentLocation.lat = results[0].formatted_address;
            this.isThereLocation = true;
            this.mapMarkar2 = {
              ...this.mapMarkar2,
              address: results[0].formatted_address,
            };
          }
        });
      });
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        const centerLat = position.coords.latitude;
        const centerLng = position.coords.longitude;
        this.center = {
          lat: parseFloat(centerLat),
          lng: parseFloat(centerLng),
        };
        this.isThereLocation = false;
        this.$gmapApiPromiseLazy().then(() => {
          const geocoder = new google.maps.Geocoder();
          this.isThereLocation = true;

          geocoder.geocode({ location: this.center }, (results, status) => {
            if (status === 'OK') {
              this.mapMarkar2 = {
                ...this.center,
                address: results[0].formatted_address,
              };
            }
          });
        });
      });
    },
    geolocator() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: parseFloat(this.centervalue.lat),
          lng: parseFloat(this.centervalue.lng),
        };
      });
    },
    resetChange() {
      this.$emit('resetLocation');

      this.show = false;
    },
  },
  mounted() {
    if (this.mapType == true) {
      this.showMap = true;
    }
  },
  updated() {
    if (this.mapMarkar == null) {
      this.geolocate();
    } else {
      // this.geolocator();
    }
    if (this.mapMarkar != null) {
      this.limits = this.branchLimits;
      if (parseFloat(this.limits) > 100) {
        this.setLimits = true;
      }
      this.isThereLocation = false;
      this.$gmapApiPromiseLazy().then(() => {
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode({ location: this.mapMarkar }, (results, status) => {
          if (status === 'OK') {
            this.isThereLocation = true;
            this.mapMarkar2 = {
              ...this.mapMarkar,
              address: results[0].formatted_address,
            };
            // this.$emit('setLocation', {
            //   mapMarkar: this.mapMarkar2,
            //   limits: this.limits,
            // });
          }
        });
      });
    }
  },
};
</script>
