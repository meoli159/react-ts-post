import express, { Request, Response } from "express";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import cors from "cors";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();
app.use(cors({ origin: process.env.FE_URL }));
app.use(express.json());

const port = process.env.PORT || 3333;

//DBconnected
const DB_Files = process.env.DB_FILE;
export const db = new sqlite3.Database(
  DB_Files!,
  sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE,
  (error) => {
    if (error) return console.log(error.message);
  }
);

function createDBConnection() {
  sqlite3.verbose();
  console.log("Connected to SQlite database.");
  return db;
}
function createTable() {
  db.exec(`CREATE TABLE posts
  (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    author VARCHAR(50) NOT NULL,
    body VARCHAR(225) NOT NULL
  )`);
}

//Controller

function insertPost(author: string, body: string) {
  db.run(
    `INSERT INTO posts (author, body) VALUES (?,?)`,
    [author, body],
    (error) => {
      if (error) {
        console.log(error.message);
        return;
      }
      console.log("Create Successfully");
    }
  );
}

function getListPost(req: Request, res: Response) {
  let sql = `select * from posts`;
  let params: string[] = [];
  db.all(sql, params, (error, rows) => {
    if (error) throw new Error(error.message);
    return res.json({
      message: "success",
      data: rows,
    });
  });
}

function deletePost(id: string, req: Request, res: Response) {
  db.run("DELETE FROM posts WHERE ID = ?", id, (error) => {
    if (error) {
      console.log(error.message);
      return;
    }
    return getListPost(req, res);
  });
}

function updatePost(author: string, body: string, id: string) {
  db.run(
    "UPDATE posts SET author = COALESCE(?, author), body = COALESCE(?, body) WHERE ID = ?",
    [author, body, id],
    (error) => {
      if (error) console.log("Updated fail please try again");
    }
  );
}
// Api
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

//API Posts
app.get("/api/posts", (req: Request, res: Response) => {
  return getListPost(req, res);
});

app.post("/api/posts", (req: Request, res: Response) => {
  const { author, body } = req.body;
  if (!author || !body) {
    return res.status(400).json({ error: "Please provide Author and Body" });
  }
  insertPost(author, body);

  return res.status(201).json({ message: "Create post successfully" });
});
app.put("/api/posts/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { author, body } = req.body;
  updatePost(author, body, id);
  return getListPost(req, res);
});
app.delete("/api/posts/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  return deletePost(id, req, res);
});

app.listen(port, () => {
  createDBConnection();
  console.log(`Server running at http://localhost:${port}`);
});
