import { defineStore } from 'pinia';
import Message from "@/class/Message.js";
import Chat from "@/class/Chat.js";
import User from "@/class/User.js";
export const useChat = defineStore( {
  id: 'chatStore',
  state: () => ( {
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
      [],
    ),
    new_chat: new Chat(
      null,
      "",
      "",
      "",
      "",
      [],
      [],
    ),
    chats: [
      new Chat(
        1,
        "group",
        "Programmers",
        "https://api.lorem.space/image/face?hash=cfsbilce",
        "This is a programmer group chat",
        [
          {
            id: 1,
            username: "Alireza",
            about: "I am a programmer",
          },
          {
            id: 2,
            username: "Mohammad",
            about: "I am a programmer",
          }
        ]
      ),
      new Chat(
        2,
        "group",
        "Traders",
        "https://api.lorem.space/image/face?hash=cfs2il42",
        "These are traders",
        [
          {
            id: 1,
            username: "Ali Sotude",
            about: "I am a trader",
          },
          {
            id: 3,
            username: "Sadegh ghadamgahi",
            about: "I am a trader aswell",
          }
        ]
      ),
    ],
    contacts: [
      new User(
        1,
        "Alireza",
        "user1@server.com",
        "https://api.lorem.space/image/face?hash=cfsbilce",
        "I am a programmer",
      ),
      new User(
        2,
        "Mohammad",
        "mohammad@server.com",
        "https://api.lorem.space/image/face?hash=cfsbilce",
        "I am a programmer",
      ),
      new User(
        3,
        "Mr. Robot",
        "Robot@server.com",
        "https://api.lorem.space/image/face?hash=cfsbilce",
        "I am a chatbot",
      ),
    ],
    selected: null,
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
      this.new_chat = new Chat(
        null,
        "",
        "",
        "",
        "",
        [],
        [],
      );
      this.show_editor = false;
      this.show_info = false;
      this.show_chats_menu = true;
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
      this.new_message.id = this.selected.messages.length + 1;
      this.selected.messages.push( this.new_message );
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
      let index = this.selected.messages.indexOf( message );
      if ( index < 0 ) return;
      this.selected.messages.splice( index, 1 );
    },
    reposition_dropdowns ()
    {
      let dropdowns = document.getElementsByClassName( `dropdown-content` );
      if ( dropdowns.length == 0 ) return;
      for ( let i = 0; i < dropdowns.length; i++ )
      {
        let dropdown = dropdowns[ i ];
        let rect = dropdown.getBoundingClientRect();
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        if ( rect.x + rect.width > windowWidth )
        {
          dropdown.classList.add( "right-0" );
        }
        if ( rect.y + rect.height > windowHeight )
        {
          dropdown.classList.add( "bottom-0" );
        }
      }
    },
  }
} );
