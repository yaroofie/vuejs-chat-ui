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
      class="mb-4 p-2 rounded shadow-lg bg-stone-300 relative"
      :class="message._isMe ? 'bg-stone-300' : ''"
    >
      <div class="flex justify-between">
        <!-- sender -->
        <div class="flex">
          <div
            class="w-1"
            v-if="!message._isMe && !message._hideUser"
            :class="'bg-' + message.color"
          />
          <p
            v-text="message.sender.username"
            class="mx-2"
            v-if="!message._isMe && !message._hideUser"
          />
        </div>
        <!-- options -->
        <div v-if="message.type != 'info'" class="dropdown">
          <label
            :for="`message-${message.id}`"
            :id="`message-option-${message.id}`"
            class="btn btn-circle btn-ghost btn-xs"
          >
            <ButtonIcon
              icon="fa-ellipsis-vertical"
              rounded
              xs
              class="btn-ghost"
            />
          </label>
          <ul
            :id="`message-${message.id}`"
            class="
              menu
              dropdown-content
              p-2
              shadow
              bg-base-100
              rounded-box
              absolute
              w-52
              mt-4
            "
            :class="menuPosition"
          >
            <li>
              <a @click.prevent="$emit('reply')" :href="`#reply-${message.id}`"
                >Reply</a
              >
            </li>
            <li>
              <a
                @click.prevent="$emit('reply_privately')"
                :href="`#reply_privately-${message.id}`"
                >Reply privately</a
              >
            </li>
            <li>
              <a
                @click.prevent="$emit('forward')"
                :href="`#forward-${message.id}`"
                >Forward message</a
              >
            </li>
            <li>
              <a @click.prevent="$emit('star')" :href="`#star-${message.id}`"
                >Star message</a
              >
            </li>
            <li>
              <a
                @click.prevent="$emit('remove')"
                :href="`#remove-${message.id}`"
                >Delete message</a
              >
            </li>
            <li>
              <a
                @click.prevent="$emit('direct')"
                :href="`#direct-${message.id}`"
                v-if="message.sender.username !== 'me'"
                >Message {{ message.sender.username }}</a
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- reply -->
      <router-link
        :to="`#chat-message-${message.reply}`"
        v-if="message._reply"
        class="m-2 mt-0 rounded block bg-slate-400 overflow-hidden"
      >
        <div class="flex">
          <div class="w-1" :class="'bg-' + message._reply.color" />
          <p v-text="message._reply.sender.username" class="mx-2" />
        </div>
        {{ message._reply.message }}
      </router-link>
      <!-- attachments -->
      <div class="flex flex-wrap" v-if="message.attachments">
        <div
          v-for="(attachment, index) in message.attachments"
          :key="index"
          class="m-2 mt-0 max-w-sm"
        >
          <img
            v-if="attachment.type == 'image'"
            :src="attachment.src"
            alt=""
            class="w-full"
          />
          <audio v-else-if="attachment.type == 'audio'" id="audio" controls>
            <source :src="attachment.src" />
          </audio>
          <video v-else-if="attachment.type == 'video'" id="video" controls>
            <source :src="attachment.src" />
          </video>
        </div>
      </div>
      <!-- message content -->
      <div class="m-2 mt-0" v-if="message.message">
        <!-- link -->
        <a
          v-if="
            message.message.includes('http') || message.message.includes('www.')
          "
          :href="
            message.message.indexOf('http') === 0
              ? message.message
              : `http://${message.message}`
          "
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
      <div class="p-2 pb-0 flex justify-end">
        <span class="text-xs" :class="message._isMe ? 'mx-2' : ''">
          {{ message.time }}
        </span>
        <span v-if="message._isMe" class="text-xs">
          <i
            v-if="message.status == ''"
            class="text-gray-400 fa-solid fa-check"
          ></i>
          <i
            v-if="message.status == 'seen'"
            class="text-green-400 fa-solid fa-check-double"
          ></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonIcon from "@/components/atoms/ButtonIcon.vue";
export default {
  name: "MessageItem",
  components: {
    ButtonIcon,
  },
  props: {
    message: {
      type: Object,
    },
  },
  data() {
    return {
      menuPosition: "",
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
  mounted() {
    window.addEventListener("resize", this.resize);
    this.resize();
  },
  methods: {
    resize(e){
      console.log("window resize");
      let menu = document.getElementById(`message-${this.message.id}`);
      if(!menu) return;
      let rect = menu.getBoundingClientRect();
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;

      if(rect.x + rect.width > windowWidth){
        this.menuPosition += " right-0 ";
      }
      if(rect.y + rect.height > windowHeight){
        this.menuPosition += " bottom-0 ";
      }
    },
    getFileSource(file) {
      return URL.createObjectURL(file);
    },
  },
};
</script>