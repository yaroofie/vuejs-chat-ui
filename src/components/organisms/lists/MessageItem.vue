<template>
  <div class="flex flex-wrap" :class="message.getPosition()">
    <!-- Date -->
    <div v-if="message.withDate" class="w-full text-center mb-4">
      <span class="p-2 text-sm rounded bg-slate-800 text-slate-200">
        {{ message.time }}
      </span>
    </div>
    <!-- informational section -->
    <p v-if="message.type == 'info'" class="w-full text-center mb-4">
      {{ message.message }}
    </p>
    <!-- normal message -->
    <div v-else class="mb-4 p-2 rounded shadow-lg" :class="messageClass">
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
      <div v-if="message._reply" class="p-2 rounded bg-slate-400">
        <div class="flex">
          <div class="w-1" :class="usernameClass(message._reply)" />
          <p
            v-text="message._reply.sender.username"
            class="mx-2"
          />
        </div>
        {{ message._reply.message }}
      </div>
      <!-- message -->
      {{ message.message }}
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
  computed: {
    messageClass() {
      let res = "";
      if (this.message.color) {
        // res += "bg-" + this.message.color;
        res += "bg-gray-300";
      }
      return res;
    },
  },
  methods:{
    usernameClass(message) {
      let res = "";
      if (message.color) {
        res += "bg-" + message.color;
      }
      return res;
    },

  }
};
</script>