// src/index.ts
import { connect } from "./services/mongo";
connect("Cafes");
import express, { Request, Response } from "express";
//import { cafes } from "./models/cafes";
import { CafesPage } from "./pages/cafes";
import { getCafe } from "./services/cafes-svc";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.st