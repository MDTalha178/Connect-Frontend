import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useOnlineStatus = (setonline_status) =>{

    const online_status = useSelector((store) => store.chat.online_status);

    useEffect(() =>{
        setonline_status(online_status);
    });

    return online_status
}