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
      <p class="font-bold text-lg">New Group</p>
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
    
    <!-- alphabetic list of contacts -->
  </div>
</template>

<script>
import ButtonIcon from "@/components/atoms/ButtonIcon.vue";
import FormControl from "@/components/molecules/input/FormControl.vue";
export default {
  name: "NewChat",
  components: {
    ButtonIcon,
    FormControl,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>