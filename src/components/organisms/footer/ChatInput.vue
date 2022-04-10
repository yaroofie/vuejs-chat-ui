<template>
  <div class="flex items-center">
    <!-- emoji , text , camera , file -->
    <div class="w-full">
      <div class="rounded-full flex justify-between items-center">
        <!-- emoji , text -->
        <div class="w-full flex justify-between items-center relative">
          <ButtonIcon
            icon="fa-smile"
            rounded
            sm
            class="mx-1 btn-ghost absolute"
          />
          <FormControl
            label=""
            placeholder="Message"
            class="w-full"
            input-class="pl-10"
            v-model="p.message"
            @keydown.enter="submit"
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
import Message from "@/class/Message.js";
import { useChat } from "@/stores/chat";
export default {
  name: "ChatInput",
  components: {
    ButtonIcon,
    FormControl,
  },
  data() {
    return {
      chat: useChat(),

      supportsVoice: false,
      mediaRecorder: null,
      voiceChunks: [],

      p: {
        id: null,
        sender: {
          id: 5,
          username: "me",
          avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
        },
        type: "",
        status: "",
        message: null,
        date: null,
        time: null,
        reply: null,
        attachments: [],
      },

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
  mounted() {},
  methods: {
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
        this.p.attachments.push({
          type: "audio",
          src: blobUrl,
        })
      };

      this.mediaRecorder.start(200);
    },
    stopVoiceRecord() {
      if (!this.mediaRecorder) return;
      this.mediaRecorder.stream.getTracks().forEach((track) => track.stop())
    },
    submit() {
      this.p.date = this.getFormatedDate();
      this.p.time = this.getFormatedTime();

      let payload = new Message(
        this.p.id,
        this.p.sender,
        this.p.type,
        this.p.status,
        this.p.message,
        this.p.date,
        this.p.time,
        this.p.reply,
        this.p.attachments
      );
      this.chat.messages.push(payload);
      this.reset();
    },
    reset() {
      this.p = {
        id: null,
        sender: {
          id: 5,
          username: "me",
          avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
        },
        type: "",
        status: "",
        message: null,
        date: null,
        time: null,
        reply: null,
        attachments: [],
      };
    },
    getFormatedDate() {
      let date = new Date();
      let fullYear = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let response = day + "/" + month + "/" + fullYear;
      return response;
    },
    getFormatedTime() {
      let date = new Date();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let response = hour + ":" + minutes;
      return response;
    },
    changeType(t) {
      this.p.type = t;
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
              this.p.attachments.push({
                src: imageURL,
                type: type,
              });
            } else
              console.log(
                `File name ${file.name}: Not a valid file type. Update your selection.`
              );
          }
          // show editor if there is an attachment
          if (this.p.attachments.length) {
            this.chat.showEditor = true;
            this.chat.editorFiles = files;
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
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
      this.supportsVoice = true;
  },
};
</script>