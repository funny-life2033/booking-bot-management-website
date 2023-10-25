import axios from "axios";

export const BASE_URL = "localhost:5000";
export const WEB_SOCKET_HOST = `ws://${BASE_URL}/`;
export const Axios = axios.create({ baseURL: `http://${BASE_URL}` });
// export const WEB_SOCKET_HOST =
//   "wss://booking-bot-management-websocket-server.onrender.com/";
