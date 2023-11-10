import { ApiClient } from "./ApiClient";

const api = new ApiClient();

export const getRooms = (userId) => api.get(`user/${userId}/rooms`);

export const getRoomChats = (roomId) => api.get(`rooms/${roomId}/chats`);
