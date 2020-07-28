import mongoose from 'mongoose'
const url = 'mongodb://localhost:27017/myapp'
const connectionOptions = { 
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
  }
mongoose.connect(url, connectionOptions).then(()=>{ 
    console.log('Conectado a Db')},
    err => { console.log(err)}
)

module.exports = {
  User: require('../users/model'),
  Task: require('../task/model')
}