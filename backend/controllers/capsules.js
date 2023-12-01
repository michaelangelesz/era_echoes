const router = require('express').Router()
const db = require("../models")

const { Capsule, Comment, User } = db

router.post('/', async (req, res) => {
    if (!req.body.pic) {
        req.body.pic = 'http://placekitten.com/400/400'
    }
    if (!req.body.city) {
        req.body.city = 'Anytown'
    }
    if (!req.body.state) {
        req.body.state = 'USA'
    }
    const capsule = await Capsule.create(req.body)
    res.json(capsule)
})


router.get('/', async (req, res) => {
    const capsules = await Capsule.findAll()
    res.json(capsules)
})


router.get('/:capsuleId', async (req, res) => {
    let capsuleId = Number(req.params.capsuleId)
    if (isNaN(capsuleId)) {
        res.status(404).json({ message: `Invalid id "${capsuleId}"` })
    } else {
        const capsule = await Capsule.findOne({
            where: { capsuleId: capsuleId },
            include: {
                association: 'comments',
                include: 'author'
            }
        })
        if (!capsule) {
            res.status(404).json({ message: `Could not find capsule with id "${capsuleId}"` })
        } else {
            res.json(capsule)
        }
    }
})

router.put('/:capsuleId', async (req, res) => {
    let capsuleId = Number(req.params.capsuleId)
    if (isNaN(capsuleId)) {
        res.status(404).json({ message: `Invalid id "${capsuleId}"` })
    } else {
        const capsule = await Capsule.findOne({
            where: { capsuleId: capsuleId },
        })
        if (!capsule) {
            res.status(404).json({ message: `Could not find capsule with id "${capsuleId}"` })
        } else {
            Object.assign(capsule, req.body)
            await capsule.save()
            res.json(capsule)
        }
    }
})

router.delete('/:capsuleId', async (req, res) => {
    let capsuleId = Number(req.params.capsuleId)
    if (isNaN(capsuleId)) {
        res.status(404).json({ message: `Invalid id "${capsuleId}"` })
    } else {
        const capsule = await Capsule.findOne({
            where: {
                capsuleId: capsuleId
            }
        })
        if (!capsule) {
            res.status(404).json({ message: `Could not find capsule with id "${capsuleId}"` })
        } else {
            await capsule.destroy()
            res.json(capsule)
        }
    }
})

router.post('/:capsuleId/comments', async (req, res) => {
    const capsuleId = Number(req.params.capsuleId)

    req.body.rant = req.body.rant ? true : false

    const capsule = await Capsule.findOne({
        where: { capsuleId: capsuleId }
    })

    if (!capsule) {
        res.status(404).json({ message: `Could not find capsule with id "${capsuleId}"` })
    }

    const author = await User.findOne({
        where: { userId: req.body.authorId }
    })

    if (!author) {
        res.status(404).json({ message: `Could not find author with id "${req.body.authorId}"` })
    }

    const comment = await Comment.create({
        ...req.body,
        capsuleId: capsuleId
    })

    res.send({
        ...comment.toJSON(),
        author
    })
})

router.delete('/:capsuleId/comments/:commentId', async (req, res) => {
    let capsuleId = Number(req.params.capsuleId)
    let commentId = Number(req.params.commentId)

    if (isNaN(capsuleId)) {
        res.status(404).json({ message: `Invalid id "${capsuleId}"` })
    } else if (isNaN(commentId)) {
        res.status(404).json({ message: `Invalid id "${commentId}"` })
    } else {
        const comment = await Comment.findOne({
            where: { commentId: commentId, capsuleId: capsuleId }
        })
        if (!comment) {
            res.status(404).json({ message: `Could not find comment with id "${commentId}" for capsule with id "${capsuleId}"` })
        } else {
            await comment.destroy()
            res.json(comment)
        }
    }
})


module.exports = router