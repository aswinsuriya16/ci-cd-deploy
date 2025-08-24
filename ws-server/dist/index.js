"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8081 });
wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.send("Hello! You are connected to the WebSocket server");
    ws.on("message", (msg) => {
        console.log("Received:", msg.toString());
        wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(`Echo: ${msg}`);
            }
        });
    });
    ws.on("close", () => console.log("Client disconnected"));
});
console.log("WebSocket server running on ws://localhost:8081");
