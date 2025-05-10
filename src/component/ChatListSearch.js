import { FaSearch } from "react-icons/fa";

const ChatListSearch = () => {
    return(
        <div className="p-2 border-b">
            <div className="flex items-center bg-gray-100 rounded px-2 py-1">
            <FaSearch className="text-gray-400 mr-2" />
            <input
                type="text"
                placeholder="Search or start new chat"
                className="bg-transparent w-full outline-none"
            />
            </div>
      </div>
    )
}

export default ChatListSearch;