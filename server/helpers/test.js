import fs from 'fs';
import path from 'path'
import { hash } from 'bcrypt'
import { pool } from './db.js'
import pkg from 'jsonwebtoken'; 
import dotenv from 'dotenv';
dotenv.config();

const { sign } = pkg;

const _dirname = import.meta.dirname

const initializeTestDb = () => {
  const sql =fs.readFileSync(path.resolve(_dirname,"../todo.sql"),"utf8");
  pool.query(sql)
}

// const insertTestUser = (email,password) => {
//   hash(password,10,(error,hashedPassword) => {
//     pool.query('insert into account (email,password) values ($1,$2)',[email,hashedPassword] )
//   })
// }


const insertTestUser = async (email, password) => {
  const hashedPassword = await hash(password, 10);
  await pool.query(
    'INSERT INTO account (email, password) VALUES ($1, $2)',
    [email, hashedPassword]
  );
};

// const insertTestUser = async (email, password) => {
//   const hashedPassword = await new Promise((resolve, reject) => {
//     hash(password, 10, (error, hashed) => {
//       if (error) return reject(error);
//       resolve(hashed);
//     });
//   });

//   await new Promise((resolve, reject) => {
//     pool.query('INSERT INTO account (email, password) VALUES ($1, $2)', [email, hashedPassword], (error) => {
//       if (error) return reject(error);
//       resolve();
//     });
//   });
// };

const getToken = (email) => {
  return sign({user: email},process.env.JWT_SECRET_KEY)
}
export {initializeTestDb, insertTestUser,getToken}