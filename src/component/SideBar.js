import ChatHeader from './ChatHeader';
import ChatListSearch from './ChatListSearch';
import { useSelector } from 'react-redux';

const Sidebar = ({ setChatConfig, setRoomId, setsenderID, setrecieverID, setReceiverName }) => {
  const userChatlist = useSelector((store) => store.chat.chatList);

  const updateChatTab = (item) => {
    setChatConfig(item.id);
    setRoomId(item.chat_room_name);
    setsenderID(item.sender);
    setrecieverID(item.profile.id);
    setReceiverName(item.profile.first_name + " " + item.profile.last_name);
  };

  return (
    <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <ChatHeader />

      {/* Search */}
      <ChatListSearch />

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {userChatlist && userChatlist.length > 0 ? (
          userChatlist.map((item, index) => (
            <div
              key={index}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b"
              onClick={() => updateChatTab(item)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {item.profile.first_name + " " + item.profile.last_name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {item?.last_message?.message}
                  </p>
                </div>

                {/* Unread Count Badge */}
                {item.unread_count > 0 && (
                  <span className="ml-2 min-w-[20px] h-[20px] px-1 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                    {item.unread_count}
                  </span>
                )}
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
