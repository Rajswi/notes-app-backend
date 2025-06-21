import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = 1; // For now, hardcoded

  if (!title || !content)
    return res.status(400).json({ error: "Title and content are required" });

  try {
    const note = await prisma.note.create({
      data: { title, content, userId },
    });

    res.status(201).json({ message: "Note created", note });
  } catch (error) {
    res.status(500).json({ error: "Failed to create note", details: error.message });
  }
};
