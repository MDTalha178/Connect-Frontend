import { FaInfoCircle } from "react-icons/fa";
import { showToast } from "./Toast";
import { serverCall } from "../utils/client";
import { API_CALL_METHOD } from "../utils/constant";
import { GET_MUTE_URL } from "../utils/clientUrl";
import { useDispatch } from "react-redux";
import { update_mute_chat } from "../store/chatSlice";
import { getChatActionModalText } from "../utils/utils";
import { chatAction } from "../utils/userChat";
import { useRef } from "react";

export const MuteChat = ({isOpen, actionModalOpen, modalType, chatItem}) =>{

  const dispatch = useDispatch()
  const reason = useRef()
  const chatMute = async() =>{
    try{
      const response =  await chatAction(modalType, chatItem, {
        reason: reason?.current?.value,
        action_type: modalType == 'unblock'? false: true
      });
      dispatch(update_mute_chat(response?.data?.data));
      isOpen(null)

    }catch(e){
      throw(e)
    }
    
  }

  const handleCancelation = () =>{
    actionModalOpen(false);
    isOpen('');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
        {/* Info Icon + Title */}
        <div className="flex items-center gap-3 mb-4">
          <FaInfoCircle className="text-blue-500 text-xl" />
          <h2 className="text-lg font-semibold text-gray-800">
            Are you sure you want to {getChatActionModalText(modalType, chatItem)}?
          </h2>
        </div>

         {/* Reason Input */}
       {modalType == 'block' &&<div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason (optional)
          </label>
          <textarea
            ref={reason}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a reason for this action..."
          />
        </div>}

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleCancelation}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={chatMute}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded"
          >
            {getChatActionModalText(modalType, chatItem)}
          </button>
        </div>
      </div>
    </div>
);
}

