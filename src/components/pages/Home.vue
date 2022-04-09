<template>
  <Template>
    <ul class="p-0">
      <MessageItem
        v-for="(message, index) in chat.messages"
        :key="index"
        :message="message"
      />
    </ul>
    
    <template v-slot:footer>
      <ChatInput />
    </template>

    <template v-slot:editor>
      <ImageEditor />
    </template>
  </Template>
</template>

<script>
import Template from "@/components/templates/Chat.vue";
import MessageItem from "@/components/organisms/lists/MessageItem.vue";
import ChatInput from "@/components/organisms/footer/ChatInput.vue";
import ImageEditor from "@/components/organisms/cards/ImageEditor.vue"
import { useChat } from "@/stores/chat";
export default {
  components: {
    Template,
    MessageItem,
    ChatInput,
    ImageEditor,
  },
  data() {
    return {
      chat: useChat(),
      colors: ["red-300", "orange-300", "teal-300", "green-300","sky-300"],
      username: "me",
    };
  },
  mounted() {
    this.addUiData();
  },
  watch: {
    "chat.messages": {
      handler(val) {
        this.addUiData();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    addUiData() {
      this.chat.messages.forEach((message, index) => {
        // see if message should show date or not
        if (
          !this.chat.messages.find(
            (m, i) => m.date == message.date && m.withDate
          )
        )
          message.withDate = true;
        if (message.type !== "info") {
          // add sender's color
          if (message.color == "") {
            let lastOne = this.chat.messages.find(
              (m, i) =>
                m.sender &&
                message.sender &&
                m.sender.id == message.sender.id &&
                m.color != ""
            );
            if (lastOne) {
              message.setColor(lastOne.color);
            } else {
              let selected = this.colors[0];
              this.colors.splice(0, 1);
              message.setColor(selected);
            }
          }
          // don't show sender if the sender is me
          if (message.sender && message.sender.username == this.username) {
            message.isMe();
          }
          // don't show the sender if the last message is from the same sender
          if (
            index > 0 &&
            this.chat.messages[index - 1].sender &&
            this.chat.messages[index - 1].sender.id == message.sender.id
          ) {
            message.hideUser();
          }
          // add sender's message direction
          if (message.sender && message.sender.username == this.username)
            message.setPostion("justify-end");
          // add reply message
          if (message.reply) {
            message.setReply(
              this.chat.messages.find((m) => m.id == message.reply)
            );
          }
        }
      });
      setTimeout(() => {
        this.scrollToBottom("chat-container");
      }, 500);
    },
    scrollToBottom(id) {
      const element = document.getElementById(id);
      if (element) element.scrollTop = element.scrollHeight;
    },
  },
};
</script>