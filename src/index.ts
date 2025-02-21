import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import cors from "cors";

type Data = {
  content: string;
  author: string;
};

const app = express();
app.use(cors()); // Allow client to connect from a different origin

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const PORT = 5000;
const messages: Data[] = [];
let clientNumber: number = 1;

wss.on("connection", (ws) => {
  const clientId = `Client ${clientNumber.toLocaleString()}`;
  clientNumber++;
  ws.send(
    JSON.stringify({ type: "id", content: clientId, author: "server-clientid" })
  );
  messages.forEach((data) => ws.send(JSON.stringify(data)));
  console.log(`Client connected with id ${clientId}`);

  ws.on("message", (rawMessage) => {
    const message: Data = JSON.parse(rawMessage.toString());
    console.log(`Received: ${message.content}`);
    if (message.author === "request-purge") {
      messages.length = 0;
      return;
    }
    const data: Data = {
      content: message.content,
      author: clientId,
    };
    messages.push(data);
    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === 1 && ws !== client) {
        client.send(JSON.stringify(data));
      }
    });
  });

  ws.on("close", () => {
    console.log(`Client disconnected (id: ${clientId})`);
  });
});
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
