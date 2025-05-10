import { createSlice } from "@reduxjs/toolkit";

const chatSlice =  createSlice({
    name: 'chat',
    initialState: {
        chatList:[],
        chatMessages:[],
        online_status:"Offline"
    },

    reducers :{

        addChatList: (state, actions) =>{
            state.chatList = actions.payload;
        },

        addFirstChat: (state, actions) =>{
            state.chatMessages = [...actions.payload,];
        },
        incrementUnreadCount: (state, action) => {
            const chat = state.chatList.find(c => c.id === action.payload.chatId);
            if (chat) chat.unread_count += 1;
        },
        updateChat:(state, action) =>{
            state.chatMessages = [...state.chatMessages, ...action.payload];
        },
        update_online_status: (state, action) => {
            state.online_status = action.payload
        },

        reset_chat_count: (state, action) => {
            const chat = state.chatList.find(c => c.id === action.payload.chatId);
            if (chat) chat.unread_count = 0;
        }
        

    }
});

export const {addChatList, addFirstChat, incrementUnreadCount, updateChat, update_online_status, reset_chat_count} = chatSlice.actions;

export default chatSlice.reducer