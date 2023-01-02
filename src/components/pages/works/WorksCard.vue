<template>
  <b-card
    no-body
    class="cursor-pointer wameed-card h-100 my-0"
    @click="cardAction(id)"
  >
    <b-card-header class="flex-nowrap align-items-start pb-1">
      <b-media no-body class="flex-wrap">
        <b-media-aside class="mb-4">
          <b-avatar variant="gray" rounded size="88">
            <img v-if="!isIcon" :src="require(`@/assets/images/pages/${avatar}`)" />
         <component
         v-if="isIcon"
                        v-bind:is="avatar
                        "
                      />
          </b-avatar>
        </b-media-aside>
        <b-media-body>
          <h5 class="mb-0 text-bold-20 text-font-main mb-3 mx-2">
            {{ title }}
          </h5>
          <h5 class="mb-0 text-book-18 text-font-sub mb-3 mx-2">
            {{ subTitle }}
          </h5>
          <h5 class="text-reg-14  text-font-secondary mb-3 mx-2">
            <strong class="text-main">{{ formatedDate(date) }}</strong>
          </h5>
          <div class="d-flex flex-wrap">
            <b-badge
              variant="light-sub2"
              class="text-reg-14  mx-1 px-4 py-2 mb-4"
            >
              {{ count }}
            </b-badge>
            <b-badge
              variant="light-main"
              class="text-reg-14  mx-1 px-4 py-2 mb-4"
            >
              {{ subDescription }}
            </b-badge>
          </div>
        </b-media-body>
      </b-media>
      <b-badge
        v-if="readStatus"
        pill
        variant="secondary2"
        class="text-reg-14  px-4"
      >
        جديد
      </b-badge>
    </b-card-header>
  </b-card>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    subTitle: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
    count: {
      type: String,
      default: null,
    },
    subDescription: {
      type: String,
      default: null,
    },
    readStatus: {
      type: Boolean,
      default: null,
    },
    isIcon: {
      type: Boolean,
      default: null,
    },
  },
  methods: {
       formatedDate(date) {
      return this.moment().diff(this.moment(date), "days") > 7
        ? this.moment(date).format("YYYY-MM-DD")
        : this.moment(date).fromNow(true);
    },
    cardAction(id) {
      this.$emit("cardAction", id);
    },
  },
};
</script>
