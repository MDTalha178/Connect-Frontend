import { useEffect } from "react"
import { USER_CHAT_LIST_URL } from "../utils/clientUrl";
import { API_CALL_METHOD } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addChatList } from "../store/chatSlice";
import { useNavigate } from "react-router-dom";
import { serverCall } from "../utils/client";
import { showToast } from "../component/Toast";

const userChatlist = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const getUserChatList = async () =>{
        const response = await serverCall(USER_CHAT_LIST_URL, API_CALL_METHOD.GET,{}, {}, true);
    
        try{
            if(response.status_code === 200){
                dispatch(addChatList(response.data.data));
            }
            if(response?.status_code === 401) navigate('/login');
        }catch(e){
            if(response?.status_code === 400) showToast('Something went wrong', 'error');
        }
      }

    useEffect(() =>{
        getUserChatList();
    }, []);
}

export default userChatlist;