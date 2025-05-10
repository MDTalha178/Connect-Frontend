import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFirstChat } from "../store/chatSlice";
import { GET_CHAT_MESSAGES } from "../utils/clientUrl";
import { API_CALL_METHOD } from "../utils/constant";
import { serverCall } from "../utils/client";
import { useNavigate } from "react-router-dom";
import { showToast } from "../component/Toast";

const useFirstChat = (chat_config_id) =>{
    const userChatlist = useSelector((store) => store.chat.chatList);
    const dispatch = useDispatch();
    const navigate = useNavigate();

     const getFirstUserChat = async (config_id) =>{
            const response = await serverCall(GET_CHAT_MESSAGES(config_id), API_CALL_METHOD.GET,{}, {}, true);
        
            try{
                if(response.status_code === 200){
                    dispatch(addFirstChat(response.data.data));
                }
                if(response?.status_code === 401) navigate('/login');
            }catch(e){
                if(response?.status_code === 400) showToast('Something went wrong', 'error');
            }
          }

    useEffect(() =>{


        if(chat_config_id){
            getFirstUserChat(chat_config_id)
        }else{
            if(userChatlist && userChatlist[0]){
                getFirstUserChat(userChatlist[0].id);
            }
        }

       

    }, [userChatlist])
}

export default useFirstChat;