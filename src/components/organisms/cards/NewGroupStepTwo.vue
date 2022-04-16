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
      <p class="font-bold text-lg">New Group</p>
    </header>

    <div class="flex flex-col items-center">
      <!-- group image -->
      <div class="avatar mb-4 cursor-pointer" @click="select_image()">
        <div class="w-40 rounded-full relative">
          <img
            :src="url ? url : placeholder"
            alt=""
            id="new_group_image"
          />
          <div
            class="
              absolute
              top-0
              left-0
              w-full
              h-full
              flex
              justify-center
              items-center
              font-bold
              group
              bg-stone-600
              bg-opacity-40
              hover:bg-opacity-80
            "
          >
            <span v-if="!image">
              Add group image
            </span>
            <span v-else class="hidden group-hover:block text-white">
              Change group image
            </span>
          </div>
          <input
            type="file"
            name="image"
            id="image"
            class="hidden"
            @change="get_image()"
          />
        </div>
      </div>

      <div class="w-full px-4">
        <FormControl
          v-model="subject"
          label=""
          placeholder="Group subject"
          inputClass="h-10"
        />
      </div>

      <div v-if="subject.length" class="w-full flex justify-center p-5">
        <ButtonIcon
          icon="fa-check"
          rounded
          md
          class="btn-primary"
          @click="create()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonIcon from "@/components/atoms/ButtonIcon.vue";
import FormControl from "@/components/molecules/input/FormControl.vue";
import ContactItem from "@/components/organisms/lists/Contact.vue";
import { useChat } from "@/stores/chat";
export default {
  name: "NewChatStepTwo",
  components: {
    ButtonIcon,
    FormControl,
    ContactItem,
  },
  props: {
    selected: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chat: useChat(),
      subject: "",
      image: null,
      placeholder : "https://www.gaithersburgdental.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png",
      url: "",
    };
  },
  methods: {
    create() {
      let payload = {
        type : "group",
        subject: this.subject,
        image: this.url,
        participants: this.selected,
      }
      this.chat.create(payload).then(r => {
        this.subject = "";
        this.image = null;
        this.url = "";
        this.$emit('cancel')
      });
    },
    select_image() {
      let input = document.getElementById("image");
      if (input) {
        input.click();
      }
    },
    get_image() {
      let input = document.getElementById("image");
      if (input) {
        this.image = input.files[0];
        if (this.image) {
          let reader = new FileReader();
          let self = this;
          reader.onload = function (e) {
            self.url = e.target.result;
          };
          reader.readAsDataURL(this.image);
        }
      }
    },
  },
};
</script>