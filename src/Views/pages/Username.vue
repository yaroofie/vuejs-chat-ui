<template>
  <div class="h-screen w-full flex justify-center items-center">
    <div class="w-1/2">
      <FormControl
        v-model="username"
        placeholder="Enter your name"
        label=""
        @keydown.enter="validate()"
        id="username"
        ref="username"
        :rules="['required']"
      />
    </div>
  </div>
</template>

<script>
import FormControl from "@v/molecules/input/FormControl.vue";
import ValidationController from "@c/ValidationController";
import UserController from "@c/UserController";
import { UserModel, User } from "@m/User";
export default {
  components: {
    FormControl,
  },
  data() {
    return {
      model: UserModel(),
      username: null,
    };
  },
  mounted() {
    let input = document.getElementsByTagName("input")[0];
    if (input) input.focus();
  },
  methods: {
    validate() {
      let v = new ValidationController();
      if (v.checkForms(this, ["username"])) {
        let controller = new UserController();

        let user = new User(
          this.model.all.length + 1,
          this.username,
          this.username + "@server.ir",
          "",
          "en",
          ""
        );

        controller
          .login(user)
          .then((r) => {
            this.$router.push({ name: "home" });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>