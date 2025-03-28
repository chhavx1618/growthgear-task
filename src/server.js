const express = require("express");
const routes = require("./routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api", routes);

const PORT = 5000;

app.get("/", (req,res) => {
    res.send("running");
});

app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
});