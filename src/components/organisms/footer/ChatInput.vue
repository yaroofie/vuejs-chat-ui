<template>
  <div class="flex items-center relative">
    <!-- typing status -->
    <div class="w-full absolute bottom-full px-4 py-1 bg-slate-50" v-if="typing != ''">
      <p class="text-sm">
        {{ typing }}
      </p>
    </div>
    <!-- reply -->
    <div
      class="w-full absolute bottom-full p-4 bg-slate-200 rounded-md"
      v-if="chat.new_message.reply"
    >
      <div class="flex justify-between">
        <div class="flex">
          <div class="w-1" :class="'bg-' + chat.new_message._reply.color" />
          <p v-text="chat.new_message._reply.sender.username" class="mx-2" />
        </div>
        <ButtonIcon icon="fa-xmark" rounded xs class="btn-ghost" @click="noReply()"/>
      </div>
      {{ chat.new_message._reply.message }}
    </div>
    <!-- emoji , text , camera , file -->
    <div class="w-full">
      <div class="rounded-full flex justify-between items-center">
        <!-- emoji , text -->
        <div class="w-full flex justify-between items-center relative">
          <!-- <ButtonIcon
            icon="fa-smile"
            rounded
            sm
            class="mx-1 btn-ghost absolute"
          /> -->
          <div class="p-4 pt-0 absolute flex justify-center items-center">
            <DiscordPicker
              @click="replaceEmojiPicker()"
              @emoji="setEmoji"
              @gif="setGif"
              apiKey="378ODGII6ULF"
            />
          </div>
          <FormControl
            label=""
            placeholder="Message"
            class="w-full"
            input-class="px-20"
            v-model="chat.new_message.message"
            @keydown.enter="chat.send"
            @keydown="changeType('text')"
          />
          <!-- camera , file -->
          <div class="flex items-center absolute right-0">
            <ButtonIcon
              icon="fa-paperclip"
              rounded
              sm
              class="btn-ghost"
              @click="selectFile()"
            />
            <input
              type="file"
              name="file"
              id="chat-file-input"
              @change="getFile"
              class="hidden"
              multiple
            />
            <ButtonIcon icon="fa-camera" rounded sm class="mx-1 btn-ghost" />
          </div>
        </div>
      </div>
    </div>
    <!-- voice -->
    <div class="mx-2 flex justify-center" v-if="supportsVoice">
      <ButtonIcon
        icon="fa-microphone"
        rounded
        md
        id="chat-voice-button"
        @mousedown="startVoiceRecord"
        @mouseup="stopVoiceRecord"
        @mouseleave="stopVoiceRecord"
      />
    </div>
  </div>
</template>

<script>
import ButtonIcon from "@/components/atoms/ButtonIcon.vue";
import FormControl from "@/components/molecules/input/FormControl.vue";
import DiscordPicker from "vue3-discordpicker";
import { useChat } from "@/stores/chat";
export default {
  name: "ChatInput",
  components: {
    ButtonIcon,
    DiscordPicker,
    FormControl,
  },
  data() {
    return {
      chat: useChat(),
      supportsVoice: false,
      mediaRecorder: null,
      voiceChunks: [],
      emoji: "",
      typing : "",
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
    setEmoji(emoji) {
      this.chat.new_message.message += emoji;
    },
    setGif(gif) {
      this.chat.new_message.attachments.push({
        src: gif,
        file: null,
        type: "image",
      });
    },
    noReply(){
      this.chat.new_message._reply = null;
      this.chat.new_message.reply = null;
    },
    async captureMediaDevices() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      return stream;
    },
    async startVoiceRecord() {
      const stream = await this.captureMediaDevices();
      this.mediaRecorder = new MediaRecorder(stream);
      this.voiceChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.voiceChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.voiceChunks, {
          type: "audio/mp3;codecs=opus",
        });
        this.voiceChunks = [];
        const blobUrl = URL.createObjectURL(blob);
        this.chat.new_message.attachments.push({
          type: "audio",
          file: blob,
          src: blobUrl,
        });
      };

      this.mediaRecorder.start(200);
    },
    stopVoiceRecord() {
      if (!this.mediaRecorder) return;
      this.mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      this.chat.send();
    },
    changeType(t) {
      this.chat.new_message.type = t;
    },
    selectFile() {
      let element = document.getElementById("chat-file-input");
      if (element) element.click();
    },
    getFile(e) {
      if (e) {
        let element = document.getElementById("chat-file-input");
        if (!element) return;
        let files = element.files;
        if (files.length === 0)
          console.log("No files currently selected for upload");
        else {
          for (var index = 0; index < files.length; index++) {
            let file = files[index];
            let type = "";
            if (this.imageTypes.includes(file.type)) type = "image";
            else if (this.audioTypes.includes(file.type)) type = "audio";
            if (this.validFileType(file)) {
              const imageURL = window.URL.createObjectURL(file);
              this.chat.new_message.attachments.push({
                src: imageURL,
                file: file,
                type: type,
              });
            } else
              console.log(
                `File name ${file.name}: Not a valid file type. Update your selection.`
              );
          }
          // show editor if there is an attachment
          if (this.chat.new_message.attachments.length) {
            this.chat.showEditor = true;
          }
        }
      }
    },
    validFileType(file) {
      return (
        this.imageTypes.includes(file.type) ||
        this.audioTypes.includes(file.type)
      );
    },
    replaceEmojiPicker() {
      let element = document.querySelector(".vue3-discord-emojipicker");
      if (!element) return;
      element.classList.remove("right-0");
    },
  },
  watch: {
    "chat.new_message.reply": {
      handler(val) {
        if (val) {
          console.log("reply", val);
        }
      },
    },
  },
  mounted() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
      this.supportsVoice = true;

    setInterval(() => {
      this.typing = "user is typing ..."
      setTimeout(() => {
        this.typing = "";
      }, 5000);
    }, 10000);
  },
};
</script>