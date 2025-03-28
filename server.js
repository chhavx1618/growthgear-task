const express = require("express")

const app = express();

app.use(express.json());

const PORT = 5000;

app.get("/", (req,res) => {
    res.send("running");
});

app.listen(PORT, () => {
    console.log(`running on $PORT`);
});