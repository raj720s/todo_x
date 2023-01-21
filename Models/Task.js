import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.models.taskModel || mongoose.model('taskModel', TaskSchema)
