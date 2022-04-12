<template>
  <div class="flex justify-between items-center">
    <!-- name , participants -->
    <div class="flex flex-col md:flex-row md:items-center p-2">
      <div class="avatar">
        <div class="w-10 md:w-16 rounded-full">
          <img src="https://api.lorem.space/image/face?hash=92310" />
        </div>
      </div>
      <div class="mx-2 hidden md:block">
        <!-- chat name -->
        <div class="text-lg font-bold">
          {{ chat.subject }}
        </div>
        <!-- list of participants -->
        <div class="text-xs">
          <a
            :href="`users/${participant.id}`"
            v-for="(participant, index) in chat.participants.filter(
              (p, i) => i < 3
            )"
            :key="index"
            class="mr-2"
          >
            {{ participant.username }}
          </a>
          <span v-if="chat.participants.length > 3">...</span>
        </div>
      </div>
    </div>
    <!-- search , options -->
    <div class="flex flex-row-reverse items-center p-2">
      <div class="dropdown">
        <label
          :for="`chat-info`"
          id="chat-info-button"
          class="btn btn-circle btn-ghost btn-xs"
        >
          <ButtonIcon
            icon="fa-ellipsis-vertical"
            rounded
            xs
            class="btn-ghost"
          />
        </label>
        <!-- dropdown menu -->
        <ul
          :id="`chat-info`"
          class="
            menu
            dropdown-content
            p-2
            shadow
            bg-base-100
            rounded-box
            absolute
            top-8
            w-52
          "
          :class="menuPosition"
        >
          <li>
            <a @click.prevent="$emit('group_info')" :href="`#group_info`"
              >Group info</a
            >
          </li>
          <li>
            <a @click.prevent="$emit('group_media')" :href="`#group_media`"
              >Group media</a
            >
          </li>
          <li>
            <a
              @click.prevent="$emit('mute_notifications')"
              :href="`#mute_notifications`"
              >Mute notifications</a
            >
          </li>
          <li>
            <a @click.prevent="$emit('exit')" :href="`#exit-`">Exit group</a>
          </li>
        </ul>
      </div>
      <!-- search -->
      <div class="flex flex-row items-center relative mx-2">
        <FormControl
          type="text"
          class="w-full md:w-80"
          label=""
          inputClass="h-10 mb-0"
          placeholder="Search"
        />
        <ButtonIcon
          icon="fa-magnifying-glass"
          rounded
          xs
          class="btn-ghost mx-2 absolute right-0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonIcon from "@/components/atoms/ButtonIcon.vue";
import FormControl from "@/components/molecules/input/FormControl.vue";
import { useChat } from "@/stores/chat";
export default {
  name: "ChatHeader",
  components: {
    ButtonIcon,
    FormControl,
  },
  data() {
    return {
      chat: useChat(),
      menuPosition: "",
    };
  },
  mounted() {
    window.addEventListener("resize", this.resize);
    this.resize();
  },
  methods: {
    resize(e) {
      let menu = document.getElementById(`chat-info`);
      if (!menu) return;
      let rect = menu.getBoundingClientRect();
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;

      if (rect.x + rect.width > windowWidth) {
        this.menuPosition += " right-0 ";
      }
      if (rect.y + rect.height > windowHeight) {
        this.menuPosition += " bottom-0 ";
      }
    },
  },
};
</script>