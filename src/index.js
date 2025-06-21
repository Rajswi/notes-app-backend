import express from "express";
import userRoutes from "../routes/users.js";
import noteRoutes from "../routes/notes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notes App Backend is Running!");
});

app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});