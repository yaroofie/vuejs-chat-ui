<template>
  <li class="border-b border-b-stone-400">
    <a
      class="flex items-center w-full lg:px-4 py-2 hover:bg-stone-300"
      :href="`#open-chat-${chat.id}`"
      @click.prevent="chatStore.selected = chat"
    >
      <div class="avatar">
        <div class="w-10 rounded-full">
          <img :src="chat.image" />
        </div>
      </div>
      <div class="mx-2 w-full">
        <p v-text="chat.subject" />
        <p v-text="chat.description" class="text-sm text-stone-500" />
      </div>
    </a>
  </li>
</template>

<script>
import Chat from "@/class/Chat";
import { useChat } from "@/stores/chat";
export default {
  props: {
    chat: {
      type: Chat,
    },
  },
  data() {
    return {
      chatStore: useChat(),
    };
  },
};
</script>