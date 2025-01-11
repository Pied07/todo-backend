const express = require('express')
const Tasks = require('../models/todo')

const router = express.Router()

router.post('/', async(req,res) => {
    const {task} = req.body
    try {
        const todo = await Tasks.create({task:task})
        res.status(201).json(todo)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/', async(req,res) => {
    try {
        const tasks = Tasks.findAll({
            order: [['id','ASC']]
        })
        const plainTasks = (await tasks).map(task => task.toJSON())
        res.json(plainTasks)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.delete('/:id', async(req,res) => {
    const {id} = req.params
    try {
        const task = await Tasks.findByPk(id)
        if (!task) {
            return res.status(404).json({error:"Task not Found"})
        }
        await task.destroy()
        res.send("Task Deleted")
    } catch (error) {
        res.status(500).json({error:error})
    }
})

router.patch('/:id', async(req,res) => {
    const {id} = req.params

    try {
        const taskToUpdate = await Tasks.findByPk(id)
        if (!taskToUpdate) {
            return res.status(404).json({message: "No Task of the id found!!!"})
        }
        taskToUpdate.status = !taskToUpdate.status

        await taskToUpdate.save()

        res.send("Task Updated")
    } catch (error) {
        console.log(error)
    }
})

module.exports = router