import express from 'express'
import taskService from './service'
const router = express.Router()

router.post('/create', create)
router.get('/', getAll)
router.get('/current', getCurrent)
router.get('/:id', getById)
router.put('/:id', update)
router.delete('/:id', _delete)

module.exports = router

function create(req, res, next){
    taskService.create(req.body)
    .then(()=> res.json({}))
    .catch(err => next(err))
}

function getAll(req, res, next){
    taskService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err))
}

function getCurrent(req, res, next){
    taskService.update(req.params.id)
    .then(() => res.json({}))
    .catch(err = next(err))
}

function getById(req, res, next){
    taskService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err))
}

function update(req, res, next){
    taskService.update(req.params.id)
    .then(() => res,json({}))
    .catch(err => next(err))
}

function _delete(req, res, next){
    taskService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err))
}