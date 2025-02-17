import axios from "axios";
import { io } from "socket.io-client";

const VITE_API_URL = import.meta.env.VITE_API_URL;
export const socket = io(import.meta.env.VITE_WS_URL);
const MessengerAPIInstance = axios.create({ baseURL: VITE_API_URL });
export interface IUser {
    id: string;
}
export interface IMessage {
    from: string;
    to: string;
    message: string;
    timestamp: string;
}
const MessengerAPI = {
    authUser: async (id: string) => {
        const res = await MessengerAPIInstance.post<IUser>("/login", { id: id })
        console.log(res);
    },
    getMessages: async (id: string) => {
        const res = await MessengerAPIInstance.get<IMessage[]>(`/messages/${id}`)
        //console.log(res.data);
        return res.data;
    }
}
export default MessengerAPI;