import {useEffect, useRef, useState } from 'react';
import { FaPaperPlane, FaPlus, FaUserCircle } from 'react-icons/fa';
import ChatModal from './ChatModal';
import SenderChat from './SenderChat';
import RecieverChat from './ReceiverChat';
import { useDispatch, useSelector } from 'react-redux';
import { incrementUnreadCount, reset_chat_count, updateChat } from '../store/chatSlice';
import { getUserCredentials } from '../utils/localStorage';
import { CHAT_WEBSOCKET_BASE_URL } from '../utils/clientUrl';
import { EndToEndEcryption } from './EndToEndEcryption';
import { useChatCount } from '../hooks/usechatCount';
import { useOnlineStatus } from '../hooks/useSetOnlineStatus';
import { useMessageScroll } from '../hooks/useMessageScroll';

const ChatWindow = ({roomId, senderId, reciverId, receiverName, config_id, setonline_status}) => {

  useChatCount(config_id);
  const online_status = useOnlineStatus(setonline_status);

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const message = useRef()

  const socketRef = useRef(null);

  const messagesEndRef = useRef(null);
  const chatmessagList = useMessageScroll(messagesEndRef)

  const toggleModal = () => setShowModal(!showModal);



  useEffect(() =>{

    const socket = new WebSocket(CHAT_WEBSOCKET_BASE_URL(roomId, senderId));

    socketRef.current = socket
    socket.onmessage = function(event) {

        const data = JSON.parse(event.data);
        const isSender = data.sender_id === getUserCredentials().user_id;

        if(data.room_name === roomId) dispatch(updateChat({message:[{messages: data.message, is_sender: isSender}], config_id:config_id}));

        
        if (roomId !== data.room_name){
          dispatch(incrementUnreadCount({chatId: data.config_id}))
        }

    };

    socket.onopen = function() {
        console.log("Web socket connected!");

  
    };

    return () => {
      if (socketRef.current) {
        console.log("closing web socket!")
        socketRef.current.close();
      }
    };


  },[config_id, setonline_status, chatmessagList])

  const sendMessage = () =>{
    socketRef.current.send(JSON.stringify({
      sender_id:senderId,
      receiver_id:reciverId,
      message: message.current.value,
      config_id: config_id
    }));  
    message.current.value = '';
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 bg-white border-b flex gap-4 items-center">
         <FaUserCircle className="text-3xl text-gray-600" />
        <div>
          <h2 className="font-semibold">{receiverName}</h2>
          <p className="text-sm text-gray-500">{online_status}</p>
        </div>
      </div>
      {/* Messages */}
      <EndToEndEcryption />
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {chatmessagList ? chatmessagList.map((item, index) =>
            item.is_sender ? (
              <SenderChat key={index} message={item.messages} sentTime={item.created_at}/>
            ) : (
              <RecieverChat key={index} message={item.messages} sentTime={item.created_at}/>
            )
          ) : null}
          <div ref={messagesEndRef} />
        </div>

      {/* Input */}
      <div className="p-4 bg-white border-t flex items-center gap-2">
        <button
          onClick={toggleModal}
          className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"
        >
          <FaPlus size={20} />
        </button>
        <input
          type="text"
          // value={message}
          ref={message}
          placeholder="Type a message"
          className="flex-1 px-4 py-2 border rounded-full outline-none"
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button className="text-green-600 hover:text-green-800" onClick={sendMessage}>
          <FaPaperPlane size={20} />
        </button>
      </div>

      {/* Modal for options */}
      {showModal && (
        <ChatModal showModal={showModal} setShowModal={setShowModal}/>
      )}
    </div>
  );
};

export default ChatWindow;
