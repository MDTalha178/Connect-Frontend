import React, { useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { chatAction } from "../utils/userChat";
import { useDispatch } from "react-redux";
import { update_mute_chat } from "../store/chatSlice";
import { getChatActionModalText } from "../utils/utils";

const SetPinModal = ({isOpen, modalType,  chatItem, actionModalOpen}) => {

  const dispatch = useDispatch();

  const chatPin = useRef();
  const confirmChatPin = useRef();

  const handleSetPin = async() =>{
      try{
          const response = await chatAction(modalType, chatItem, {
            chat_pin:chatPin?.current?.value,
            confirm_chat_pin: confirmChatPin?.current?.value
          });
          if(response.status_code == 200){
            dispatch(update_mute_chat(response?.data?.data))
            actionModalOpen(false);
            isOpen('');
          }
          
      }catch(e){
          throw(e)
      }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <FaInfoCircle className="text-blue-500 text-lg" />
          <h2 className="text-xl font-semibold text-gray-800">Set PIN</h2>
        </div>

        {/* PIN Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Enter PIN</label>
            <input
              ref={chatPin}
              type="password"
              maxLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter 6-digit PIN"
            />
          </div>
          {modalType == 'pin' &&
          <div>
            <label className="block text-gray-700 mb-1">Confirm PIN</label>
            <input
              ref={confirmChatPin}
              type="password"
              maxLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Re-enter 6-digit PIN"
            />
          </div>}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
           <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={() => actionModalOpen(false)}>
             Cancel
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={handleSetPin}>
            {getChatActionModalText(modalType, chatItem)}
            </button>

        </div>
      </div>
    </div>
  );
};

export default SetPinModal;
