<template>
  <div class="flex justify-between items-center">
    <!-- name , participants -->
    <div class="flex flex-col md:flex-row md:items-center p-2">
      <div class="avatar">
        <div class="w-10 md:w-12 rounded-full">
          <img :src="chat.selected.image" />
        </div>
      </div>
      <div class="mx-2 hidden md:block cursor-pointer" @click="$emit('group_info')">
        <!-- chat name -->
        <div class="text-lg font-bold">
          {{ chat.selected.subject }}
        </div>
        <!-- list of participants -->
        <div class="text-xs" v-if="chat.selected.type == 'group'">
          <a
            :href="`#user-${participant.id}`"
            v-for="(participant, index) in chat.selected.participants.filter(
              (p, i) => i < 3
            )"
            :key="index"
            :id="`participant-${index}`"
          >
            {{
              chat.selected.participants.filter((p, i) => i < 3).length ==
              index + 1
                ? participant.username
                : participant.username + " , "
            }}
          </a>
          <span v-if="chat.selected.participants.length > 3">...</span>
        </div>
        <!-- last seen -->
        <div class="text-xs" v-else-if="chat.selected.type == 'direct'">
          <span>
            last seen today at 3:45 AM
          </span>
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
import ButtonIcon from "@v/atoms/ButtonIcon.vue";
import FormControl from "@v/molecules/input/FormControl.vue";
import { ChatModel } from "@m/chat";
export default {
  name: "ChatHeader",
  components: {
    ButtonIcon,
    FormControl,
  },
  data() {
    return {
      chat: ChatModel(),
    };
  },
};
</script>