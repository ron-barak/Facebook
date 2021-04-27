const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoDb = require("./db/mongoConnect");
const cors = require("cors");
const { createSocket } = require("./socket/socket_main");
const { routesInit } = require("./routes/app_routes");

app.use(cors());
app.use(express.json());
routesInit(app);

createSocket(http);
const port = process.env.PORT || 3900;
http.listen(port, () => console.log(`Listening on port ${port}...`));
