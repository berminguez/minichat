class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // Eventos de Socket.io
    this.io.on("connection", (socket) => {
      console.log(`Cliente conectado con id: ${socket.id}`);
      const randomColors = ["red", "blue", "green", "yellow", "pink", "purple"];
      let randomColor =
        randomColors[Math.floor(Math.random() * randomColors.length)];
      socket.emit("mensaje-bienvenida", {
        msg: "Bienvenido al servidor",
        fecha: new Date(),
      });

      // Escuchar el evento mensaje-cliente
      socket.on("message-to-server", (data) => {
        console.log(data);
        this.io.emit("message-from-server", {
          msg: data.msg,
          fecha: new Date(),
          user: socket.id,
          color: randomColor,
        });
      });
    });
  }
}
module.exports = Sockets;
