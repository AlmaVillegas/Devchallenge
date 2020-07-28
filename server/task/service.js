import db from'../helpers/db'
const Task = db.Task

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Task.find()
}

async function getById(id) {
    return await Task.findById(id)
}

async function create(Param) {
    console.log(Param.name)
    if (await Task.findOne({ name: Param.name })) {
        throw 'Task "' + Param.name + '" is already taken'
    }
    const task = new Task(Param)
    await task.save()
}

async function update(id, Param) {
    const task = await Task.findById(id)
    if (!task) throw 'Taks not found'
    if (task.name !== Param.name && await Task.findOne({ name: Param.name })) {
        throw 'Task "' + Param.name + '" is already taken'
    }
    await task.save()
}

async function _delete(id) {
    await Task.findByIdAndRemove(id)
}