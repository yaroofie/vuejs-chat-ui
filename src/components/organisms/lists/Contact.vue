<template>
  <li class="flex items-center lg:px-4 mb-2">
    <div class="avatar">
      <div class="w-10 rounded-full">
        <img :src="u.avatar" />
      </div>
    </div>
    <div class="mx-2 border-b border-b-stone-400 w-full">
       <p v-text="u.username" />
       <p v-text="u.about" class="text-sm mb-2 text-stone-500" />
    </div>
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
  },
  data() {
    return {};
  },
};
</script>