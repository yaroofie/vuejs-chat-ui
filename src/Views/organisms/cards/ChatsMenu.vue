<template>
  <div class="h-screen bg-stone-200 border-r border-r-stone-400 relative">
    <!-- new chat -->
    <NewChat
      @cancel="show_form = ''"
      @new_group="show_form = 'new group'"
      v-show="show_form == 'new chat'"
      style="z-index: 55"
    />
    <!-- new group -->
    <NewGroup
      @cancel="show_form = ''"
      @new_chat="show_form = 'new chat'"
      @next_step="stepTwo"
      v-show="show_form == 'new group'"
      style="z-index: 55"
    />
    <!-- next step -->
    <NewGroupStepTwo
      @cancel="show_form = ''"
      @create="create()"
      v-show="show_form == 'new group step 2'"
      style="z-index: 55"
      :selected="selected"
    />
    <!-- chats header -->
    <ChatsHeader
      class="mb-4 z-50"
      @new_chat="show_form = 'new chat'"
      @new_group="show_form = 'new group'"
    />

    <!-- search -->
    <div
      class="flex flex-row justify-center items-center relative lg:px-4 mb-4"
    >
      <FormControl
        type="text"
        class="w-full"
        label=""
        inputClass="h-10 mb-0"
        placeholder="Search"
      />
      <ButtonIcon
        icon="fa-magnifying-glass"
        rounded
        sm
        class="btn-ghost mx-5 mt-1 absolute right-0"
      />
    </div>

    <!-- chats list -->
    <ul>
      <ChatItem
        v-for="(chat, index) in chatStore.chats"
        :key="`chat-${index}`"
        :chat="chat"
        :class="
          chatStore.selected && chatStore.selected.id == chat.id
            ? 'bg-stone-300'
            : ''
        "
      />
    </ul>
  </div>
</template>

<script>
import ChatsHeader from "@v/organisms/header/Chats.vue";
import NewChat from "@v/organisms/cards/NewChat.vue";
import NewGroup from "@v/organisms/cards/NewGroup.vue";
import NewGroupStepTwo from "@v/organisms/cards/NewGroupStepTwo.vue";
import ChatItem from "@v/organisms/lists/ChatItem.vue";
import ButtonIcon from "@v/atoms/ButtonIcon.vue";
import FormControl from "@v/molecules/input/FormControl.vue";
import { ChatModel } from "@m/chat";
export default {
  components: {
    ChatsHeader,
    FormControl,
    ButtonIcon,
    NewChat,
    ChatItem,
    NewGroup,
    NewGroupStepTwo,
  },
  data() {
    return {
      chatStore: ChatModel(),
      show_form: "",
      selected: [],
    };
  },
  methods: {
    stepTwo(selected) {
      this.show_form = "new group step 2";
      this.selected = selected;
    },
    create() {
      console.log("creating ...");
    },
  },
};
</script>