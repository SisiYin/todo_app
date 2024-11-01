import fs from 'fs';
import path from 'path'
import { hash } from 'bcrypt'

import { pool } from './db.js'

const _dirname = import.meta.dirname

const initializeTestDb = () => {
  const sql =fs.readFileSync(path.resolve(_dirname,"../todo.sql"),"utf8");
  pool.query(sql)
}

const insertTestUser = (email,password) => {
  hash(password,10,(error,hashedPassword) => {
    pool.query('insert into account (email,password) values ($1,$2)',[email,hashedPassword] )
  })
}

const getToken = (email) => {
  return sign({user: email},process.env.JWT_SECRET_KEY)
}
export {initializeTestDb, insertTestUser,getToken}