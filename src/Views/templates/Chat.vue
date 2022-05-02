<template>
  <div class="relative">
    <div class="flex justify-center">
      <div v-if="chatStore.show_chats_menu" class="w-full lg:w-1/3">
        <slot name="chats_menu"></slot>
      </div>

      <div v-if="chatStore.selected" class="w-full lg:w-2/3 relative">
        <slot name="group_info" />


        <header
          class="sticky top-0 lg:p-4 h-16 lg:h-24 bg-stone-300 shadow-lg z-40"
          v-if="!chatStore.show_editor"
        >
          <slot name="header"></slot>
        </header>

        <perfect-scrollbar class="p-4 z-0 bg-stone-200" id="chat-container">
          <slot></slot>
        </perfect-scrollbar>

        <footer class="sticky bottom-0 lg:p-4 h-16 lg:h-24 bg-stone-300">
          <slot name="footer"></slot>
        </footer>

        <div
          class="absolute bottom-0 left-0 w-full top-0 bg-stone-200"
          v-if="chatStore.show_editor"
        >
          <slot name="editor"></slot>
        </div>
      </div>

      <div
        v-else
        class="
          w-full
          lg:w-2/3
          relative
          flex
          justify-center
          items-center
          bg-stone-200
        "
      >
        <h1 class="text-2xl">Select a chat to start messaging</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { ChatModel } from "@m/Chat";
import ChatController from "@c/ChatController";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
export default {
  components: {
    PerfectScrollbar,
  },
  data() {
    return {
      chatStore: ChatModel(),
      controller: new ChatController(),
    };
  },
  mounted() {
    window.addEventListener("resize", this.controller.reposition_dropdowns);
    this.controller.reposition_dropdowns();
  },
};
</script>
<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"/>

<style scoped>
.ps {
  height: calc(100vh - 8rem);
}
.image-editor {
  height: calc(100vh - 4rem);
}
@media (min-width: 1024px) {
  .ps {
    height: calc(100vh - 12rem);
  }
  .image-editor {
    height: calc(100vh - 6rem);
  }
}
</style>