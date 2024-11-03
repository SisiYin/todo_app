import {pool} from '../helpers/db.js'

const SelectAllTasks = async () => {
  return await pool.query('select * from task')
}

