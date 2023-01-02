export default {
  getChatUsers(state) {
    return state.allchatUsers;
  },
  getOneChatUser(state) {
    return state.oneChatUser;
  },
  getPrivateMessages(state) {
    return state.privateMessages;
  },
  getUploadedFileLink(state) {
    return state.uploadLoadedFileLink;
  },
};
