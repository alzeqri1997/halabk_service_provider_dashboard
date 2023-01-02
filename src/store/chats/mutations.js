export default {
  SET_CHAT_USERS: (state, data) => {
    state.allchatUsers = data;
  },
  SET_ONE_CHAT_USER: (state, data) => {
    state.oneChatUser = data;
  },
  SET_MESSAGES: (state, news) => {
    state.privateMessages = news;
  },
  SET_SITE_MESSAGES: (state, news) => {
    state.sitePrivateMessages = news;
  },
  setUploadedFileLink(state, status) {
    state.uploadLoadedFileLink = status;
  },
};
