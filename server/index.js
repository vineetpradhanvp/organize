import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import boardRouter from "./routes/boardRouter.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/board", boardRouter);
app.use("/task", taskRouter);

const CONNECTION_URL = "mongodb://127.0.0.1:27017/organize";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
