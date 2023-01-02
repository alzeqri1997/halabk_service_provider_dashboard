<template>
  <span>{{ minutes }}:{{ seconds }}</span>
</template>

<script>
export default {
  props: {
    end: null,
  },
  data() {
    return {
      timerCount: this.end,
      finish: false,
    };
  },
  computed: {
    seconds() {
      if (this.timerCount == 0) return 0;
      return this.timerCount % 60;
    },
    minutes() {
      if (this.timerCount == 0) return 0;
      return Math.trunc(this.timerCount / 60) % 60;
    },
  },
  watch: {
    end: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal > 0) {
          this.timerCount = newVal;
          let a = setInterval(() => {
            this.timerCount--;
            if (this.timerCount == 0) {
              clearInterval(a);
              this.$emit('onFinish');
            }
          }, 1000);
        }
      },
    },
  },

 
};
</script>