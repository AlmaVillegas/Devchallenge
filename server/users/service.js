import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import db from'../helpers/db'
import Config from '../config.json'
const User = db.User

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username })
    const pass = bcrypt.compareSync(password, user.hash)
    if (pass){
        const token = jwt.sign({ sub: user.id }, Config.secret, { expiresIn: '7d' })
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await User.find()
}

async function getById(id) {
    return await User.findById(id)
}

async function create(userParam) {
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken'
    }
    const user = new User(userParam)
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10)
        console.log(user.hash)
    }
    await user.save()
}

async function update(id, userParam) {
    const user = await User.findById(id)
    if (!user) throw 'User not found'
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken'
    }
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }
    Object.assign(user, userParam)
    await user.save()
}

async function _delete(id) {
    await User.findByIdAndRemove(id)
}