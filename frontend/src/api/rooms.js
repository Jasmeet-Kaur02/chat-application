import { ApiClient } from "./ApiClient";

const api = new ApiClient();

export const getRooms = (userId) => api.get(`users/${userId}/rooms`);
