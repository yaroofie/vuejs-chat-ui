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
            v-model="text"
          />
          <!-- camera , file -->
          <div class="flex items-center absolute right-0">
            <ButtonIcon icon="fa-paperclip" rounded sm class="btn-ghost" />
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
        @mousedown="startVoiceRecord"
        @mouseup="stopVoiceRecord"
      />
    </div>
  </div>
</template>

<script>
import ButtonIcon from "@/components/atoms/ButtonIcon.vue";
import FormControl from "@/components/molecules/input/FormControl.vue";

export default {
  name: "ChatInput",
  components: {
    ButtonIcon,
    FormControl,
  },
  data() {
    return {
      supportsVoice: false,
      mediaRecorder: null,
      voiceChunks: [],

      text: "",
    };
  },
  methods: {
    startVoiceRecord() {
      let self = this;
      navigator.mediaDevices
        .getUserMedia(
          // constraints - only audio needed for this app
          {
            audio: true,
          }
        )

        // Success callback
        .then(function (stream) {
          self.mediaRecorder = new MediaRecorder(stream);
          self.mediaRecorder.start();
          console.log(self.mediaRecorder.state);
          console.log("recorder started");
          self.voiceChunks = [];

          self.mediaRecorder.ondataavailable = function (e) {
            self.voiceChunks.push(e.data);
          };
        })

        // Error callback
        .catch(function (err) {
          console.log("The following getUserMedia error occurred: " + err);
        });
    },
    stopVoiceRecord() {
      this.mediaRecorder.stop();
      console.log(this.mediaRecorder.state);
      console.log("recorder stopped");
      const blob = new Blob(this.voiceChunks, {
        type: "audio/ogg; codecs=opus",
      });
      const audioURL = window.URL.createObjectURL(blob);
      console.log(audioURL);
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