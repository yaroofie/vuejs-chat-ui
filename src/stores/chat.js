import { defineStore } from 'pinia'
import message from "@/class/Message.js";
export const useChat = defineStore({
  id: 'chat',
  state: () => ( {
    showEditor: false,
    editorFiles: [],
    messages: [
      new message(
        1,
        null,
        "info",
        "seen",
        "This group was created by the admin.",
        "23/3/2022",
        "9:00",
        null
      ),
      new message(
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
      new message(
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
      new message(
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
      new message(
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
      new message(
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
      new message(
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
      new message(
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
  }),
  getters: {
    
  },
  actions: {
    
  }
})
