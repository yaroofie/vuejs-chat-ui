<template>
  <div class="z-40 absolute w-full h-full bg-stone-200">
    <header
      class="
        flex
        items-center
        lg:p-4
        h-16
        lg:h-24
        bg-stone-300
        shadow-lg
        mb-4
      "
    >
      <ButtonIcon
        icon="fa-arrow-left"
        rounded
        md
        class="btn-ghost mx-2"
        @click="$emit('cancel')"
      />
      <p class="font-bold text-lg">New Chat</p>
    </header>

    <!-- search -->
    <div class="flex flex-row justify-center items-center relative lg:px-4 mb-4">
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
    <!-- change new chat to new group button -->
    <div class="flex items-center lg:px-4 mb-4">
      <ButtonIcon
        icon="fa-exchange"
        rounded
        md
        class="btn-ghost"
        @click="$emit('new_group')"
      />
      <p class="text-lg border-b border-b-stone-400 w-full mx-2 pb-2">New Group</p>
    </div>

    <!-- alphabetic list of contacts -->
    <ul>
      <ContactItem
        v-for="contact in chat.contacts"
        :key="contact.id"
        :u="contact"
      />
    </ul>
  </div>
</template>

<script>
import ButtonIcon from "@/components/atoms/ButtonIcon.vue";
import FormControl from "@/components/molecules/input/FormControl.vue";
import ContactItem from "@/components/organisms/lists/Contact.vue";
import { useChat } from "@/stores/chat";
export default {
  name: "NewChat",
  components: {
    ButtonIcon,
    FormControl,
    ContactItem,
  },
  data() {
    return {
      chat: useChat(),
    };
  },
};
</script>

<style>
</style>