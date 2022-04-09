<template>
  <Template>
    <ul class="p-0">
      <MessageItem
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
      />
    </ul>
    <template v-slot:footer>
      <ChatInput />
    </template>
  </Template>
</template>

<script>
import Template from "@/components/templates/Chat.vue";
import MessageItem from "@/components/organisms/lists/MessageItem.vue";
import ChatInput from "@/components/organisms/footer/ChatInput.vue";
export default {
  components: {
    Template,
    MessageItem,
    ChatInput,
  },
  data() {
    return {
      messages: [
        new message(
          1,
          null,
          "info",
          "seen",
          "This group was created by the admin.",
          "23/3/2022",
          "9:00",
          null
        ),
        new message(
          2,
          {
            id: 1,
            username: "user1",
            avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
          },
          "text",
          "seen",
          "Hello guys",
          "23/3/2022",
          "12:27",
          null
        ),
        new message(
          3,
          {
            id: 2,
            username: "user2",
            avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
          },
          "text",
          "seen",
          "Hello user1 how are you today ?",
          "23/3/2022",
          "15:40",
          null
        ),
        new message(
          4,
          {
            id: 1,
            username: "user1",
            avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
          },
          "text",
          "seen",
          "I'm fine thank you and you ?",
          "23/3/2022",
          "20:50",
          null
        ),
        new message(
          5,
          {
            id: 2,
            username: "user2",
            avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
          },
          "text",
          "seen",
          "fantastic",
          "23/3/2022",
          "23:03",
          null
        ),
        new message(
          6,
          {
            id: 4,
            username: "user4",
            avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
          },
          "text",
          "seen",
          "Hello guys",
          "24/3/2022",
          "9:45",
          null
        ),
        new message(
          7,
          {
            id: 4,
            username: "user4",
            avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
          },
          "text",
          "seen",
          "Do any of you guys have any idea about the new project ?",
          "24/3/2022",
          "11:34",
          null
        ),
        new message(
          8,
          {
            id: 5,
            username: "me",
            avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
          },
          "text",
          "seen",
          "I'm not sure",
          "24/3/2022",
          "12:00",
          7
        ),
      ],
      colors: ["red-300", "orange-300", "teal-300", "green-300"],
      username: "me",
    };
  },
  mounted() {
    this.addUiData();
  },
  watch: {
    messages: {
      handler(val) {
        this.addUiData();
      },
      deep: true,
    },
  },
  methods: {
    addUiData() {
      this.messages.forEach((message, index) => {
        // see if message should show date or not
        if (!this.messages.find((m, i) => m.date == message.date && m.withDate))
          message.withDate = true;
        if (message.type !== "info") {
          // add sender's color
          let lastOne = this.messages.find(
            (m, i) =>
              m.sender &&
              message.sender &&
              m.sender.id == message.sender.id &&
              m.color != ""
          );
          if (lastOne) {
            message.setColor(lastOne.color);
          } else {
            message.setColor(this.colors[0]);
            this.colors.splice(0, 1);
          }
          // don't show sender if the sender is me
          if (message.sender && message.sender.username == this.username) {
            message.isMe();
          }
          // don't show the sender if the last message is from the same sender
          if (
            index > 0 &&
            this.messages[index - 1].sender &&
            this.messages[index - 1].sender.id == message.sender.id
          ) {
            message.hideUser();
          }
          // add sender's message direction
          if (message.sender && message.sender.username == this.username)
            message.setPostion("justify-end");
          // add reply message
          if (message.reply) {
            message.setReply(this.messages.find((m) => m.id == message.reply));
          }
        }
      });
    },
  },
};
class message {
  id;
  sender;
  type;
  status;
  message;
  date;
  time;
  reply;
  color;
  _isMe = false;
  _hideUser = false;
  _position = "";
  _reply;

  constructor(id, sender, type, status, message, date,time, reply) {
    this.id = id;
    this.sender = sender;
    this.type = type;
    this.status = status;
    this.message = message;
    this.date = date;
    this.time = time;
    this.reply = reply;
    this.color = "";
  }

  setColor(color) {
    this.color = color;
  }

  isMe() {
    this._isMe = true;
  }

  hideUser() {
    this._hideUser = true;
  }

  setPostion(pos) {
    this._position = pos;
  }

  getPosition() {
    return this._position;
  }

  setReply(reply) {
    this._reply = reply;
  }
}
</script>