import {pool} from '../helpers/db.js'

export const selectAllTasks = async () => {
  return await pool.query('select * from task')
}

export const insertTask = async(description) => {
  return await pool.query('insert into task (description) values ($1) returning *',[description])
}

export const moveTask = async (id) => {
  // const id = parseInt(req.params.id)
  return await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [id]);
};
