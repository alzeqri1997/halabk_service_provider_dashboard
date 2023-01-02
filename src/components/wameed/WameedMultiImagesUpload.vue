
<template>
  <b-form-group
    class="wameed-input text-reg-14 text-font-main"
    :class="{ fieldClasses, 'required-file': required }"
    :label="label"
    :label-for="id"
  >
    <div
      class="multi-images-upload"
      @dragover.prevent="dragOver"
      @dragleave.prevent="dragLeave"
      @drop.prevent="drop($event)"
    >
      <div class="drop" v-show="dropped == 2"></div>

      <!-- To inform user how to upload image -->
      <div class="beforeUpload">
        <input
          type="file"
          :id="id"
          :name="id"
          style="z-index: 1"
          :accept="fileType == 'image' ? 'image/*' : 'application/pdf'"
          ref="uploadInput"
          @change="previewImgs($event, 'upload')"
          multiple
        />
      </div>

      <div class="imgsPreview">
        <button type="button" class="clearButton" v-if="false" @click="reset">
          {{ clearAll ? clearAll : 'clear All' }}
        </button>

        <div class="imgsPreview__imgs">
          <div
            class="plus text-reg-12"
            @click="append"
            v-if="Imgs.length < max && fileType == 'image'"
          >
            <template v-if="!isImageLoading">
              <img-upload-icon />
              {{ $t('common.upload_img') }}
            </template>
            <template v-else-if="isImageLoading">
              <b-spinner label="Spinning"></b-spinner>
            </template>
          </div>
          <div
            class="plus text-reg-12"
            @click="append"
            v-if="Imgs.length < max && fileType == 'file'"
          >
            <template v-if="!isFileLoading">
              <file-upload-icon />
              {{ $t('common.upload_file') }}
            </template>
            <template v-else-if="isFileLoading">
              <b-spinner label="Spinning"></b-spinner>
            </template>
          </div>

          <template v-if="fileType === 'image'">
            <div class="imageHolder" v-for="(img, i) in Imgs" :key="i">
              <img :src="img" />
              <span class="delete" @click="deleteImg(i)">
                <img-close-icon />
              </span>
            </div>
          </template>
          <template v-else>
            <div class="fileHolder" v-for="(file, i) in fileData" :key="i">
              <span class="delete" @click="deleteImg(i)">
                <img-close-icon />
              </span>
              {{ shortenWord(file.name) }}
              <span class="text-font-secondary test-reg-12">{{
                bytesToSize(file.size)
              }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <small v-show="error" class="text-danger">{{ error }}</small>
  </b-form-group>
</template>

<script>
import { mapActions } from 'vuex';
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'MultiUploadImages', // vue component name
  components: {
    ValidationProvider,
  },
  data() {
    return {
      error: '',
      files: [],
      dropped: 0,
      isImageLoading: false,
      isFileLoading: false,
      fileData: [],
    };
  },
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    maxSize: {
      type: Number,
      default: 6,
    },
    min: Number,
    max: Number,
    uploadMsg: String,
    maxError: String,
    fileError: String,
    clearAll: String,
    label: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    id: {
      type: String,
      default: null,
    },
    rules: {
      type: String,
      default: null,
    },
    fieldClasses: {
      type: String,
      default: null,
    },
    fileType: {
      type: String,
      default: 'image',
    },
    Imgs: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapActions({ uploadFiles: 'uploadFiles' }),
    shortenWord(value) {
      return value.split('').splice(0, 5).join('').concat('', ' ...pdf');
    },
    dragOver() {
      this.dropped = 2;
    },
    dragLeave() {},
    drop(e) {
      let status = true;
      const files = Array.from(e.dataTransfer.files);
      if (e && files) {
        files.forEach(file => {
          const fileTypes = [
            'application/pdf',
            'image/jpeg',
            'image/png',
            'image/jpg',
          ];
          if (
            (this.fileType == 'image'
              && file.type.startsWith('image') === false)
            || (this.fileType == 'file' && file.type != 'application/pdf')
          ) status = false;
          else if (this.fileType == 'all' && !fileTypes.includes(file.type)) status = false;
        });
        if (status == true) {
          
          this.previewImgs(files, 'drag');
        } else {
          this.error = this.$props.fileError
            ? this.$props.fileError
            : 'Unsupported file type';
        }
      }
      this.dropped = 0;
    },
    append() {
      this.$refs.uploadInput.click();
    },
    readAsDataURL(file) {
      return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = function () {
          resolve(fr.result);
        };
        fr.onerror = function () {
          reject(fr);
        };
        fr.readAsDataURL(file);
      });
    },
    deleteImg(index) {
      this.Imgs.splice(index, 1);
      this.files.splice(index, 1);
      this.$emit('changed', this.Imgs);
      if (this.fileType === 'file') {
        this.fileData.splice(index, 1);
      }
      this.$refs.uploadInput.value = null;
    },
    previewImgs(event, type) {
      let files = [];
      if (type == 'upload') {
        files = event.currentTarget.files;
      } else {
        files = event;
      }
      this.error = '';
      if (!files.length) return;
      const formData = new FormData();
      if (this.fileType === 'image') {
        this.isImageLoading = true;
      } else {
        this.isFileLoading = true;
      }
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > this.maxSize * 1024 * 1024) {
          this.error = this.$i18n.locale === 'en' ? 'File size must be less than 6MB' : 'يجب أن يكون حجم الملف أقل من 6 ميغا بايت';
          if (this.fileType === 'image') {
            this.isImageLoading = false;
          } else {
            this.isFileLoading = false;
          }
          return;
        }
        if (this.Imgs.length < this.max) {
          formData.append('file', files[i]);
          // todo img push
          this.uploadFiles(formData).then(response => {
            if (this.fileType === 'file') {
              this.isFileLoading = false;
            } else {
              this.isImageLoading = false;
            }
            this.Imgs.push(response);
            if (this.fileType === 'file') {
              this.fileData.push({
                name: files[i].name,
                size: files[i].size,
              });
            }

            this.$emit('changed', this.Imgs);
          });
        } else {
          this.error = this.maxError
            ? this.maxError
            : this.$i18n.locale === 'en' ?`Maximum files is ${this.max}` : 'الحد الأقصى للملفات هو ' + this.max;
          return;
        }
      }
    },
    reset() {
      this.$refs.uploadInput.value = null;
      this.Imgs = [];
      this.files = [];
      this.$emit('changed', this.Imgs);
    },
    bytesToSize(bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes == 0) return '0 Byte';
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
    },
  },
};
</script>
