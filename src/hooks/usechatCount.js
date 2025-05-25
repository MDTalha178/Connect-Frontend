import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { reset_chat_count } from "../store/chatSlice";

export const useChatCount = (config_id) =>{
    const dispatch = useDispatch();


    useEffect(() =>{
        dispatch(reset_chat_count({chatId: config_id}));
    },[config_id]);
}