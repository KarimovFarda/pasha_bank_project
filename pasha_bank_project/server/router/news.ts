import News from '../models/news';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { INews } from '../Interface/types';

export const newsRouter = express.Router();
newsRouter.use(cors());
newsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

newsRouter.post("/", async (req: Request, res: Response) => {
    const newsPayload: INews = {
        ...req.body
    }
    const news = new News(newsPayload);
    try {
        const newNews = await news.save();
        res.status(200).json(newNews);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

newsRouter.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        let news = await News.findById(id);
        if (!news) {
            res.status(404).json({ message: "Not Found" })
        } else {
            await News.findByIdAndUpdate(id, req.body, {
                useFindAndModify: false
            })
            news = await News.findById(id);
            res.json(news);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

newsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const news = await News.findById(id);
        if (!news) {
            res.status(404).json({ message: "Not Tryed" });
        } else {
            await news.remove();
            res.json({ message: "News Deleted." })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default newsRouter