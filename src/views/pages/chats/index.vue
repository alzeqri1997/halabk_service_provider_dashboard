<template>
  <div id="mail" class="py-4 px-3">
    <!-- start title -->
    <div class="mb-4">
      <page-header
        :title="$t('chats.title')"
        :subTitle="$t('chats.sub_title')"
      />
    </div>
    <div class="my-2">
      <div class="d-flex flex-wrap">
        <chat-window
          :current-user-id="currentUserId"
          :messages="messages"
          :rooms="rooms"
          :show-add-room="false"
          :load-first-room="true"
          :messages-loaded="true"
          :rooms-loaded="loadingRooms"
          :room-info-enabled="false"
          :emojis-suggestion-enabled="false"
          :show-reaction-emojis="false"
          :show-new-messages-divider="false"
          :show-audio="false"
          :show-emojis="false"
          :message-actions="[]"
          :room-actions="[]"
          :accepted-files="'image/png, image/jpeg'"
          @send-message="sendMessage"
          @fetch-messages="fetchMessages"
          height="80vh"
          :text-messages="{
            TYPE_MESSAGE: $t('chats.enter_message'),
          }"
        >
          <template #no-room-selected="{}">
            <div
              class="d-flex justify-content-center align-items-center py-5"
              style="height: 100%"
            >
              <div class="d-flex flex-column justify-content-center">
                <wameed-no-data
                  icon="nodata-icon"
                  :title="$t('chats.no_data')"
                  :subTitle="$t('chats.no_data_text')"
                />
              </div>
            </div>
          </template>
        </chat-window>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ChatWindow from 'vue-advanced-chat';
import 'vue-advanced-chat/dist/vue-advanced-chat.css';
import WameedNoData from '@/components/wameed/WameedNoData.vue';
import WameedBtn from '@/components/wameed/WameedBtn.vue';
import PageHeader from '@/components/wameed/WameedPageHeader.vue';

import {
  collection,
  getDocs,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  addDoc,
  increment,
} from 'firebase/firestore';
import moment from 'moment';

export default {
  components: {
    ChatWindow,
    WameedNoData,
    WameedBtn,
    PageHeader,
  },
  data: () => ({
    rooms: [],
    messages: [],
    messagesLoaded: false,
    loadingRooms: true,
    admin: null,
    currentUserId: '',
  }),

  computed: {
    ...mapGetters({
      getProfileInfo: 'getProfileInfo',
    }),
  },
  watch: {
    async getProfileInfo(userData) {
      this.currentUserId = userData.id;
      this.admin = userData;
      await this.getChat();
    },
  },

  methods: {
    // start
    async getChat() {
      // change localization of date in order to always make in english.   
      moment.locale('en');
      // this is the variable where we will put the existing users on 
      const rooms = [];
      // support is the admin user and it has to be always the first one. 
      // it doesn't matter if the support is existed in the database or not. it should appear in the list of the chat users.
      const support = {
        roomId: this.currentUserId.toString(),
        roomName: this.$i18n.t('common.technical_support'),
        //index value is used to sort the rooms.
        //I put the index value to the support user to make it the first one in the list no matter what.
        index: 9999999999999,

        lastMessage: '',
        avatar:
          'https://halabkstorage.s3.eu-central-1.amazonaws.com/support.svg',
        
        // the reason I did moment.locale('en'); to make the date in english is because the date is in english in the database.
        lastMessageDate: moment().format(),
        users: [
          {
            // the support user id is going to be your current user id.
            // admin,here, means the provider.
            _id: this.admin.id,
            username: this.admin.name,
          },
        ],
      };
      const db = getFirestore();
      this.$store.commit('loadingStart', null);
      // this is the query to get the users of the provider.
      //  this.currentUserId is the provider id.
      const q = query(
        collection(db, 'convrsations'),
        where('members', 'array-contains', this.currentUserId.toString()),
      );

      // now we will get the data from the database.
      await getDocs(q).then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // now we have to check the id that comes from the database.
          // if the id is the same as the provider id, that means your chatting with the support.
          // else you are chatting with a user.
          if (doc.data().id === this.currentUserId.toString()) {
            rooms.push({
              roomId: doc.data().id,
              roomName: this.$i18n.t('common.technical_support'),
              index: 9999999999999,
              avatar:
                'https://halabkstorage.s3.eu-central-1.amazonaws.com/support.svg',
              unreadCount: doc.data().unreadMessagesMemberA,
              users: [
                {
                  _id: this.admin.id,
                  username: this.admin.name,
                },
              ],
              lastMessage: {
                content: doc.data().lastMessage,
                senderId: parseInt(doc.data().memberA.id),
                username: doc.data().memberA.name,
                timestamp: new Intl.DateTimeFormat('default', {
                  hour12: true,
                  hour: 'numeric',
                  minute: 'numeric',
                }).format(new Date(doc.data().lastMessageDate)),
              },
            });
          } else {
            rooms.push({
              roomId: doc.data().id,
              // member is a method that returns the user that is not the provider.
              roomName: this.member(doc.data()).name,
              // notice we haven't set the index value like the support user 
              // because we don't other users to be at the top of the list.
              // so they will be sorted by the last message date.
              index: new Date(doc.data().lastMessageDate),
              avatar: this.member(doc.data()).photo,
              unreadCount: this.unreadMessage(doc.data()),
              // in users object we have to put the user information and the provider information.
              users: [
                //this is the user information.
                {
                  _id: parseInt(this.member(doc.data()).id),
                  username: this.member(doc.data()).name,
                  avatar: this.member(doc.data()).photo,
                },
                // this is the provider information.
                {
                  _id: this.admin.id,
                  username: this.admin.name,
                },
              ],
              lastMessage: {
                content: doc.data().lastMessage,
                senderId: parseInt(this.member(doc.data()).id),
                username: this.member(doc.data()).name,
                timestamp: new Intl.DateTimeFormat('default', {
                  hour12: true,
                  hour: 'numeric',
                  minute: 'numeric',
                }).format(new Date(doc.data().lastMessageDate)),
              },
            });
          }
        });

        // before we push the users to the rooms variable, we need to 
        // whether or not the support user is in the rooms variable.
        // isAdminExist means : is the support user in the rooms variable ?
        // if yes : we don't need to push the support variable to the rooms variable.
        // if no : we need to push the support variable to the rooms variable.
        const isAdminExist = rooms.some(
          room => room.roomId === this.currentUserId.toString(),
        );
        if (isAdminExist) {
          this.rooms = rooms;
        } else {
          this.rooms = [...rooms, support];
        }
        this.$store.commit('loadingFinish');
        // now we will establish the listener from firebase to listen to upcoming changes in the database
        // using getAllRooms() function.
        this.getAllRooms();
      });
    },

    async getAllRooms() {
      const db = await getFirestore();
      const convrsations = query(
        collection(db, 'convrsations'),
        where('members', 'array-contains', this.currentUserId.toString()),
      );

      const support = {
        roomId: this.currentUserId.toString(),
        roomName: this.$i18n.t('common.technical_support'),
        index: 9999999999999,

        lastMessage: '',
        avatar:
          'https://halabkstorage.s3.eu-central-1.amazonaws.com/support.svg',
        lastMessageDate: moment().format(),
        users: [
          {
            _id: this.admin.id,
            username: this.admin.name,
          },
        ],
      };
      onSnapshot(convrsations, querySnapshot => {
        const rooms = [];
        // establish a listener for the query using querySnapshot.
        querySnapshot.forEach(doc => {
          if (doc.data().id === this.currentUserId.toString()) {
            rooms.push({
              roomId: doc.data().id,
              roomName: this.$i18n.t('common.technical_support'),
              index: 9999999999999,
              avatar:
                'https://halabkstorage.s3.eu-central-1.amazonaws.com/support.svg',
              unreadCount: doc.data().unreadMessagesMemberA,
              users: [
                {
                  _id: this.admin.id,
                  username: this.admin.name,
                },
              ],
              lastMessage: {
                content: doc.data().lastMessage,
                senderId: parseInt(doc.data().memberA.id),
                username: doc.data().memberA.name,
                timestamp: new Intl.DateTimeFormat('default', {
                  hour12: true,
                  hour: 'numeric',
                  minute: 'numeric',
                }).format(new Date(doc.data().lastMessageDate)),
              },
            });
          } else {
            rooms.push({
              roomId: doc.data().id,
              roomName: this.member(doc.data()).name,
              index: new Date(doc.data().lastMessageDate),
              avatar: this.member(doc.data()).photo,
              unreadCount: this.unreadMessage(doc.data()),
              users: [
                {
                  _id: parseInt(this.member(doc.data()).id),
                  username: this.member(doc.data()).name,
                  avatar: this.member(doc.data()).photo,
                },
                {
                  _id: this.admin.id,
                  username: this.admin.name,
                },
              ],
              lastMessage: {
                content: doc.data().lastMessage,
                senderId: parseInt(this.member(doc.data()).id),
                username: this.member(doc.data()).name,
                timestamp: new Intl.DateTimeFormat('default', {
                  hour12: true,
                  hour: 'numeric',
                  minute: 'numeric',
                }).format(new Date(doc.data().lastMessageDate)),
              },
            });
          }
        });
        const isAdminExist = rooms.some(
          room => room.roomId === this.currentUserId.toString(),
        );
        if (isAdminExist) {
          this.rooms = rooms;
        } else {
          this.rooms = [...rooms, support];
        }
      });
    },

    async fetchMessages({ room, options }) {
      // fetch messages from firebase of each room (user) .
      this.messages = [];
      moment.locale('en');
      // establish a listener for messages from firebase.
      this.getRoom(room);
      const db = await getFirestore();
      this.messagesLoaded = true;
      // check if the user is the support user or not.
      const isAdmin = this.compareId(room.roomId);
      const unreadMessageMember = isAdmin
        ? 'unreadMessagesMemberA'
        : 'unreadMessagesMemberB';
      // if the user is the support user, we need to fetch the messages from the support user.
      // else we need to fetch the messages from the user.
      // see https://firebase.google.com/docs/firestore/manage-data/add-data
      if (room.roomId === this.currentUserId.toString()) {
        await setDoc(
          doc(db, 'convrsations', room.roomId),
          {
            id: this.currentUserId.toString(),
            isAdminConvrsationWithCompany: true,
            isConvrsationWithAdmin: true,
            lastMessage: '',
            lastMessageDate: moment().format(),
            memberA: {
              id: this.currentUserId.toString(),
              name: this.admin.name,
              photo: this.admin.image,
            },
            members: [this.currentUserId.toString()],
            unreadMessagesMemberA: 0,
            unreadMessagesMemberB: 0,
          },//check the document if exist then merge it 
          { merge: true },
        );
        // This is for unread messages notifications.
        // once you see the messages , the counter will be reset to 0.
        await setDoc(
          doc(db, 'unreadMessages', 'admin'),
          {
            countUnreadMessages: 0,
          },
          // the option { merge: true } means :  If the document does not exist, it will be created. 
          // If the document does exist, its contents will be overwritten with the newly provided data.
          { merge: true },
        );
      } else {
        await setDoc(
          doc(db, 'convrsations', room.roomId),
          {
            [unreadMessageMember]: 0,
          },
          { merge: true },
        );
        await setDoc(
          doc(db, 'unreadMessages', this.currentUserId.toString()),
          {
            countUnreadMessages: 0,
          },
          { merge: true },
        );
      }
    },
    async getRoom(room) {
      const db = await getFirestore();
      const convrsations = doc(db, 'convrsations', room.roomId);
      const snapshot = await getDoc(convrsations);

      if (snapshot.exists()) {
        const messageRef = query(
          collection(db, 'convrsations', room.roomId, 'messages'),
          orderBy('created_at', 'asc'),
        );
        // establish a listener for the query using querySnapshot.
        onSnapshot(messageRef, querySnapshot => {
          const messages = [];
          querySnapshot.forEach(doc => {
            const msg = doc.data();
            const message = {
              _id: doc.id,
              content: msg.body,
              senderId: parseInt(msg.sender_id),
              username: parseInt(msg.sender_id),
              timestamp: new Intl.DateTimeFormat('default', {
                hour12: true,
                hour: 'numeric',
                minute: 'numeric',
              }).format(new Date(msg.created_at)),
              date: new Date(msg.created_at).toDateString(),
            };
            messages.push(message);
          });
          if (messages.length > 0) {
            this.messages = messages;
          } else {
            this.messages;
          }
        });
      } else {
        this.messages = [];
      }
    },
    async sendMessage(message) {
      moment.locale('en');
      const db = await getFirestore();
      // check if the user is the support user or not.
      const isAdmin = this.compareId(message.roomId);
      const unreadMessageMember = isAdmin
        ? 'unreadMessagesMemberB'
        : 'unreadMessagesMemberA';

      const images = [];
      const formData = new FormData();
      // check if the message is an image or not.
      if ('files' in message && message.files != null) {
        for (let i = 0; i < message.files.length; i++) {
          const file = new File(
            [message.files[i].blob],
            `${message.files[i].name}.${message.files[0].extension}`,
            {
              type: message.files[i].type,
              lastModified: new Date().getTime(),
            },
          );
          formData.append('file', file);
          await this.$store.dispatch('uploadFileChat', formData).then(() => {
            images.push(this.$store.getters.getUploadedFileLink);
          });
        }
        images.forEach(image => {
          // after we created the image formData, we need to iterate over the images array
          // and add to firebase to the specific user.

          // message.roomId is the id of the sender and receiver.
          // example of roomId : '113-68'
          addDoc(collection(db, 'convrsations', message.roomId, 'messages'), {
            body: image,
            convrsationId: message.roomId,
            created_at: moment().format(),
            // the sender_id is the id of the provider.
            sender_id: this.currentUserId.toString(),
            type: 'image',
          });
          // now let's check if the user is the support user or not.
          if (message.roomId === this.currentUserId.toString()) {
            setDoc(
              doc(db, 'convrsations', message.roomId),
              {
                lastMessage: 'image',
                lastMessageDate: moment().format(),
                unreadMessagesMemberB: increment(1),
              },
              { merge: true },
            );
            // this section  is for incrementing the unread messages counter.
            setDoc(
              doc(db, 'unreadMessages', 'admin'),
              {
                countUnreadMessages: increment(1),
              },
              { merge: true },
            );
          } else {
            setDoc(
              doc(db, 'convrsations', message.roomId),
              {
                lastMessage: 'image',
                lastMessageDate: moment().format(),
                [unreadMessageMember]: increment(1),
              },
              { merge: true },
            );
            setDoc(
              // otherUserId() method returns the id of the other user. 
              doc(db, 'unreadMessages', this.otherUserId(message.roomId)),
              {
                // after sending the message, the unread messages counter will be incremented
                // using increment method that is provided by firebase.
                countUnreadMessages: increment(1),
              },
              { merge: true },
            );
          }
        });
      } else {
        // if the message is not an image, that means it's a text ( String ).
        await addDoc(
          collection(db, 'convrsations', message.roomId, 'messages'),
          {
            body: message.content,
            convrsationId: message.roomId,
            created_at: moment().format(),
            sender_id: this.currentUserId.toString(),
            type: 'text',
          },
        );
        if (message.roomId === this.currentUserId.toString()) {
          await setDoc(
            doc(db, 'convrsations', message.roomId),
            {
              lastMessage: message.content,
              lastMessageDate: moment().format(),
              unreadMessagesMemberB: increment(1),
            },
            { merge: true },
          );
          await setDoc(
            doc(db, 'unreadMessages', 'admin'),
            {
              countUnreadMessages: increment(1),
            },
            { merge: true },
          );
        } else {
          await setDoc(
            doc(db, 'convrsations', message.roomId),
            {
              lastMessage: message.content,
              lastMessageDate: moment().format(),
              [unreadMessageMember]: increment(1),
            },
            { merge: true },
          );
          await setDoc(
            doc(db, 'unreadMessages', this.otherUserId(message.roomId)),
            {
              countUnreadMessages: increment(1),
            },
            { merge: true },
          );
        }
      }
    },
    // compareId() method determines if the first element of the String is equal to the id parameter.
    // it returns Boolean value.
    compareId(id) {
      // example 1: let as assume the admin id ( provider id ) is 113
      // const isAdmin = compareId('113-68');
      // since the admin id is in the first element of the String, it will return true.
      // example 2 : let as assume the admin id is 10
      // const isAdmin = compareId('30-10');
      // result : false
      // ======================================================================================
      // how does it work?
      // first, we need to split the id. it will return an array of two elements.
      // and then, we will have to compare the first element of the array with the currentUserId (provider id).
      // if the first element of the array is equal to the currentUserId (provider id), then the user is the provider.
      // otherwise, the currentUserId (provider id) is not the in first element of the array.
      const result = id.split('-')[0] === this.currentUserId.toString();
      // the result of the example will be true because the currentUserId (provider id) is equal to the first element of the array.
      return result;
    },
      // otherUserId() method returns the id of the other user ( where the user id is located in the String) .
    otherUserId(data) {
      // example 1: let as assume the admin id ( provider id ) is 113.
      // const isOtherUserId = otherUserId('113-68');
      // if the other user id is in the first element of the String, it will return true.
      // otherwise, it will return false.
      // result will be :  false

      // example 2: let as assume the admin id is 10.
      //const isOtherUserId = compareId('30-10');
      // result : true
      const array = data.split('-');
      return array.filter(id => id !== this.currentUserId.toString())[0];
    },
    // compareTo() method returns a string that contains
    // the id of the provider and the id of the user with '-' in between.
    //example : '113-68'
    compareTo(id) {
      // how this method works ?
      // first we need to compare the id that comes from the id parameter with the currentUserId (provider id).
      // NOTE : for more information about how localeCompare works, go to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
      // if the id that comes from the id parameter is greater than the currentUserId (provider id), then the provider id will be set to the first element of the String.
      return this.currentUserId.toString().localeCompare(id) > 0
        ? `${this.currentUserId}-${id}`
        : `${id}-${this.currentUserId}`;
    },
    // the member() method returns 'memberB' if the isAdmin variable is true
    // or 'memberA' if it's not 
    // isAdmin variable determines where the user id is and the provider id;
    // example : '113-68' now the compareId method will compare the id
    // that is passed to the function with the currentUserId which is the provider id.
    member(data) {
      const isAdmin = this.compareId(data.id);
      if (isAdmin) {
        return data.memberB;
      }
      return data.memberA;
    },
    unreadMessage(data) {
      const isAdmin = this.compareId(data.id);
      if (isAdmin) {
        return data.unreadMessagesMemberA;
      }
      return data.unreadMessagesMemberB;
    },
  },
  async created() {
    // if there is profile information, the following code will be executed.
    if (this.getProfileInfo != null) {
      // information of the provider
      this.admin = this.getProfileInfo;
      // id of the provider
      this.currentUserId = this.getProfileInfo.id;
      // get the users data from the database
      await this.getChat();
    }
  },
  async mounted() {
    moment.locale('en');
    document
      .querySelectorAll('.vac-svg-button')[0]
      .classList.add('chat-file-button');
    document
      .querySelectorAll('.vac-svg-button')[1]
      .classList.add('chat-send-button');
    const db = await getFirestore();
    // this code below fires up only when the provider clicks on the chat button
    // in order to add the user to the firebase
    // in ( Booking details -> userInfo ) .
    // src/components/pages/Bookings/UserInfo.vue
    if (this.$route.params.userInfo) {
      const roomId = this.compareTo(this.$route.params.userInfo.id.toString());
      const members = [
        this.$route.params.userInfo.id.toString(),
        this.currentUserId.toString(),
      ];
      const memberA = this.compareId(roomId) === true
        ? {
          id: this.currentUserId.toString(),
          name: this.admin.name,
          photo: this.admin.image,
        }
        : {
          id: this.$route.params.userInfo.id.toString(),
          name: this.$route.params.userInfo.name,
          photo: this.$route.params.userInfo.avatar,
        };
      const memberB = this.compareId(roomId) === true
        ? {
          id: this.$route.params.userInfo.id.toString(),
          name: this.$route.params.userInfo.name,
          photo: this.$route.params.userInfo.avatar,
        }
        : {
          id: this.currentUserId.toString(),
          name: this.admin.name,
          photo: this.admin.image,
        };
        
      await setDoc(
        doc(db, 'convrsations', roomId),
        {
          id: roomId,
          isAdminConvrsationWithCompany: true,
          isConvrsationWithAdmin: true,
          lastMessage: '',
          lastMessageDate: moment().format(),
          memberA,
          memberB,
          members,
          unreadMessagesMemberA: 0,
          unreadMessagesMemberB: 0,
        },
        { merge: true },
      );
    }
  },
};
</script> 

