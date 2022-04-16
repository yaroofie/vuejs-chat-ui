<template>
  <li class="border-b border-b-stone-400">
    <a
      class="flex items-center w-full lg:px-4 py-2 hover:bg-stone-300"
      :class="selected ? 'bg-stone-400' : ''"
      :href="`#select-user-${u.id}`"
    >
      <div class="avatar">
        <div class="w-10 rounded-full">
          <img :src="u.avatar" />
        </div>
      </div>
      <div class="mx-2 w-full">
        <p v-text="u.username" />
        <p v-text="u.about" class="text-sm text-stone-500" />
      </div>
    </a>
  </li>
</template>

<script>
import User from "@/class/User";
export default {
  name: "ContactItem",
  props: {
    u: {
      type: User,
      required: true,
    },
    selected:{
      type: Boolean,
    }
  },
  data() {
    return {};
  },
};
</script>