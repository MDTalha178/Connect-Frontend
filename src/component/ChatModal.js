import {FaTimes } from 'react-icons/fa';

const ChatModal = ({showModal, setShowModal}) =>{
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
            onClick={() => setShowModal(false)} // Close modal when clicking outside
        >
            <div
            className="bg-white rounded-lg p-6 w-64 space-y-4 relative"
            onClick={(e) => e.stopPropagation()} 
            >
            {/* Close Button */}
            <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
                <FaTimes size={20} />
            </button>
            
            <h3 className="text-lg font-semibold text-center">Share</h3>
            <div
                className="p-3 bg-gray-100 text-center rounded cursor-pointer hover:bg-gray-200"
                onClick={() => alert('Share Media')}
            >
                Share Media
            </div>
            <div
                className="p-3 bg-gray-100 text-center rounded cursor-pointer hover:bg-gray-200"
                onClick={() => alert('Share Document')}
            >
                Share Document
            </div>
            <div
                className="p-3 bg-gray-100 text-center rounded cursor-pointer hover:bg-gray-200"
                onClick={() => alert('Share Contact')}
            >
                Share Contact
            </div>
            </div>
        </div>
    )
}

export default ChatModal