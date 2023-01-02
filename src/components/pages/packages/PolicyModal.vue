<template>
  <!-- <div class="wameed-filter-modal  "> -->
  <b-modal
    id="wameed-modal"
    size="lg"
    content-class="package-modal"
    v-model="show"
    no-fade
    body-class="py-5 px-5"
  >
    <template #modal-header>
      <div class="d-flex justify-content-between align-items-center w-100">
        <h4 class="text-medium-20">
          {{ $t('packages.terms_and_condations') }}
        </h4>
        <b-button variant="gray" size="sm" class="close" @click="show = false">
          <close-icon />
        </b-button>
      </div>
    </template>
    <div class="package-modal__container policies rounded-8">
      <p class="policies__text text-reg-14 text-font-main">
        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
        النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من
        النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت
        تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات
        كما ، النص لن يبدو مقسما ولا يحوي أخطاء لغوية لقد تم توليد هذا النص من
        مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص
        الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق هذا النص هو مثال
        لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص
        العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة
        إلى زيادة عدد الحروف التى يولدها التطبيق
      </p>
      <blockquote class="policies__text text-reg-14 text-font-main pl-4">
        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
        النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من
        النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت
        تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى هذا النص هو مثال
        لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد إذا كنت
        تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى
      </blockquote>
      <h3 class="text-med-14 text-font-main mb-4">الشرط الأول</h3>
      <p class="policies__text text-reg-14 text-font-main">
        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
        النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من
        النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت
        تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات
        كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية لقد تم توليد هذا النص
        من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص
        الأخرى هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
        هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد
        من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت
        تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات
        كما تريد النص لهذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد
        تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو
        العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
        إذا كنت تحتاج إلى عدد
      </p>
    </div>

    <div>
      <b-form-checkbox
        class="
          custom-control-main
          terms-and-conditions
          wameed-checkbox
          mb-2 mb-0
          mt-5
        "
        v-model="isAgreed"
        name="checkbox-1"
        :unchecked-value="false"
      >
        {{ '  ' + $t('packages.terms_approve') }}
      </b-form-checkbox>
    </div>

    <template slot="modal-footer">
      <div class="d-flex justify-content-between align-items-center w-100">
        <wameed-btn
          classes=" text-med-14 text-white rounded-10"
          :title="$t('packages.add_package_btn')"
          :disabled="!isAgreed"
          type="submit"
          variant="main"
          @submitAction="$emit('submitAction')"
        />
        <wameed-btn
          classes="  text-med-14 text-font-secondary rounded-10 "
          :title="$t('common.cancel')"
          type="button"
          variant="gray"
          @submitAction="show = false"
        />
      </div>
    </template>
  </b-modal>
</template>

<script>
import WameedCheckbox from '@/components/wameed/WameedCheckbox.vue';
import WameedBtn from '@/components/wameed/WameedBtn.vue';

export default {
  components: { WameedCheckbox, WameedBtn },
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
  data: () => ({
    isAgreed: false,
  }),
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
    closeModal() {
      this.show = false;
    },
  },
};
</script>
 
