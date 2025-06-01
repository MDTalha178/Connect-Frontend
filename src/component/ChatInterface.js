import { useEffect, useState } from "react";
import userChatlist from "../hooks/useChatList";
import ChatWindow from "./ChatWindow";
import Sidebar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { serverCall } from "../utils/client";
import { addFirstChat, incrementUnreadCount, update_online_status } from "../store/chatSlice";
import { showToast } from "./Toast";
import { API_CALL_METHOD } from "../utils/constant";
import { GET_CHAT_MESSAGES, GLOBAL_WEBSCOCKET_BASE_URL } from "../utils/clientUrl";
import { useNavigate } from "react-router-dom";
import ChatStarter from "./ChatStarter"
import { getUserCredentials } from "../utils/localStorage";
import { VerifyChatPin } from "./VerifyChatPin";

export const ChatInterface = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    userChatlist();

    const [roomId, setRoomId] = useState('');
    const [chatConfig, setChatConfig] = useState('');
    const [senderId, setsenderID] = useState('');
    const [reciverId, setrecieverID] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [online_status, setonline_status] = useState('');
    const [showChatPin, setshowChatPin] = useState(false);
    const [showChatPinIndex, setshowChatPinIndex] = useState(null);
    

    const getUserChat = async (config_id) =>{
      const response = await serverCall(GET_CHAT_MESSAGES(config_id), API_CALL_METHOD.GET,{}, {}, true);
          
      try{
        if(response.status_code === 200){
          dispatch(addFirstChat(response.data.data));
          dispatch(update_online_status(response?.data?.online_status))
          setRoomId(response?.data?.chat_config?.chat_room_name);
        }
        if(response?.status_code === 401) navigate('/login');

        }catch(e){
            if(response?.status_code === 400) showToast('Something went wrong', 'error');
        }
      }


    
    useEffect(() =>{
      const socket = new WebSocket(GLOBAL_WEBSCOCKET_BASE_URL(getUserCredentials()?.user_id));

      socket.onmessage = function(event) {
        const data = JSON.parse(event.data);

        if(data.message_type === 'user_status' && data.online_status != online_status){
          dispatch(update_online_status(data.status))
        }
        const isSender = data.sender_id === getUserCredentials().user_id;


        if (!isSender && roomId != data.room_name && data?.data?.config_id !== chatConfig){
          dispatch(incrementUnreadCount({chatId: data?.data?.config_id, last_message: data?.data?.message
}))
        }

      };

      socket.onopen = function() {
          console.log("GloblaWeb socket connected!");
      };

      if(chatConfig){
        getUserChat(chatConfig)
      }
      
      return () => {
        if (socket) {
          console.log("closing web socket!")
          socket.close();
        }
      };

    }, [chatConfig, setshowChatPin])

    return (
      <div className="h-screen flex bg-gray-100">
        <Sidebar setChatConfig={setChatConfig} setRoomId={setRoomId} setsenderID={setsenderID} setrecieverID={setrecieverID} setReceiverName={setReceiverName} showChatPin={setshowChatPin} setshowChatPinIndex={setshowChatPinIndex} showChatPinIndex={showChatPinIndex}/>
        {chatConfig  && !showChatPin ?<ChatWindow  roomId={roomId} senderId={senderId} reciverId={reciverId} receiverName={receiverName} config_id={chatConfig} setonline_status={setonline_status}/> : 
         !showChatPin ? <ChatStarter /> : 
         <VerifyChatPin 
            isOpen={setshowChatPin} 
            setChatConfig={setChatConfig} 
            setshowChatPinIndex={setshowChatPinIndex}
            reciverId={reciverId}
            config_id={chatConfig}
          />
        }
      </div>
    );
  };