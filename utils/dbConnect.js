import mongoose from 'mongoose'

const DB = process.env.DB_URL

if (!DB) {
  throw new Error('DB URL NOT FOUND')
}

let globalMongoose = global.mongoose

if (!globalMongoose) {
  globalMongoose = global.mongoose = {conn: null, promise: null}
}

const dbConnect = async () => {
  if (globalMongoose.conn) {
    console.log('already connected')
    return globalMongoose.conn
  }
  if (!globalMongoose.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    globalMongoose.promise = mongoose.connect(DB, options).then((mongoose) => {
      console.log('connected')
      return mongoose
    })
  }
  globalMongoose.conn = await globalMongoose.promise
  return globalMongoose.conn
}

export default dbConnect
