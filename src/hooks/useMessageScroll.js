import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scrollToBottom } from "../utils/utils";
import { getUserChat } from "../utils/userChat";
import { showToast } from "../component/Toast";
import { addFirstChat } from "../store/chatSlice";

export const useMessageScroll = (messagesEndRef) => {

  const dispatch = useDispatch();
  const chatMessageList = useSelector((store) => store.chat.chatMessages);

  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const handleScroll = async () => {

    const container = messagesEndRef?.current;
    if (!container || loading) return;

    if (container.scrollTop <=5) {
      setLoading(true);

      try {
        const response = await getUserChat({ limit, offset }); // update API accordingly
        dispatch(addFirstChat(response.data.data));
        setOffset(offset + 10);
        setLimit(limit + 10);
      } 
      catch (e) 
      {
        showToast("Unable to fetch messages", "error");
      } 
      finally 
      {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const container = messagesEndRef?.current;
    if (!container) return;

    scrollToBottom(messagesEndRef);
    console.log("Adding scroll event listener");
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };

  }, [chatMessageList, messagesEndRef]);

  return chatMessageList;
};
