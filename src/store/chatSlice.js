import { createSlice } from "@reduxjs/toolkit";

const chatSlice =  createSlice({
    name: 'chat',
    initialState: {
        chatList:[],
        chatMessages:[],
        online_status:"Offline",
        chat_config_id: null
    },

    reducers :{

        addChatList: (state, actions) =>{
            state.chatList = actions.payload;
        },

        addFirstChat: (state, actions) =>{
            state.chatMessages = [...actions.payload,];
        },
        incrementUnreadCount: (state, action) => {
            const chatIndex = state.chatList.findIndex(c => c.id === action.payload.chatId);
            if (chatIndex !== -1) {
                const chat = state.chatList[chatIndex];
                chat.unread_count += 1;
                if (chat.last_message) {
                chat.last_message.message = action.payload.last_message;
                }
                // Remove from current index
                state.chatList.splice(chatIndex, 1);
                // Add to top
                state.chatList.unshift(chat);
            }

        },
        updateChat:(state, action) =>{
            state.chatMessages = [...state.chatMessages, ...action.payload.message];
            const chatIndex = state.chatList.findIndex(c => c.id === action.payload.config_id);
            if(chatIndex != -1){
                const chat = state.chatList[chatIndex];
                state.chatList.splice(chatIndex, 1);
                state.chatList.unshift(chat);
            }


        },
        update_online_status: (state, action) => {
            state.online_status = action.payload
        },

        reset_chat_count: (state, action) => {
            const chat = state.chatList.find(c => c.id === action.payload.chatId);
            if (chat) chat.unread_count = 0;
            if (chat && chat.last_message) chat.last_message.message = null;
        },
        create_chat : (state, action) =>{
            state.chat_config_id = action.payload.chat_config_id
        },

        update_mute_chat: (state, action) =>{
            const chatIndex = state.chatList.findIndex(c => c.id == action.payload.chat_config);

            if(chatIndex != -1){
                const chat = state.chatList[chatIndex]
                chat.is_chat_mute = action.payload
            }
        },
        

    }
});

export const {
    addChatList, addFirstChat, 
    incrementUnreadCount, 
    updateChat, 
    update_online_status, 
    reset_chat_count,
    create_chat,
    update_mute_chat

} = chatSlice.actions;

export default chatSlice.reducer