import { BASE_URL } from "./constant";

export const LOGIN_URL = `${BASE_URL}auth/login/`;
export const SIGNUP_URL = `${BASE_URL}auth/signup/`;
export const USER_CHAT_LIST_URL =`${BASE_URL}chat/chat-list/`;

export const GET_CHAT_MESSAGES = (chat_config_id) =>
    `${BASE_URL}chat/chat-list/${chat_config_id}/first-chat/`;

export const CHAT_WEBSOCKET_BASE_URL = (roomID, senderId) =>
    `ws://localhost:8000/ws/chat-room/${roomID}/?userId=${senderId}`;

export const GET_USER_LIST = `${BASE_URL}chat/chat-list/user-list/`;

export const VERIFICATION_URL = `${BASE_URL}auth/login/verification/`

export const GLOBAL_WEBSCOCKET_BASE_URL = (user_id) =>
    `ws://localhost:8000/ws/user/${user_id}/`