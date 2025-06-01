import { useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { filterSingledata } from "../utils/filter";
import { chatAction } from "../utils/userChat";

export const VerifyChatPin = ({isOpen, setChatConfig, setshowChatPinIndex, reciverId, config_id}) =>{

    const chatPin = useRef();
    const chatList = useSelector((state) => state.chat.chatList);

    const handleVerifyChatPin = async() =>{
        const chatItem = filterSingledata(chatList, 'id', config_id);
        try{
          if(chatItem){
            const response = await chatAction('VerifyPin', chatItem, {
              chat_pin:chatPin.current.value,
            });
            if(response.status_code == 200){
              isOpen(false);
            }
          }
        }catch(e){
          console.log("Inner")
          throw(e)
        }finally{
          chatPin.current.value = '';
        }

    }

    const handleCancelation = () =>{
        isOpen(false);
        setChatConfig(null);
        setshowChatPinIndex(null);
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <FaInfoCircle className="text-blue-500 text-lg" />
              <h2 className="text-xl font-semibold text-gray-800">Verify PIN</h2>
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
            </div>
    
            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={handleCancelation}>
                Cancel
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={handleVerifyChatPin}>
                Verify PIN
              </button>
            </div>
          </div>
        </div>
      );
    };
    
export default VerifyChatPin;