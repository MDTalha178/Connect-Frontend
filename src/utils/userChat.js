import { showToast } from "../component/Toast";
import { serverCall } from "./client";
import { CHAT_ACTION_URL, GET_CHAT_MESSAGES } from "./clientUrl";
import { API_CALL_METHOD } from "./constant";
import { toasMessage } from "./toastMessage";
import { chatActionType } from "./utils";

export const getUserChat = async (config_id) =>{
    const response = await serverCall(GET_CHAT_MESSAGES(config_id), API_CALL_METHOD.GET,{}, {}, true);
          
    try{
        if(response.status_code === 200){
            return response
        }

    }catch(e){
        if(response?.status_code === 400) showToast('Something went wrong', 'error');
     }
}

export const chatAction = async (action_type, chatItem, data={}) =>{
    const action = chatActionType(action_type, chatItem);

    const response = await serverCall(CHAT_ACTION_URL[action], API_CALL_METHOD.POST,{
        target_user_id:chatItem.profile.id,
        chat_config:chatItem.id,
        ...data
    }, {}, true, {success: toasMessage.success[action]});

    try{
        if(response.status_code == 400 && response?.data?.chat_pin){
            if(response?.data?.chat_pin){
                 showToast(response?.data.chat_pin[0] || 'Unbale To set Chat Pin right now please try after some time', 'error')
            } else{
            showToast(response?.message || 'Unbale To set Chat Pin right now please try after some time', 'error')
        }
           
        }
       
        return response;

    }catch(e){
        showToast('Something Went wrong', 'error')
    }
}