import { Server, Socket } from "socket.io";

let io: Server;
let connectedClients: Socket[] = [];
/** Function used to initialize SocketIO server */
export function initializeSocketServer() {
  io = new Server({
    cors: {
      origin: "*",
    },
  });

  io.listen(3500); //this is the PORT where SocketIO is listening

  io.on("connection", handleConnection);
}

/** Function used to make the socketIO connection and storing connected clients */
function handleConnection(socket: Socket) {
  console.log(`Socket connection active: ${socket.id}`, socket.request.headers);

  // Store reference to the connected client
  connectedClients.push(socket);

  // Handle disconnection event
  socket.on("disconnect", () => {
    console.log(`Socket connection disconnected: ${socket.id}`);

    // Remove the disconnected client from the array
    const index = connectedClients.indexOf(socket);
    if (index !== -1) {
      connectedClients.splice(index, 1);
    }
  });
}
/** Function used to get all the connected clients */
export function getConnectedClients(): Socket[] {
  return connectedClients;
}
/** Function used return an instance of SocketIO server */
export function getSocketServer(): Server {
  return io;
}
