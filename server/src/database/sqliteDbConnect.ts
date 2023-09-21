// ------------>OLD way using raw sql<------------

// import express, { Request, Response } from "express";
// import sqlite3 from "sqlite3";
// //DBconnected
// const DB_Files = `./${process.env.NODE_ENV}.sqlite`;

// const db = new sqlite3.Database(
//   DB_Files!,
//   sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE,
//   (error) => {
//     if (error) return console.log(error.message);
//   }
// );

// function createDBConnection() {
//   sqlite3.verbose();
//   createTable();
//   console.log("Connected to SQlite database.");
//   return db;
// }

// function createTable() {
//   db.exec(`CREATE TABLE IF NOT EXISTS posts
//   (
//     Id INTEGER PRIMARY KEY AUTOINCREMENT,
//     author VARCHAR(50) NOT NULL,
//     body VARCHAR(225) NOT NULL
//   )`);
// }

// function insertPost(author: string, body: string) {
//   db.run(
//     `INSERT INTO posts (author, body) VALUES (?,?)`,
//     [author, body],
//     (error) => {
//       if (error) {
//         console.log(error.message);
//         return;
//       }
//       console.log("Create Successfully");
//     }
//   );
// }

// async function getListPost(req: Request, res: Response) {
//   let sql = `select * from posts`;
//   let params: string[] = [];
//   db.all(sql, params, (error, rows) => {
//     if (error) throw new Error(error.message);
//     return res.json({
//       message: "success",
//       data: rows,
//     });
//   });
// }

// function deletePost(id: string, req: Request, res: Response) {
//   db.run("DELETE FROM posts WHERE Id = ?", id, (error) => {
//     if (error) {
//       console.log(error.message);
//       return;
//     }
//     return getListPost(req, res);
//   });
// }

// function updatePost(author: string, body: string, id: string) {
//   db.run(
//     "UPDATE posts SET author = COALESCE(?, author), body = COALESCE(?, body) WHERE Id = ?",
//     [author, body, id],
//     (error) => {
//       if (error) console.log("Updated fail please try again");
//     }
//   );
// }
