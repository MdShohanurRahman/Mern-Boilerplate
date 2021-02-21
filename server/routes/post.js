const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// GET All Post
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts)
    } catch (err) {
        res.json({ message: err})
    }
})

// router.post('/' , (req, res) => {
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     })
//     post.save()
//         .then(data => {
//             res.json(data)
//         })
//         .catch(err => {
//             res.json({ message: err})
//         })
// })


// Submit New Post
router.post('/' , async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    try {
        const savedPost = await post.save()
        res.json(savedPost)
    } catch (err) {
        res.json({ message: err })
    }

})

// GET Specific Post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.json(post)
    }
    catch (err) {
        res.status(404)
        res.send({ code: res.statusCode, message: err})
    }
})

// DELETE Specific Post
router.delete('/:id', async (req, res) => {
    const removePost = await Post.remove({ _id: req.params.id})
    try {
        res.json(removePost)
    } catch (err) {
        res.json({ message: err})
    }
})

//PATCH Specific Post
router.patch('/:id', async (req, res) => {
    try {
        const updatePost = await Post.updateOne(
            { _id: req.params.id },
            { $set: { title: req.body.title } }
        )
        res.json(updatePost)
    } catch (err) {
        res.json({ message: err})
    }
})

module.exports = {
    router: router,
    database: {}
  };