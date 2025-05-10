import { FaUserCircle } from "react-icons/fa"

const ChatHeader = () => {
    return(
        <div className="flex items-center justify-between p-4 border-b">
            <FaUserCircle className="text-3xl text-gray-600" />
            <span className="font-semibold">Chats</span>
      </div>
    )
}

export default ChatHeader;