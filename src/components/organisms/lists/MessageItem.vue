<template>
  <div
    class="flex flex-wrap"
    :class="message.getPosition()"
    :id="`#chat-message-${message.id}`"
  >
    <!-- Date -->
    <div v-if="message.withDate" class="w-full text-center mb-4">
      <span class="p-2 text-sm rounded bg-slate-800 text-slate-200">
        {{ message.date }}
      </span>
    </div>
    <!-- informational section -->
    <p v-if="message.type == 'info'" class="w-full text-center mb-4">
      {{ message.message }}
    </p>
    <!-- normal message -->
    <div
      v-else
      class="mb-4 p-2 rounded shadow-lg bg-gray-300"
      :class="message._isMe ? 'bg-lime-200' : ''"
    >
      <!-- sender -->
      <div class="flex">
        <div class="w-1" :class="usernameClass(message)" />
        <p
          v-if="!message._isMe && !message._hideUser"
          v-text="message.sender.username"
          class="mx-2"
        />
      </div>
      <!-- reply -->
      <router-link
        :to="`#chat-message-${message.reply}`"
        v-if="message._reply"
        class="p-2 rounded block bg-slate-400"
      >
        <div class="flex">
          <div class="w-1" :class="usernameClass(message._reply)" />
          <p v-text="message._reply.sender.username" class="mx-2" />
        </div>
        {{ message._reply.message }}
      </router-link>
      <!-- attachments -->
      <div class="flex flex-wrap" v-if="message.attachments">
        <div
          v-for="(attachment, index) in message.attachments"
          :key="index"
          class="mx-1 max-w-sm"
        >
          <img
            v-if="attachment.type == 'image'"
            :src="attachment.src"
            alt=""
            class="w-full mb-1"
          />
          <audio v-else-if="attachment.type == 'audio'" id="audio" controls>
            <source :src="attachment.src" />
          </audio>
        </div>
      </div>
      <!-- message content -->
      <div class="" v-if="message.message">
        <!-- link -->
        <a
          v-if="
            message.message.includes('http') || message.message.includes('www.')
          "
          :href="message.message.indexOf('http') === 0 ? message.message : `http://${message.message}`"
          class="btn-link"
          target="_blank"
        >
          {{ message.message }}
        </a>
        <!-- text -->
        <p v-else>
          {{ message.message }}
        </p>
      </div>
      <!-- time and status -->
      <div class="px-2 flex justify-end">
        <span class="text-xs" :class="message._isMe ? 'mx-2' : ''">
          {{ message.time }}
        </span>
        <span v-if="message._isMe" class="text-xs">
          <i v-if="message.status == ''" class="text-gray-400 fa-solid fa-check"></i>
          <i v-if="message.status == 'seen'" class="text-green-400 fa-solid fa-check-double"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
    },
  },
  data() {
    return {
      imageTypes: [
        "image/apng",
        "image/bmp",
        "image/gif",
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/webp",
        "image/x-icon",
      ],
      audioTypes: ["audio/mpeg", "audio/ogg", "audio/mp3"],
    };
  },
  methods: {
    usernameClass(message) {
      let res = "";
      if (message.color) {
        res += "bg-" + message.color;
      }
      return res;
    },
    getFileSource(file) {
      return URL.createObjectURL(file);
    },
  },
};
</script>