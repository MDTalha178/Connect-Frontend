import React, { useEffect, useState } from "react";
import StartChatModal from './AddUserModal';
import { serverCall } from "../utils/client";
import { API_CALL_METHOD } from "../utils/constant";
import { GET_USER_LIST, USER_CHAT_LIST_URL } from "../utils/clientUrl";
import { showToast } from "./Toast";

const ChatStarter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() =>{
    const getUserData =  async  () =>{

      const response = await serverCall(GET_USER_LIST, API_CALL_METHOD.GET, {}, {}, true);
      try{

        if(response?.status_code === 200){
            setUserList(response?.data?.data);
        }
      }catch(e){
         if(response?.status_code === 400) showToast('Something went wrong', 'error');
      }
    }

    getUserData();

  }, []);


  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center bg-white text-center px-4">
        <h1 className="text-3xl font-semibold mb-2 text-[#111b21]">Welcome to Easy Connect</h1>
        <p className="text-base text-[#667781] mb-6">
          Talk to anyone, anytime, anywhere — all in one place.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-[#25D366] text-white rounded-full text-base font-medium hover:bg-[#1ebe5d] transition"
        >
          Start Chat
        </button>
      </div>

      <StartChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userList={userList}
      />
    </>
  );
};

export default ChatStarter;
