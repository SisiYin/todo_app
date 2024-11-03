import { emptyOrRows } from "../helpers/utils.js"
import { selectAllTasks, insertTask,moveTask } from "../models/Task.js"

export const getTasks = async (req,res,next) => {
  try {
    const result = await selectAllTasks()
    return res.status(200).json(emptyOrRows(result))
  } catch (error) {
    return next(error)
  }
}

export const postTask = async(req,res,next) => {
  try {
    if (!req.body.description || req.body.description.length ===0){
      const error = new Error('Invalid description for task')
      error.statusCode = 400
      return next(error)
    }
    const result = await insertTask(req.body.description)
    return res.status(200).json({id: result.rows[0].id})
  }catch (error) {
    return next(error)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params; // Get task ID from route parameters

    if (!id) {
      const error = new Error('Task ID is required');
      error.statusCode = 400;
      return next(error);
    }

    const result = await moveTask(id);

    if (result.rowCount === 0) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({ id:id });
  } catch (error) {
    return next(error);
  }
};