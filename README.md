# LocalChat Server

LocalChat Server is the backend WebSocket server for the LocalChat application. It manages real-time communication between clients using **Express.js** and **WebSockets**.

## Features

- Handles WebSocket connections for real-time messaging
- Assigns unique client IDs to users
- Broadcasts messages to all connected clients
- Supports message history
- Provides a message purge functionality

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Oded2/localchat-server.git
   cd localchat-server
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   npm start
   ```

## Configuration

The server runs on port **5000** by default. If needed, you can modify the port in the source code:

```js
const PORT = 5000;
```

## API Endpoints

Since this is a WebSocket server, it does not expose REST endpoints. Clients connect to:

```
ws://your-server-ip:5000
```

## WebSocket Events

### On Connection

- A new client is assigned an ID (`Client X`) and receives past messages.

### On Message Received

- The server broadcasts the message to all connected clients.
- If the client sends a `request-purge` message, all stored messages are deleted.

### On Disconnection

- The server logs the client disconnection.

## Technologies Used

- **Express.js** - Web framework for Node.js
- **WebSockets (ws)** - Real-time bidirectional communication
- **CORS** - Allows cross-origin communication

## Client-Side Repository

The LocalChat client-side repository is available [here](https://github.com/Oded2/localchat-client)

## License

This project is licensed under the MIT License.

---

Contributions and feedback are welcome!
