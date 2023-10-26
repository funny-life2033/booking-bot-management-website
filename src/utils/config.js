import axios from "axios";

// export const BASE_URL = "booking-bot-management-websocket-server.onrender.com";
export const BASE_URL = "192.168.148.59:5000";
export const WEB_SOCKET_HOST = `ws://${BASE_URL}/`;
export const Axios = axios.create({ baseURL: `http://${BASE_URL}` });
// export const WEB_SOCKET_HOST =
//   "wss://booking-bot-management-websocket-server.onrender.com/";

export const sendNotification = (message) => {
  const notification = new Notification("New message", {
    icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
    body: `${message}`,
  });

  notification.onclick = () => {
    window.open("http://localhost:3000");
  };
};

export function checkPageStatus(message) {
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications!");
  } else if (Notification.permission === "granted") {
    sendNotification(message);
  } else if (Notification.permission === "denied") {
    Notification.requestPermission((permission) => {
      if (permission === "granted") {
        sendNotification(message);
      }
    });
  }
}
