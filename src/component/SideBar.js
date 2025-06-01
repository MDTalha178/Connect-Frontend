import { FaUserCircle } from 'react-icons/fa';
import ChatHeader from './ChatHeader';
import ChatListSearch from './ChatListSearch';
import { useSelector } from 'react-redux';
import ChatOptionsMenu from './ChatMenu';
import { useEffect, useState } from 'react';
import { MdVolumeOff } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import SetPinModal from './SetChatPin';

const Sidebar = ({ setChatConfig, setRoomId, setsenderID, setrecieverID, setReceiverName, showChatPin, setshowChatPinIndex, showChatPinIndex}) => {
  const userChatlist = useSelector((store) => store.chat.chatList);

  const [chatMenu, setChatMenu] = useState(false);
  const[chatIndex, setChatIndex] = useState(null);

  const updateChatTab = (item, index) => {
    if(item?.is_chat_mute?.is_chat_pin_set && showChatPinIndex != index){
      showChatPin(true);
      setshowChatPinIndex(index);

    }else{
      if(!item?.is_chat_mute?.is_chat_pin_set)  setshowChatPinIndex(null);
    }
    setChatConfig(item.id);
    setRoomId(item.chat_room_name);
    setsenderID(item.sender);
    setrecieverID(item.profile.id);
    setReceiverName(item.profile.first_name + " " + item.profile.last_name);
  };

  const handleChatAction = (action, item) => {
    console.log("Selected Action:", action, "on", item);
    // Implement action logic: muteChat(), blockUser(), setPin(), etc.
  };
  

  useEffect(() =>{

  }, [userChatlist])

  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col">
      <ChatHeader />
      <ChatListSearch />

      <div className="flex-1 overflow-y-auto">
        {userChatlist?.length > 0 ? (
          userChatlist.map((item, index) => (
            <div
              key={index}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b relative"
              onClick={() => updateChatTab(item, index)}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <FaUserCircle className="text-3xl text-gray-600" />
                  <div>
                    <p className="font-medium">
                      {item.profile.first_name + " " + item.profile.last_name}
                    </p>
                    <p className="text-sm text-gray-950 truncate">
                      {!item?.is_chat_mute?.is_chat_pin_set?<strong>{item?.last_message?.message}</strong>: null}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-end gap-4">
                  {item.unread_count > 0 && (
                    <span className="mb-1 min-w-[20px] h-[20px] px-1 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                      {item.unread_count}
                    </span>
                  )}
                  {item?.is_chat_mute?.chat_block && "🚫"}
                  {item?.is_chat_mute?.is_chat_pin_set ?<FaLock className="text-gray-500 text-sm" title="Locked Chat" />: null}
                  {item?.is_chat_mute?.chat_mute ?<div className="relative w-6 h-7 justify-center">
                    <MdVolumeOff
                      size={16}
                      className="absolute bottom-0 right-0 bg-white rounded-full text-red-500"
                    />
                  </div>: null}
                  <ChatOptionsMenu chatItem={item} onActionSelect={handleChatAction} isOpen={chatIndex == index ? true : false}  index={index} openchatIndex={chatIndex}  setChatIndex={setChatIndex} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 text-center px-4 py-8">
            💬 No chats yet. Start a conversation to see it here.
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
