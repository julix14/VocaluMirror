const express = require("express");
const ViteExpress = require("vite-express");
const userRouter = require("./router/userRouter");
const languageRouter = require("./router/languageRouter");
const vocabularyRouter = require("./router/vocabularyRouter");

const app = express();

app.get("/hello", (req, res) => {
    res.send("Hello Vite + Vue!");
});

app.use(userRouter);
app.use(languageRouter);
app.use(vocabularyRouter);

ViteExpress.listen(app, 3000, () => console.log("Server is listening on port 3000..."));
