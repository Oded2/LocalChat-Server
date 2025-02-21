import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import cors from "cors";

const app = express();
app.use(cors()); // Allow client to connect from a different origin

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const PORT = 3000;

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(message.toString().toUpperCase());
      }
    });
  });

  ws.on("close", () => console.log("Client disconnected"));
});
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
