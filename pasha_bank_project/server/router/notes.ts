import Notes from '../models/notes';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { INotes } from '../Interface/types';

export const notesRouter = express.Router();
notesRouter.use(cors());
notesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const notes = await Notes.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

notesRouter.post("/", async (req: Request, res: Response) => {
    const notesPayload: INotes = {
        ...req.body
    }
    const notes = new Notes(notesPayload);
    try {
        const newNotes = await notes.save();
        res.status(200).json(newNotes);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

notesRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        let notes = await Notes.findById(id);
        if (!notes) {
            res.status(404).json({ message: "Not Found" })
        } else {
            await Notes.findByIdAndUpdate(id, req.body, {
                useFindAndModify: false
            })
            notes = await Notes.findById(id);
            res.json(notes);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

notesRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const notes = await Notes.findById(id);
        if (!notes) {
            res.status(404).json({ message: "Not Found" });
        } else {
            await notes.remove();
            res.json({ message: "Notes Deleted." })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default notesRouter