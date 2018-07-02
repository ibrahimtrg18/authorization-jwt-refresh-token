const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const db = require("./config/db");

app.use(express.json());

// api
app.use("/api/auth", require("./routers/auth"));
app.use("/api/user", require("./routers/user"));
app.use("/api/product", require("./routers/product"));

// server
app.listen(PORT, () => console.log(`SERVER RUNNING AT LOCALHOST:${PORT}`));
