// src/index.ts
import { connect } from "./services/mongo";
connect("cafes");
import express, { Request, Response } from "express";
//import { cafes } from "./models/cafes";
import { CafesPage } from "./pages/cafes";
import { getCafe } from "./services/cafes-svc";
import cafes from "./routes/cafes";


const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use("/api/cafes", cafes);
app.use(express.static(staticDir));

app.use(express.json());

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
