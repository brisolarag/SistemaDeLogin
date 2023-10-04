const UserModel = require('./models/User')
const bcript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('./config/auth.json')

const generateToken = (user = {}) => {
    return jwt.sign({
        id: user.id,
        name: user.name
    }, authConfig.secret, {
        expiresIn: 86400
    })
}

const routes = {
    createUser: async (req,res) => {

        const {email} = req.body

        if (await UserModel.findOne({email})) {
            return res.status(404).json({
                error:true,
                msg:"Já existe um usuário com este email"
            })
        }

        const user = await UserModel.create(req.body)
        user.password = undefined

        res.status(200).json({
            error:false,
            msg:"Usuário criado com sucesso",
            data:User,
            token: generateToken(user)
        })
    },

    authenticate: async (req,res) => {
        const {email, password} = req.body

        const user = await UserModel.findOne({email}).select("+password");

        if (!user) {
            return res.status(400).json({
                error:true,
                msg:"Email não cadastrado."
            })
        }

        if (!await bcript.compare(password, user.password)) {
            return res.status(400).json({
                error:true,
                msg:"Invalid password."
            })
        }

        user.password = undefined

        

        return res.status(200).json({
            user,
            token: generateToken(user)
        })
    }
}


module.exports = routes