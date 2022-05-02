import { defineStore } from "pinia";

const UserModel = defineStore({
  id: "UserModel",
  state: () => ({
    user: null,
    selected: null,
    all: [],
  } ),
});

class User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  about: string;
  lang: string;

  constructor(id, username, email, avatar, lang = "en", about = "") {
    this.id = id;
    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.about = about;
    this.lang = lang;
  }
}

export { User, UserModel };
