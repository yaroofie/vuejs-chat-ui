<template>
  <div class="absolute w-full h-screen top-0 bg-stone-200 z-50 overflow-y-auto">
    <!-- group info -->
    <div class="">
      <header
        class="
          sticky
          top-0
          w-full
          lg:p-4
          h-16
          lg:h-24
          bg-stone-300
          shadow-lg
          mb-4
        "
      >
        <div class="flex justify-between items-center p-2">
          <div class="flex items-center">
            <ButtonIcon
              icon="fa-arrow-left"
              class="btn-ghost"
              rounded
              md
              @click="chat.show_info = false"
            />
            <span v-if="chat.selected.type == 'group'" v-text="`Group Info`" />
            <span
              v-if="chat.selected.type == 'direct'"
              v-text="`Contact Info`"
            />
          </div>
          <div class="dropdown" v-if="chat.selected.type == 'group'">
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
      </header>
      <div class="flex flex-col justify-center items-center p-5 pb-10">
        <!-- chat image -->
        <div class="avatar mb-4">
          <div class="w-40 rounded-full">
            <img :src="chat.selected.image" alt="" />
          </div>
        </div>
        <!-- chat subject and description -->
        <h1 class="mb-4 text-lg font-bold">
          {{ chat.selected.subject }}
        </h1>
        <!-- group description -->
        <div class="w-1/2 mb-4" v-if="chat.selected.type == 'group'">
          <div v-if="!chat.selected.description && !editing">
            <p class="text-sm text-gray-600 flex justify-between items-center">
              Add group description
              <ButtonIcon
                icon="fa-pencil"
                rounded
                xs
                class="btn-ghost"
                @click="editing = true"
              />
            </p>
          </div>
          <p
            class="text-sm text-gray-500 flex justify-between items-center"
            v-else-if="!editing"
          >
            {{ chat.selected.description }}
            <ButtonIcon
              icon="fa-pencil"
              rounded
              xs
              class="btn-ghost"
              @click="editing = true"
            />
          </p>
          <div class="relative" v-else>
            <FormControl
              v-model="description"
              placeholder="Add group description"
              class="h-12"
              label=""
              @keydown.enter="update_description()"
              id="chat-description-update"
            />
            <ButtonIcon
              icon="fa-pencil"
              rounded
              sm
              class="btn-ghost absolute top-0 right-0 m-2"
              @click="update_description()"
            />
          </div>
        </div>
        <!-- contact about -->
        <div v-if="chat.selected.type == 'direct'" class="">
          <p class="text-sm text-gray-600 mb-4">
            {{ chat.selected.participants[0].about }}
          </p>
        </div>
        <!-- Mute notifications -->
        <button class="text-gray-500 btn btn-block btn-ghost mb-4">
          <i class="fa-solid fa-bell"></i>
          <span class="mx-2"> Mute notifications </span>
        </button>
        <!-- participants -->
        <ul class="py-10 w-full" v-if="chat.selected.type == 'group'">
          <li
            v-text="`${chat.selected.participants.length} participants`"
            class="text-sm text-gray-500 mb-4"
          />
          <!-- add participants -->
          <li class="mb-2">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <ButtonIcon icon="fa-plus" rounded sm class="btn-ghost mx-1" />
                <span class="text-sm text-gray-500">Add participants</span>
              </div>
            </div>
          </li>
          <!-- list of participants -->
          <li
            v-for="(participant, index) in chat.selected.participants"
            :key="`participant-${index}`"
            class="flex items-center mb-2"
          >
            <div class="avatar mr-2">
              <div class="w-10 rounded-full">
                <img :src="participant.avatar" />
              </div>
            </div>
            <div class="">
              <p v-text="participant.username" />
              <p class="text-sm text-gray-500" v-text="participant.about" />
            </div>
          </li>
        </ul>
        <!-- exit group -->
        <button
          class="text-red-500 btn btn-block btn-ghost mb-4"
          v-if="chat.selected.type == 'group'"
        >
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
          <span class="mx-2"> Exit </span>
        </button>
        <!-- report group -->
        <button class="text-red-500 btn btn-block btn-ghost mb-4" v-if="chat.selected.type == 'group'">
          <i class="fa-solid fa-thumbs-down"></i>
          <span class="mx-2"> Report group </span>
        </button>
        <!-- block contact -->
        <button class="text-red-500 btn btn-block btn-ghost mb-4" v-if="chat.selected.type == 'direct'">
          <i class="fa-solid fa-ban"></i>
          <span class="mx-2"> Block {{ chat.selected.participants[0].username }} </span>
        </button>
        <!-- report contact -->
        <button class="text-red-500 btn btn-block btn-ghost mb-4" v-if="chat.selected.type == 'direct'">
          <i class="fa-solid fa-thumbs-down"></i>
          <span class="mx-2"> Report {{ chat.selected.participants[0].username }} </span>
        </button>
        <!-- delete chat -->
        <button class="text-red-500 btn btn-block btn-ghost mb-4" v-if="chat.selected.type == 'direct'">
          <i class="fa-solid fa-trash"></i>
          <span class="mx-2"> Delete chat </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ChatModel } from "@m/chat";
import ChatController from "@c/ChatController";
import ButtonIcon from "@v/atoms/ButtonIcon.vue";
import FormControl from "@v/molecules/input/FormControl.vue";
export default {
  name: "ChatInfo",
  components: {
    ButtonIcon,
    FormControl,
  },
  data() {
    return {
      chat: ChatModel(),
      controller: new ChatController(),
      editing: false,
      description: "",
    };
  },
  methods: {
    update_description() {
      this.editing = false;
      this.chat.selected.description = this.description;
      this.description = "";
    },
  },
};
</script>