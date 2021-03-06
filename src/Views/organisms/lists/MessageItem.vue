<template>
  <div
    class="flex flex-wrap"
    :class="message.getPosition()"
    :id="`chat-message-${message.id}`"
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
      class="mb-4 p-2 rounded-lg shadow-lg bg-slate-100 relative"
      :class="message._isMe ? '' : ''"
    >
      <div class="flex justify-between">
        <!-- sender -->
        <div class="flex">
          <p
            v-text="message.sender.username"
            class="mx-2"
            :style="`color:${message.color}`"
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
          >
            <li>
              <a @click.prevent="emit('reply')" :href="`#reply-${message.id}`"
                >Reply</a
              >
            </li>
            <li>
              <a
                @click.prevent="emit('reply_privately')"
                :href="`#reply_privately-${message.id}`"
                >Reply privately</a
              >
            </li>
            <li>
              <a
                @click.prevent="emit('forward')"
                :href="`#forward-${message.id}`"
                >Forward message</a
              >
            </li>
            <li>
              <a @click.prevent="emit('star')" :href="`#star-${message.id}`"
                >Star message</a
              >
            </li>
            <li>
              <a @click.prevent="emit('remove')" :href="`#remove-${message.id}`"
                >Delete message</a
              >
            </li>
            <li>
              <a
                @click.prevent="emit('direct')"
                :href="`#direct-${message.id}`"
                v-if="message.sender.username !== 'me'"
                >Message {{ message.sender.username }}</a
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- reply -->
      <a
        :href="`#chat-message-${message.reply}`"
        v-if="message._reply"
        class="p-2 mt-0 rounded block bg-stone-300 overflow-hidden"
      >
        <p
          v-text="message._reply.sender.username"
          :style="`color:${message._reply.color}`"
        />
        <p>
          {{ message._reply.message }}
        </p>
      </a>
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
            class="text-stone-600 fa-solid fa-check"
          ></i>
          <i
            v-if="message.status == 'seen'"
            class="text-stone-600 fa-solid fa-check-double"
          ></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonIcon from "@v/atoms/ButtonIcon.vue";
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
    emit(option) {
      this.$emit(option);
      let FormControl = document.getElementById(`chat-input`);
      if (FormControl) {
        let input = FormControl.querySelector(`input`);
        if (input) {
          input.focus();
        }
      }
    },
  },
};
</script>