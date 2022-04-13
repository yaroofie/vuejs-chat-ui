<template>
  <Template class="overflow-hidden">
    <template v-slot:group_info>
      <ChatInfo v-if="chat.show_info" />
    </template>

    <template v-slot:header>
      <ChatHeader @group_info="show_group_info()" />
    </template>

    <template v-slot:chats_menu>
      <ChatsMenu />
    </template>

    <ul class="p-0">
      <MessageItem
        v-for="(message, index) in chat.selected.messages"
        :key="index"
        :message="message"
        @reply="reply(message)"
        @remove="remove(message)"
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
import ChatHeader from "@/components/organisms/header/Chat.vue";
import ChatInput from "@/components/organisms/footer/ChatInput.vue";
import ImageEditor from "@/components/organisms/cards/ImageEditor.vue";
import ChatsMenu from "@/components/organisms/cards/ChatsMenu.vue";
import ChatInfo from "@/components/organisms/cards/ChatInfo.vue";
import { useChat } from "@/stores/chat";
export default {
  components: {
    Template,
    ChatInfo,
    ChatHeader,
    ChatsMenu,
    MessageItem,
    ChatInput,
    ImageEditor,
  },
  data() {
    return {
      chat: useChat(),
      colors: ["#e71717", "#4a8bed", "#08d31b", "#ee4422", "#9492f1"],
      username: "me",
    };
  },
  mounted() {
    this.addUiData();
  },
  watch: {
    "chat.selected": {
      handler(val) {
        if (val) {
          this.addUiData();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    reply(message) {
      this.chat.new_message.reply = message.id;
      this.chat.new_message._reply = message;
    },
    remove(message) {
      this.chat.remove(message);
    },
    addUiData() {
      if(!this.chat.selected) return;
      this.chat.selected.messages.forEach((message, index) => {
        // see if message should show date or not
        if (
          !this.chat.selected.messages.find(
            (m, i) => m.date == message.date && m.withDate
          )
        )
          message.withDate = true;
        if (message.type !== "info") {
          // add sender's color
          if (message.color == "") {
            let lastOne = this.chat.selected.messages.find(
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
            this.chat.selected.messages[index - 1].sender &&
            this.chat.selected.messages[index - 1].sender.id == message.sender.id
          ) {
            message.hideUser();
          }
          // add sender's message direction
          if (message.sender && message.sender.username == this.username)
            message.setPostion("justify-end");
          // add reply message
          if (message.reply) {
            message.setReply(
              this.chat.selected.messages.find((m) => m.id == message.reply)
            );
          }
        }
      });
      setTimeout(() => {
        this.chat.reposition_dropdowns();
        this.scrollToBottom("chat-container");
      }, 500);
    },
    scrollToBottom(id) {
      const element = document.getElementById(id);
      if (element) element.scrollTop = element.scrollHeight;
    },
    show_group_info(){
      this.chat.show_info = true;
      setTimeout(() => {
        this.chat.reposition_dropdowns()
      }, 500);
    }
  },
};
</script>