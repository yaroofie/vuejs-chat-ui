<template>
  <div class="h-screen bg-stone-200 border-r border-r-stone-400 relative">
    <!-- new chat -->
    <NewChat
      @cancel="show_form = ''"
      @new_group="show_form = 'new group'"
      v-if="show_form == 'new chat'"
      style="z-index: 55"
    />
    <!-- new group -->
    <NewGroup
      @cancel="show_form = ''"
      @new_chat="show_form = 'new chat'"
      v-if="show_form == 'new group'"
      style="z-index: 55"
    />
    <!-- chats header -->
    <ChatsHeader
      class="mb-4 z-50"
      @new_chat="show_form = 'new chat'"
      @new_group="show_form = 'new group'"
    />

    <!-- search -->
    <div class="flex flex-row justify-center items-center relative lg:px-4 mb-4">
      <FormControl
        type="text"
        class="w-full"
        label=""
        inputClass="h-10 mb-0"
        placeholder="Search"
      />
      <ButtonIcon
        icon="fa-magnifying-glass"
        rounded
        sm
        class="btn-ghost mx-5 mt-1 absolute right-0"
      />
    </div>

    <!-- chats list -->
    <ul>
      <ChatItem
        v-for="(chat, index) in chatStore.chats"
        :key="`chat-${index}`"
        :chat="chat"
        :class="chatStore.selected && chatStore.selected.id == chat.id ? 'bg-stone-300' : ''"
      />
    </ul>
  </div>
</template>

<script>
import ChatsHeader from "@/components/organisms/header/Chats.vue";
import NewChat from "@/components/organisms/cards/NewChat.vue";
import NewGroup from "@/components/organisms/cards/NewGroup.vue";
import ChatItem from "@/components/organisms/lists/ChatItem.vue";
import ButtonIcon from "@/components/atoms/ButtonIcon.vue";
import FormControl from "@/components/molecules/input/FormControl.vue";
import { useChat } from "@/stores/chat";
export default {
  components: {
    ChatsHeader,
    FormControl,
    ButtonIcon,
    NewChat,
    ChatItem,
    NewGroup,
  },
  data() {
    return {
      chatStore: useChat(),
      show_form: "",
    };
  },
};
</script>