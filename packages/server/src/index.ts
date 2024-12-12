// src/index.ts
 connect("Cafes");
import express, { Request, Response } from "express";
//import { cafes } from "./models/cafes";
import { LoginPage } from "./pages/auth";
import { CafesPage } from "./pages/cafes";
import { getCafe } from "./services/cafes-svc";
import cafes from "./services/cafes-svc"
import fs from "node:fs/promises";
import path from "path";

import auth, { authenticateUser } from "./routes/auth";

import{UserPage} from  "./pages/user";
import User from "./services/user-svc";
import Users from "./routes/user";

import { connect } from "./services/mongo";

const app = express();
const port = process.env.PORT || 3000;

connect("cafes");

const staticDir = process.env.STATIC || "public";
app.use(express.static(staticDir));

// Middleware
app.use(express.json());

app.use("/auth", auth);
app.use("/api/users", authenticateUser, Users);

app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get(
    "/destination/:destId",
    (req: Request, res: Response) => {
      const { cafeId } = req.params;
      const data = getCafe(cafeId);
      const page = new CafesPage(data);
  
      res.set("Content-Type", "text/html").send(page.render());
    }
);
