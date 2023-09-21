import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import "reflect-metadata";

// import { db } from "./database/sqliteDbConnect";
import AppDataSource from "./database/data-source";
import { Post } from "./entities/Post.entity";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();
app.use(cors({ origin: process.env.REACT_URL }));
app.use(express.json());

const port = process.env.PORT || 3333;

//Controller
async function insertPost(
  author: string,
  body: string,
  req: Request,
  res: Response
) {
  const postRepo = AppDataSource.getRepository(Post);
  const newPost = await postRepo.save({ author, body });
  return res.json({
    message: "success",
    data: newPost,
  });
}

async function getListPost(req: Request, res: Response) {
  const postRepo = AppDataSource.getRepository(Post);
  const allPosts = await postRepo.find({ order: { id: "DESC" } });
  return res.json({
    message: "success",
    data: allPosts,
  });
}

async function deletePost(id: number, req: Request, res: Response) {
  const postRepo = AppDataSource.getRepository(Post);
  const findOnePost = await postRepo.findOne({ where: { id } });

  if (!findOnePost) return res.status(404).json({ error: "Post not found" });
  await postRepo.delete(id);
  return res.json({ message: "Post deleted successfully", data: findOnePost });
}

async function updatePost(
  id: number,
  author: string,
  body: string,
  req: Request,
  res: Response
) {
  const postRepo = AppDataSource.getRepository(Post);
  const existingPost = await postRepo.findOne({ where: { id } });
  if (!existingPost) return res.status(404).json({ error: "Post not found" });
  if (author) {
    existingPost.author = author;
  }

  if (body) {
    existingPost.body = body;
  }
  const updatedPost = await postRepo.save(existingPost);

  return updatedPost;
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
  insertPost(author, body, req, res);

  return;
});
app.put("/api/posts/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { author, body } = req.body;
  updatePost(id, author, body, req, res);
  return;
});
app.delete("/api/posts/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  deletePost(id, req, res);
  return;
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(port, () => {
      // createDBConnection();
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Database error: ", error);
  });
