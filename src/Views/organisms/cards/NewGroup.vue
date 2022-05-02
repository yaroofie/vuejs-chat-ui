<template>
  <div class="z-40 absolute w-full h-full bg-stone-200">
    <header
      class="flex items-center lg:p-4 h-16 lg:h-24 bg-stone-300 shadow-lg mb-4"
    >
      <ButtonIcon
        icon="fa-arrow-left"
        rounded
        md
        class="btn-ghost mx-2"
        @click="$emit('cancel')"
      />
      <p class="font-bold text-lg">Add group participants</p>
    </header>

    <ul class="mb-3">
      <li
        v-for="contact in chat.contacts.filter((c) => selected.includes(c.id))"
        :key="`selected-${contact.id}`"
        class="inline-flex items-center mx-2 bg-stone-400 p-1 px-2 rounded-lg cursor-pointer"
        @click="select(contact.id)"
      >
        <img :src="contact.avatar" class="inline rounded-full w-8 h-8" />
        <span class="mx-2">
          {{ contact.username }}
        </span>
        <i class="fa-solid fa-times"></i>
      </li>
    </ul>

    <!-- search -->
    <div
      class="flex flex-row justify-center items-center relative lg:px-4 mb-4"
    >
      <FormControl
        type="text"
        class="w-full"
        label=""
        inputClass="h-10 mb-0"
        v-model="search"
        placeholder="Search"
      />
      <ButtonIcon
        icon="fa-magnifying-glass"
        rounded
        sm
        class="btn-ghost mx-5 mt-1 absolute right-0"
      />
    </div>

    <ul :class="selected.length ? 'pb-10' : ''"> 
      <!-- list of contacts -->
      <ContactItem
        v-for="contact in chat.contacts
          .filter((c) =>
            c.username.toLowerCase().startsWith(search.toLowerCase())
          )
          .filter((c) => !selected.includes(c.id))"
        :key="contact.id"
        :u="contact"
        :selected="selected.includes(contact.id)"
        @click="select(contact.id)"
      />
    </ul>

    <div v-if="selected.length" class="absolute bottom-0 w-full flex justify-center p-5">
      <ButtonIcon icon="fa-arrow-right" rounded md class="btn-primary" @click="next_step()"/>
    </div>
  </div>
</template>

<script>
import ButtonIcon from "@v/atoms/ButtonIcon.vue";
import FormControl from "@v/molecules/input/FormControl.vue";
import ContactItem from "@v/organisms/lists/Contact.vue";
import { ChatModel } from "@m/chat";
import ChatController from "@c/ChatController";
export default {
  name: "NewChat",
  components: {
    ButtonIcon,
    FormControl,
    ContactItem,
  },
  data() {
    return {
      chat: ChatModel(),
      controller: new ChatController(),
      search: "",
      selected: [],
    };
  },
  methods: {
    select(id) {
      if (!this.selected.includes(id)) this.selected.push(id);
      else this.selected = this.selected.filter((i) => i !== id);
    },
    next_step(){
      this.$emit('next_step',this.selected);
      this.search = "";
      this.selected = [];
    }
  },
};
</script>