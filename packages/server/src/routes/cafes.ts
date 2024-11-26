// src/routes/cafes.ts
import express, { Request, Response } from "express";
import { cafes } from "../models/cafes";

import cafes from "../services/cafes-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
    cafes.index()
      .then((list: cafes[]) => res.json(list))
      .catch((err) => res.status(500).send(err));
});
  
router.get("/:cafeId", (req: Request, res: Response) => {
    const { cafeId } = req.params;
  
    cafes.get(cafeId)
      .then((cafes: cafes) => res.json(cafes))
      .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
    const newCafe = req.body;
  
    cafes.create(newCafe)
      .then((cafes: cafes) =>
        res.status(201).json(cafes)
      )
      .catch((err) => res.status(500).send(err));
});

app.put("/:cafeId", (req: Request, res: Response) => {
    const { cafeId } = req.params;
    const newCafe = req.body;
  
    cafes
      .update(cafeId, newCafe)
      .then((cafes: cafes) => res.json(cafes))
      .catch((err) => res.status(404).end());
});

router.delete("/:cafeId", (req: Request, res: Response) => {
    const { cafeId } = req.params;
  
    cafes.remove(cafeId)
      .then(() => res.status(204).end())
      .catch((err) => res.status(404).send(err));
});