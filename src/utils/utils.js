import { CHAT_ACTION_MODAL, CHAT_ACTION_TYPE, toasMessage } from "./toastMessage";

export const scrollToBottom = (messagesEndRef) => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


export const chatActionType = (action_type, chatItem) =>{
  if(action_type == 'mute'){
    if(chatItem?.is_chat_mute?.chat_mute){
      return CHAT_ACTION_TYPE.Umute
    }else{
      return CHAT_ACTION_TYPE.Mute
    }
  }
  else if(action_type == 'pin'){
    return CHAT_ACTION_TYPE.ChatPin
  }
  else{
    return CHAT_ACTION_TYPE.Block
  }
}

export const getToastMessageForChatAction = (action_type, chatItem) =>{

  const action= chatActionType(action_type, chatItem);
  return toasMessage.success[action]
}

export const getChatActionModalText = (action_type, chatItem) =>{
   const action = chatActionType(action_type, chatItem);
   return CHAT_ACTION_MODAL[action]

}
  