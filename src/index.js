import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notes App Backend is Running!");
});

app.get("/login", async(req,res)=>{
  const user = {
    email: "nainish.com@gamil.com",
    password: "123678"
    
  }
  try{
    const newUser = await prisma.User.create({
      data: user
    })
    res.status(201).json({message: "User created successfully", user: newUser})
  }
  catch (error) {
    res.status(500).json({ error: "Failed to create user", details: error.message });
  } 
}
)

app.post("/notes", async(req, res)=>{
  const {title, content} = req.body;
  const userId = 1;

  if( !title || !content){
    return res.status(400).json({
      error: "Title and content are required"
    })
  }
  try{
    const newNote = await prisma.Note.create({
      data: {
        title,
        content,
        userId,
      },
    })
    res.status(201).json({ message: "Note created successfully", Note: newNote })
  }
  catch (error) {
    res.status(500).json({ error: "Failed to create note", details: error.message });
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});