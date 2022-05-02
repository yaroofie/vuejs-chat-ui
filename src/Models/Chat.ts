import { defineStore } from "pinia";
import { User } from "./User";

const ChatModel = defineStore({
  id: "chatStore",
  state: () => ({
    show_editor: false,
    show_info: false,
    show_chats_menu: true,
    new_message: new Message(
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
    ),
    new_chat: new Chat(null, "", "", "", "", [], []),
    chats: [
      new Chat(
        1,
        "group",
        "Programmers",
        "https://api.lorem.space/image/face?hash=cfs45lce",
        "This is a programmer group chat",
        [
          new User(
            1,
            "Alireza",
            "user1@server.com",
            "https://api.lorem.space/image/face?hash=cfsbiler",
            "I am a programmer"
          ),
          new User(
            2,
            "Mohammad",
            "mohammad@server.com",
            "https://api.lorem.space/image/face?hash=cfsbdgce",
            "I am a programmer"
          ),
        ]
      ),
      new Chat(
        2,
        "direct",
        "Mr. Robot",
        "https://api.lorem.space/image/face?hash=cfsbilce",
        "",
        [
          new User(
            3,
            "Mr. Robot",
            "Robot@server.com",
            "https://api.lorem.space/image/face?hash=cfsbilce",
            "I am a chatbot"
          ),
        ]
      ),
    ],
    contacts: [
      new User(
        1,
        "Alireza",
        "user1@server.com",
        "https://api.lorem.space/image/face?hash=cfsbiler",
        "I am a programmer"
      ),
      new User(
        2,
        "Mohammad",
        "mohammad@server.com",
        "https://api.lorem.space/image/face?hash=cfsbdgce",
        "I am a programmer"
      ),
      new User(
        3,
        "Mr. Robot",
        "Robot@server.com",
        "https://api.lorem.space/image/face?hash=cfsbilce",
        "I am a chatbot"
      ),
    ],
    selected: null,
  }),
});

class Chat {
  id: number;
  type: string;
  subject: string;
  image: string;
  description: string;
  participants: Array<User>;
  messages: Array<Message>;

  constructor(
    id: number,
    type: string,
    subject: string,
    image: string,
    description = null,
    participants = [],
    messages = []
  ) {
    this.id = id;
    this.type = type;
    this.subject = subject;
    this.image = image;
    this.description = description;
    this.participants = participants;
    this.messages = messages;
  }
}

class Message {
  id: number;
  sender: User;
  type: string;
  status: string;
  message: string;
  date: string;
  time: string;
  reply: number;
  attachments: Array<any>;
  color;

  _isMe = false;
  _hideUser = false;
  _position = "";
  _reply;

  constructor(
    id,
    sender,
    type,
    status,
    message,
    date,
    time,
    reply,
    attachments = []
  ) {
    this.id = id;
    this.sender = sender;
    this.type = type;
    this.status = status;
    this.message = message;
    this.date = date;
    this.time = time;
    this.reply = reply;
    this.color = "";
    this.attachments = attachments;
  }

  setColor(color) {
    this.color = color;
  }

  isMe() {
    this._isMe = true;
  }

  hideUser() {
    this._hideUser = true;
  }

  setPostion(pos) {
    this._position = pos;
  }

  getPosition() {
    return this._position;
  }

  setReply(reply) {
    if (reply.id) this.reply = reply.id;
    this._reply = reply;
  }
}

export { Chat, Message, ChatModel };
