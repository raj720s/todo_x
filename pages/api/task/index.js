import Task from '../../../Models/Task'
import dbConnect from '../../../utils/dbConnect'

export default async (req, res) => {
  const {method} = req

  await dbConnect()

  // post reqs
  if (method === 'POST') {
    try {
      const newTask = await new Task(req.body).save()
      res.status(200).json({
        status: true,
        data: newTask,
        message: 'task created',
      })
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'Server Error',
      })
      console.log(error)
    }
  }

  // get reqs
  if (method === 'GET') {
    try {
      const all_tasks = await Task.find({})
      res.status(200).json({
        status: true,
        data: all_tasks,
        message: 'all tasks found',
      })
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'Server Error',
      })
      console.log(error)
    }
  }
}
