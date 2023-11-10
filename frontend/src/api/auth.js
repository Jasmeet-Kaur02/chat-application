import { ApiClient } from "./ApiClient";

const api = new ApiClient();

export const signup = (body) => api.post("signup", body);

export const signin = (body) => api.post("signin", body);
