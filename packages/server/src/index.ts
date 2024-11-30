// src/index.ts
 connect("Cafes");
import express, { Request, Response } from "express";
//import { cafes } from "./models/cafes";
import { LoginPage } from "./pages/auth";
import { CafesPage } from "./pages/cafes";
import { getCafe } from "./services/cafes-svc";
import cafes from "./services/cafes-svc"

import auth, { authenticateUser } from "./routes/auth";

import { connect } from "./services/mongo";

const app = express();
const port = process.env.PORT || 3000;

connect("cafes");

const staticDir = process.env.STATIC || "public";
app.use(express.static(staticDir));

// Middleware
app.use(express.json());

// Auth Route
app.use("/auth", auth);

// API Routes
app.use("/api/cafes", cafes);
app.use("/api/cafes", authenticateUser, cafes);

// Page Routes
app.get("/login", (req: Request, res: Response)=>{
    const page = new LoginPage();
    res.set("Content-Type", "text/html").send(page.render());
});