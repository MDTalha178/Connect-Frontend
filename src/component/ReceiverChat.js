import { formatChatTimestamp } from "../utils/dateUtils";

const RecieverChat = ({message, sentTime}) =>{
     

    return(
    <div className="bg-white p-2 rounded-md max-w-xs">
        <span>{message}</span>
        <span className="block text-xs text-gray-500 text-right mt-1">{formatChatTimestamp(sentTime)}</span>
    </div>
    )
}

export default RecieverChat;