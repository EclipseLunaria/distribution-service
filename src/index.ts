import router from "./routes";
import express from "express";
import process from "process";

const app = express();
const port = process.env.PORT || 6903;
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Distribution Service is online.");
});

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
