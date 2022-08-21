const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config("./env");

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const conn = require("./db/connection");

app.use(require("./routes/route"));

conn
  .then((db) => {
    if (!db) {
      process.exit();
    } else {
      app.listen(port, () => console.log(`APP LISTENING ON ${port}.`));
      app.on("error", (err) =>
        console.log(`Failed to connect to HTTP Server. ${err}`)
      );
    }
  })
  .catch((err) => {
    console.log(`Connection Failed. ${err}`);
  });
