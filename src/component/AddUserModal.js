import React from "react";
import Select from "react-select";

const StartChatModal = ({ isOpen, onClose, userList = [] }) => {
  if (!isOpen) return null;

  // Format userList for react-select
  const options = userList.map((user) => ({
    value: user.id,
    label: user.first_name + " " + user.last_name,
  }));
  

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
      </div>
    </div>
  );
};

export default StartChatModal;
