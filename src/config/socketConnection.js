// socketConnection.js
const { io } = require("socket.io-client");

class SocketConnection {
  constructor(url) {
    this.socket = io(url, { transports: ["websocket"] });

    this.socket.on("connect", () => {
      console.log("Conectado a Socket.io", this.socket.id);
    });

    this.socket.on("disconnect", () => {
      console.log("Desconectado de Socket.io");
    });

    this.socket.on("error", (error) => {
      console.error("Error en la conexión de Socket.io:", error);
    });
  }
}

module.exports = SocketConnection;
