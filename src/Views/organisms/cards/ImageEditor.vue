<template>
  <div class="p-4 h-full flex flex-col justify-between">
    <!-- options -->
    <header class="flex justify-between mb-5">
      <ButtonIcon
        icon="fa-arrow-left"
        class="btn-ghost"
        md
        rounded
        @click="chat.show_editor = false"
      />
      <!-- for later -->
      <div class="flex justify-center">
        <ButtonIcon
          icon="fa-trash"
          class="btn-ghost text-red-500"
          md
          rounded
          @click="remove_visible_image()"
        />
        <ButtonIcon
          icon="fa-plus"
          class="btn-ghost"
          md
          rounded
          @click="add_another_image()"
        />
        <!-- <ButtonIcon
          icon="fa-xmark"
          class="btn-ghost"
          sm
          rounded
          @click="chat.show_editor = false"
        />
        <ButtonIcon
          icon="fa-xmark"
          class="btn-ghost"
          sm
          rounded
          @click="chat.show_editor = false"
        />
        <ButtonIcon
          icon="fa-xmark"
          class="btn-ghost"
          sm
          rounded
          @click="chat.show_editor = false"
        />
        <ButtonIcon
          icon="fa-xmark"
          class="btn-ghost"
          sm
          rounded
          @click="chat.show_editor = false"
        />
        <ButtonIcon
          icon="fa-xmark"
          class="btn-ghost"
          sm
          rounded
          @click="chat.show_editor = false"
        /> -->
      </div>
    </header>
    <!-- show images -->
    <div class="carousel w-full mb-5">
      <div
        v-for="(attachment, index) in chat.new_message.attachments"
        :key="`preview-${index}`"
        :id="`slide-${index}`"
        class="carousel-item relative w-full"
      >
        <img :src="attachment.src" class="w-full" />

        <div
          class="
            absolute
            flex
            justify-between
            transform
            -translate-y-1/2
            left-5
            right-5
            top-1/2
          "
        >
          <a
            :href="`#slide-${index - 1}`"
            @click="visible_image = index - 1"
            class="btn btn-circle btn-primary"
            :class="index - 1 >= 0 ? '' : 'invisible'"
            >❮</a
          >
          <a
            :href="`#slide-${index + 1}`"
            @click="visible_image = index + 1"
            class="btn btn-circle btn-primary"
            :class="
              index + 1 < chat.new_message.attachments.length ? '' : 'invisible'
            "
            >❯</a
          >
        </div>
      </div>
    </div>
    <!-- get caption and send -->
    <footer class="">
      <div class="flex justify-center items-center mb-5">
        <FormControl
          label=""
          placeholder="Type a message"
          class="w-1/2"
          v-model="chat.new_message.message"
          @keydown.enter="controller.send()"
          @keydown="changeType('text')"
        />
        <ButtonIcon
          icon="fa-paper-plane"
          rounded
          md
          class="mx-2"
          @click="controller.send()"
        />
      </div>
    </footer>
  </div>
</template>

<script>
import { ChatModel } from "@m/Chat";
import ChatController from "@c/ChatController";
import ButtonIcon from "@v/atoms/ButtonIcon.vue";
import FormControl from "@v/molecules/input/FormControl.vue";
export default {
  components: {
    ButtonIcon,
    FormControl,
  },
  data() {
    return {
      chat: ChatModel(),
      controller: new ChatController(),
      visible_image: 0,
    };
  },
  methods: {
    changeType(t) {
      this.chat.new_message.type = t;
    },
    remove_visible_image() {
      this.chat.new_message.attachments.splice(this.visible_image, 1);
      if(this.visible_image > 0) this.visible_image --;
      if(this.chat.new_message.attachments.length == 0) {
        this.chat.show_editor = false;
      }
    },
    add_another_image(){
      let element = document.getElementById("chat-file-input");
      if (element) element.click();
    }
  },
};
</script>
