<template>
  <div class="p-4 h-full flex flex-col justify-between">
    <!-- options -->
    <div class="flex justify-between mb-5">
      <ButtonIcon
        icon="fa-xmark"
        class="btn-ghost"
        sm
        rounded
        @click="chat.showEditor = false"
      />
      <!-- for later -->
      <div class="flex justify-center" v-if="false">
        <ButtonIcon
          icon="fa-xmark"
          class="btn-ghost"
          sm
          rounded
          @click="chat.showEditor = false"
        />
        <ButtonIcon
          icon="fa-xmark"
          class="btn-ghost"
          sm
          rounded
          @click="chat.showEditor = false"
        />
        <ButtonIcon
          icon="fa-xmark"
          class="btn-ghost"
          sm
          rounded
          @click="chat.showEditor = false"
        />
        <ButtonIcon
          icon="fa-xmark"
          class="btn-ghost"
          sm
          rounded
          @click="chat.showEditor = false"
        />
        <ButtonIcon
          icon="fa-xmark"
          class="btn-ghost"
          sm
          rounded
          @click="chat.showEditor = false"
        />
        <ButtonIcon
          icon="fa-xmark"
          class="btn-ghost"
          sm
          rounded
          @click="chat.showEditor = false"
        />
        <ButtonIcon
          icon="fa-xmark"
          class="btn-ghost"
          sm
          rounded
          @click="chat.showEditor = false"
        />
      </div>
    </div>
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
            class="btn btn-circle btn-primary"
            :class="index - 1 >= 0 ? '' : 'invisible'"
            >❮</a
          >
          <a
            :href="`#slide-${index + 1}`"
            class="btn btn-circle btn-primary"
            :class="
              index + 1 < chat.new_message.attachments.length ? '' : 'invisible'
            "
            >❯</a
          >
        </div>
      </div>
    </div>
    <div class="">
      <!-- get caption -->
      <div class="flex justify-center items-center mb-5">
        <FormControl
          label=""
          placeholder="Type a message"
          class="w-1/2"
          v-model="chat.new_message.message"
          @keydown.enter="chat.send"
          @keydown="changeType('text')"
        />
        <ButtonIcon
          icon="fa-paper-plane"
          rounded
          md
          class="mx-2"
          @click="chat.send"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useChat } from "@/stores/chat";
import ButtonIcon from "@/components/atoms/ButtonIcon.vue";
import FormControl from "@/components/molecules/input/FormControl.vue";
export default {
  components: {
    ButtonIcon,
    FormControl,
  },
  data() {
    return {
      chat: useChat(),
    };
  },
  methods: {
    changeType(t) {
      this.chat.new_message.type = t;
    },
  },
};
</script>
