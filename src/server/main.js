import express from "express";
import { listen } from "vite-express";

const app = express();

app.get("/hello", (req, res) => {
    res.send("Hello Vite + Vue!");
});

listen(app, 3000, () => console.log("Server is listening on port 3000..."));
