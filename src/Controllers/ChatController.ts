import { Chat, Message, ChatModel } from "../Models/Chat";
import { User } from "../Models/User";
export default class {
  model = ChatModel();

  reset() {
    this.model.new_message = new Message(
      null,
      {
        id: 5,
        username: "me",
        avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
      },
      "",
      "",
      "",
      null,
      null,
      null,
      []
    );
    this.model.new_chat = new Chat(null, "", "", "", "", [], []);
    this.model.show_editor = false;
    this.model.show_info = false;
    this.model.show_chats_menu = true;
  }

  create(payload) {
    return new Promise((resolve, reject) => {
      this.model.chats.push(
        new Chat(
          this.model.chats.length + 1,
          payload.type,
          payload.subject,
          payload.image,
          "",
          this.model.contacts.filter((c: User) =>
            payload.participants.includes(c)
          ),
          []
        )
      );
      this.model.selected = this.model.chats[this.model.chats.length - 1];
      this.reset();
      resolve(null);
    });
  }

  send() {
    return new Promise( ( resolve, reject ) =>
    {
      if (
        !this.model.new_message.message &&
        this.model.new_message.attachments.length == 0
      )
        return;
      this.model.new_message.date = this.getFormatedDate();
      this.model.new_message.time = this.getFormatedTime();
      this.model.new_message.id = this.model.selected.messages.length + 1;
      this.model.selected.messages.push(this.model.new_message);
      this.reset();
      this.reposition_dropdowns();
      resolve(null);
    });
  }

  getFormatedDate() {
    let date = new Date();
    let fullYear = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let response = day + "/" + month + "/" + fullYear;
    return response;
  }

  getFormatedTime() {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let response = hour + ":" + minutes;
    return response;
  }

  remove(message: Message) {
    console.log("removing the message");
    let index = this.model.selected.messages.indexOf(message);
    if (index < 0) return;
    this.model.selected.messages.splice(index, 1);
  }

  reposition_dropdowns() {
    let dropdowns = document.getElementsByClassName(`dropdown-content`);
    if (dropdowns.length == 0) return;
    for (let i = 0; i < dropdowns.length; i++) {
      let dropdown = dropdowns[i];
      let rect = dropdown.getBoundingClientRect();
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;

      if (rect.x + rect.width > windowWidth) {
        dropdown.classList.add("right-0");
      }
      if (rect.y + rect.height > windowHeight) {
        dropdown.classList.add("bottom-0");
      }
    }
  }
}
