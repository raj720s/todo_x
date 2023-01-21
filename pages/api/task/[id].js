import Task from '../../../Models/Task'
import dbConnect from '../../../utils/dbConnect'

export default async (req, res) => {
  const {method} = req
  const {id} = req.query
  await dbConnect()
  //  reqs
  if (method === 'PUT') {
    try {
      const update = await Task.findByIdAndUpdate(id, {$set: req.body}, {new: true})
      res.status(200).json({
        status: true,
        data: update,
        message: 'trask updated',
      })
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'Server Error',
      })
      console.log(error)
    }
  }

  // delete reqs
  if (method === 'DELETE') {
    try {
      const del = await Task.findByIdAndDelete(id)
      res.status(200).json({
        status: true,
        message: ' task deleted',
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
