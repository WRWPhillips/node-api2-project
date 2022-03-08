// npm imports
const e = require('express');
const express = require('express');
// model import
const Posts = require('./posts-model');
// initialize router
const router = express.Router();

// create routes
router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({message: "The posts information could not be retrieved"});
    });
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist"});
        }
    })
    .catch(err => {
        res.status(500).json({message: "The post information could not be retrieved"});
    });
});

router.post('/', (req, res) => {
    newPost = req.body;
    !newPost.title | !newPost.contents ? res.status(400).json({message: "Please provide title and contents for the post"}) :
    Posts.insert(newPost)
    .then((id) => {
        newPost.id = id;
        res.status(201).json(newPost);
    })
    .catch(err => {
        res.status(500).json({message: "There was an error while saving the post to the database"});
    });
});

router.post('/:id', (req, res) => {
    const newPost = req.body;
    !newPost.title | !newPost.contents ? res.status(400).json({message: "Please provide title and contents for the post"}) :
    Posts.insert(newPost)
    .then((id) => {
        newPost.id = id;
        res.status(201).json(newPost);
    })
    .catch(err => {
        res.status(500).json({message: "There was an error while saving the post to the database"});
    });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    !changes.title | !changes.contents ? res.status(400).json({message: "Please provide title and contents for the post"}) :
    Posts.update(id, changes)
    .then((post) => {
        if(post) {
            Posts.findById(id)
            .then(updatedPost => {
                res.status(200).json(updatedPost);
            })
            .catch(err => {
                res.status(500).json({message: "here's the problem"})
            });
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist"});
        }
    })
    .catch(err => {
        res.status(500).json({message: "The post information could not be modified"});
    });
});

router.delete('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        !post ? res.status(404).json({message: "The post with the specified ID does not exist"}) :
        res.status(200).json(post);
    })
    Posts.remove(req.params.id)
    .catch(() => {
        res.status(500).json({message: "The post could not be removed"});
    });
})

router.get('/:id/comments', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        !post ? res.status(404).json({message: "The post with the specified ID does not exist"}) :
        Posts.findPostComments(req.params.id)
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(() => {
            res.status(500).json({message: "The comments information could not be retrieved"})
        })
    })
})
// exports
module.exports = router;