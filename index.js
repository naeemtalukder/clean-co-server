const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.get("/", async(req, res) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`ami jamu port ${port}`);
});