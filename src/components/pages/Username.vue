<template>
  <div class="h-screen w-full flex justify-center items-center">
    <div class="w-1/2">
      <FormControl
        v-model="user.username"
        placeholder="Enter your name"
        label=""
        @keydown.enter="$router.push('/')"
        id="username"
      />
    </div>
  </div>
</template>

<script>
import FormControl from "@/components/molecules/input/FormControl.vue";
import { useUser } from "@/stores/user";
export default {
  components: {
    FormControl,
  },
  data() {
    return {
      user: useUser(),
    };
  },
  mounted() {
      let input = document.getElementsByTagName("input")[0];
      if(input) input.focus();
  },
};
</script>