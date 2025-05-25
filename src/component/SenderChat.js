import { formatChatTimestamp } from "../utils/dateUtils";

const SenderChat = ({message, sentTime}) =>{
    
    return(
    <div className="bg-green-100 self-end p-2 rounded-md max-w-xs ml-auto">
        <div className="bg-green-100 rounded-lg px-3 py-2 max-w-xs text-sm relative">
            <span>{message}</span>
            <span className="block text-xs text-gray-500 text-right mt-1">{formatChatTimestamp(sentTime)}</span>
      </div>
    </div>
    )
}

export default SenderChat;