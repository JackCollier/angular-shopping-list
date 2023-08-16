const express = require("express");
const jsonServer = require("json-server");
const { v4: uuidv4 } = require("uuid");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const cors = require("cors");

server.use(cors());
server.use(express.json());
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.id = uuidv4();
  }
  next();
});

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running on port 3000");
});
