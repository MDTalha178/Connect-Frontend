import { FiMoreVertical } from "react-icons/fi";
import { useEffect, useState } from "react";
import { MuteChat } from "./MuteChat";
import SetPinModal from "./SetChatPin";

const ChatOptionsMenu = ({chatItem, onActionSelect, isOpen, index, openchatIndex, setChatIndex}) => {
  // const [isOpen, setIsOpen] = useState(null);
  const [constChatMenu, setChatMenu] = useState(false)

  const [isModalOpenType, setIsModalOpenType] = useState('');
  const [actionModalOpen, setactionModalOpen] = useState(false);

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Toggles the visibility of the options menu.
 * Prevents the click event from propagating further.
 * @param {Event} e - The click event triggering the toggle.
 */

  const toggleMenu = (e) => {
    e.stopPropagation();
    index == openchatIndex ? setChatIndex(null) : setChatIndex(index);
  };


  const handleOptionClick = (action, isOpen) => {
    onActionSelect(action, chatItem);
    // sOpen(isOpen);
    
  };


  const handleAction = (action, open_type) =>{
    setIsModalOpenType(action);
    setactionModalOpen(open_type)
  }

  useEffect(() => {
  }, [setIsModalOpenType, setactionModalOpen]);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <FiMoreVertical
        className="text-gray-600 hover:text-gray-800 cursor-pointer"
        onClick={toggleMenu}
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10 text-sm">
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleOptionClick("mute", true)}
          >
          <p onClick={() => handleAction("mute", true)}>{chatItem?.is_chat_mute?.chat_mute ? "🔊 Unmute" : "🔇 Mute"}</p>
          {actionModalOpen && isModalOpenType == 'mute'? 
          <MuteChat  
              isOpen={setIsModalOpenType} 
              actionModalOpen={setactionModalOpen}
              modalType="mute" 
              chatItem={chatItem}
              onMute={() => handleOptionClick("mute", true)}
              />:
          null}
          </div>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleOptionClick("block")}
          >
            <p onClick={() => handleAction("block", true)}>{chatItem?.is_chat_mute?.chat_block ?" 🔓 Unblock User": "🚫 Block User"}</p>
            {actionModalOpen && isModalOpenType == 'block'? 
            <MuteChat  
              isOpen={setIsModalOpenType} 
              actionModalOpen={setactionModalOpen}
              modalType={chatItem?.is_chat_mute?.chat_block ? "unblock" : "block"}
              chatItem={chatItem}
              onMute={() => handleOptionClick("block", true)}
            />: null}
          </div>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleOptionClick("pin")}
          >
           <p onClick={() => handleAction(chatItem?.is_chat_mute?.is_chat_pin_set ? "RemovePin" : 'pin', true)}>{chatItem?.is_chat_mute?.is_chat_pin_set ? "📌 Remove Pin" : "📌 Set Pin"}</p>
           {actionModalOpen && isModalOpenType == 'pin'? 
           <SetPinModal  
            isOpen={setIsModalOpenType}
            modalType="pin" 
            chatItem={chatItem}
            actionModalOpen={setactionModalOpen}
           />
          : null}
           {actionModalOpen && isModalOpenType == 'RemovePin'? 
            <SetPinModal  
              isOpen={setIsModalOpenType} 
              actionModalOpen={setactionModalOpen}
              modalType="RemovePin" 
              chatItem={chatItem}
              onMute={() => handleOptionClick("RemovePin", true)}
            />: null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatOptionsMenu;
