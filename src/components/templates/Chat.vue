<template>
  <div class="container mx-auto relative">
    <header class="sticky top-0 lg:p-4 h-16 lg:h-24">
      <slot name="header"></slot>
    </header>
    <perfect-scrollbar class="p-4" id="chat-container">
      <slot></slot>
    </perfect-scrollbar>
    <footer class="sticky bottom-0 lg:p-4 h-16 lg:h-24">
      <slot name="footer"></slot>
    </footer>
    <div
      class="absolute bottom-0 left-0 w-full image-editor bg-gray-500 bg-opacity-80"
      v-if="chat.showEditor"
    >
      <slot name="editor"></slot>
    </div>
  </div>
</template>

<script>
import { useChat } from "@/stores/chat";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
export default {
  data() {
    return {
      chat: useChat(),
    };
  },
  components: {
    PerfectScrollbar,
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