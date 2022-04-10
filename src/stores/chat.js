import { defineStore } from 'pinia';
import Message from "@/class/Message.js";
export const useChat = defineStore( {
  id: 'chat',
  state: () => ( {
    showEditor: false,
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
      [],
    ),
    messages: [
      new Message(
        1,
        null,
        "info",
        "seen",
        "This group was created by the admin.",
        "23/3/2022",
        "9:00",
        null
      ),
      new Message(
        2,
        {
          id: 1,
          username: "user1",
          avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
        },
        "text",
        "seen",
        "Hello guys",
        "23/3/2022",
        "12:27",
        null
      ),
      new Message(
        3,
        {
          id: 2,
          username: "user2",
          avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
        },
        "text",
        "seen",
        "Hello user1 how are you today ?",
        "23/3/2022",
        "15:40",
        null
      ),
      new Message(
        4,
        {
          id: 1,
          username: "user1",
          avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
        },
        "text",
        "seen",
        "I'm fine thank you and you ?",
        "23/3/2022",
        "20:50",
        null
      ),
      new Message(
        5,
        {
          id: 2,
          username: "user2",
          avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
        },
        "text",
        "seen",
        "fantastic",
        "23/3/2022",
        "23:03",
        null
      ),
      new Message(
        6,
        {
          id: 4,
          username: "user4",
          avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
        },
        "text",
        "seen",
        "Hello guys",
        "24/3/2022",
        "9:45",
        null
      ),
      new Message(
        7,
        {
          id: 4,
          username: "user4",
          avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
        },
        "text",
        "seen",
        "Do any of you guys have any idea about the new project ?",
        "24/3/2022",
        "11:34",
        null
      ),
      new Message(
        8,
        {
          id: 5,
          username: "me",
          avatar: "https://api.lorem.space/image/face?hash=cfsbilce",
        },
        "text",
        "seen",
        "I'm not sure",
        "24/3/2022",
        "12:00",
        7
      ),
    ]
  } ),
  getters: {

  },
  actions: {
    reset ()
    {
      this.new_message = new Message(
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
        [],
      );
      this.showEditor = false;
    },
    send ()
    {
      if (
        !this.new_message.message &&
        this.new_message.attachments.length == 0
      )
        return;
      this.new_message.date = this.getFormatedDate();
      this.new_message.time = this.getFormatedTime();
      this.new_message.id = this.messages.length + 1;
      this.messages.push( this.new_message );
      this.reset();
    },
    getFormatedDate ()
    {
      let date = new Date();
      let fullYear = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let response = day + "/" + month + "/" + fullYear;
      return response;
    },
    getFormatedTime ()
    {
      let date = new Date();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let response = hour + ":" + minutes;
      return response;
    },
    remove ( message )
    {
      if ( !message instanceof Message ) return;
      console.log( "removing the message" );
      let index = this.messages.indexOf( message );
      if(index < 0 ) return;
      this.messages.splice( index, 1 );
    }
  }
} );
