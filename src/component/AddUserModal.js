import React from "react";
import Select from "react-select";
import { serverCall } from "../utils/client";
import { CREATE_CHAT } from "../utils/clientUrl";
import { showToast } from "./Toast";
import { API_CALL_METHOD } from "../utils/constant";
import { useDispatch } from "react-redux";

const StartChatModal = ({ isOpen, onClose, userList = [] }) => {

  const dispatch = useDispatch();

   const [selectedUser, setSelectedUser] = React.useState(null);
  if (!isOpen) return null;

  const options = userList.map((user) => ({
    value: user.id,
    label: user.first_name + " " + user.last_name,
  }));


  const handleOnSubmit = async() =>{

      const response = await serverCall(CREATE_CHAT, API_CALL_METHOD.POST, 
        {participant_ids:[selectedUser?.value],is_group_chat:false}, {}, true,
        {success:"Chat Created Successfully"}
      );

      try{
        if(response?.status_code === 200){
          onClose();
          console.log(response?.data?.data?.id);
          showToast('In few seconds Chat list will reaload from Where You can your chat at first', 'info');
          setTimeout(() => {
            window.location.reload();
          }, 5000);


        }
      }catch(e){
          if(response?.status_code === 400) showToast('Something went wrong', 'error');
      }
  }

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-lg p-5 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Start New Chat
        </h2>

        {/* Searchable Dropdown */}
        <Select
          options={options}
          onChange={setSelectedUser}
          placeholder="Search or select a user..."
          className="text-sm"
          styles={{
            control: (base) => ({
              ...base,
              borderRadius: '9999px',
              borderColor: '#dfe1e5',
              backgroundColor: '#f0f2f5',
              paddingLeft: '0.25rem',
              boxShadow: 'none',
              '&:hover': { borderColor: '#25D366' },
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#e9f7ef' : 'white',
              color: '#111b21',
              fontSize: '14px',
              cursor: 'pointer',
            }),
            placeholder: (base) => ({
              ...base,
              color: '#667781',
              fontSize: '14px',
            }),
          }}
        />
        {selectedUser && <button className="bg-[#25D366] hover:bg-green-700 text-white py-2 px-4 rounded mt-4" onClick={handleOnSubmit}>Start Chat</button>}
      </div>
    </div>
  );
};

export default StartChatModal;
