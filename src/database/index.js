require('dotenv').config()
const mongoose = require('mongoose')


const dataName = process.env.dbName;
const dataUser = process.env.dbUser;
const dataPass = process.env.dbPass;

const connect_string = `mongodb+srv://${dataUser}:${dataPass}@${dataName}.nb89tzm.mongodb.net/?retryWrites=true&w=majority`


try {
    mongoose.connect(connect_string, {})
    console.log('Conectado com sucesso no servidor MongoDb.')
} catch (err) {
    console.log('Não foi possivel conectar-se ao servidor MongoDb, Erro:')
    console.log(err)
}


mongoose.Promise = global.Promise

module.exports = mongoose;

