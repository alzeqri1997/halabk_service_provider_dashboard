<template>
  <div class="user-info bg-white rounded-14">
    <h1 class="user-info__heading text-font-main text-med-14">
      {{ $t('user_info.title') }}
    </h1>
    <div class="user-info__body">
      <div class="personal-info">
        <img class="avatar" :src="image" alt="" />

        <p class="m-0 text-reg-16 text-font-main">
          {{ name }}
        </p>
      </div>
      <router-link :to="goto('chats')" class="personal-contact rounded-12">
        <chat2-icon />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    id: {
      type: Number,
      default: null,
    },
  },
  methods: {
    goto(value) {
      const userInfo = {
        id: this.id.toString(),
        name: this.name,
        avatar: this.image,
      };
      return {
        name: value,
        params: { userInfo },
      };
    },
  },
};
</script>
