<template>
  <header class="sticky top-0 lg:p-4 h-16 lg:h-24 bg-stone-300 shadow-lg">
    <!-- user avatar , new chat and options -->
    <div class="flex justify-between items-center">
      <!-- user avatar -->
      <div class="avatar p-2">
        <div class="w-10 md:w-12 rounded-full">
          <img src="https://api.lorem.space/image/face?hash=92310" />
        </div>
      </div>
      <!-- options -->
      <div class="">
        <ButtonIcon
          icon="fa-message"
          rounded
          xs
          class="btn-ghost mx-2"
          @click="$emit('new_chat')"
        />
        <div class="dropdown">
          <label
            :for="`chats-options`"
            id="chats-options-button"
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
            :id="`chats-options`"
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
              <a @click.prevent="$emit('new_group')" :href="`#new_group`"
                >New group</a
              >
            </li>
            <li>
              <a
                @click.prevent="$emit('starred_messages')"
                :href="`#starred_messages`"
                >Starred messages</a
              >
            </li>
            <li>
              <a @click.prevent="$emit('settings')" :href="`#settings`"
                >Settings</a
              >
            </li>
            <li>
              <a @click.prevent="$emit('log_out')" :href="`#log_out`"
                >Log out</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ButtonIcon from "@/components/atoms/ButtonIcon.vue";
import { useChat } from "@/stores/chat";
export default {
  name: "ChatHeader",
  components: {
    ButtonIcon,
  },
  data() {
    return {
      chat: useChat(),
    };
  },
};
</script>