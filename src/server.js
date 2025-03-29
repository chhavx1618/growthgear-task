const express = require("express");
const routes = require("./routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 5000;

app.get("/", (req,res) => {
    res.send("Hello World! This is A mini query engine. I'm running perfectly, thanks!");
});

app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
});