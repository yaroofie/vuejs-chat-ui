<template>
  <div
    class="
      absolute
      w-full
      h-screen
      top-0
      bg-stone-200
      z-50
      px-5
      overflow-y-auto
    "
  >
    <!-- group info -->
    <div class="flex flex-col justify-center items-center pb-10">
      <div class="w-full p-2 flex justify-between items-center sticky top-0 bg-stone-200 z-40">
        <ButtonIcon
          icon="fa-arrow-left"
          class="btn-ghost"
          rounded
          xs
          @click="chat.show_info = false"
        />
        <div class="dropdown">
          <label
            :for="`chat-subject-update`"
            id="chat-subject-update-button"
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
            :id="`chat-subject-update`"
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
              <a
                @click.prevent="$emit('update_subject')"
                :href="`#update_subject`"
                >Update subject</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="avatar mb-4">
        <div class="w-40 rounded-full">
          <img src="https://api.lorem.space/image/movie?hash=omzulmdt" alt="" />
        </div>
      </div>
      <h1 class="mb-4 text-lg font-bold">
        {{ chat.subject }}
      </h1>
      <p class="text-sm text-gray-500">
        {{ chat.description }}
      </p>
    </div>
    <!-- Mute notifications -->
    <button class="text-gray-500 btn btn-block btn-ghost mb-4">
      <i class="fa-solid fa-bell"></i>
      <span class="mx-2"> Mute notifications </span>
    </button>
    <!-- participants -->
    <ul class="py-10">
      <li
        v-text="`${chat.participants.length} participants`"
        class="text-sm text-gray-500 mb-4"
      />
      <li
        v-for="(participant, index) in chat.participants"
        :key="`participant-${index}`"
        class="flex items-center mb-2"
      >
        <div class="avatar mr-2">
          <div class="w-10 rounded-full">
            <img
              :src="`https://api.lorem.space/image/face?hash=9231${index}`"
            />
          </div>
        </div>
        <div class="">
          <p v-text="participant.username" />
          <p class="text-sm text-gray-500" v-text="participant.about" />
        </div>
      </li>
    </ul>
    <!-- exit group -->
    <button class="text-red-500 btn btn-block btn-ghost mb-4">
      <i class="fa-solid fa-arrow-right-from-bracket"></i>
      <span class="mx-2"> Exit </span>
    </button>
    <!-- report group -->
    <button class="text-red-500 btn btn-block btn-ghost">
      <i class="fa-solid fa-thumbs-down"></i>
      <span class="mx-2"> Report group </span>
    </button>
  </div>
</template>

<script>
import { useChat } from "@/stores/chat";
import ButtonIcon from "@/components/atoms/ButtonIcon.vue";
export default {
  name: "ChatInfo",
  components: {
    ButtonIcon,
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
      let menu = document.getElementById(`chat-subject-update`);
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