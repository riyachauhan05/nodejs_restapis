const express = require('express');
const app = express();

app.use(express.json());

let posts = [
    { id: 1, title: 'Post 1', content: 'This is the first post' },
    { id: 2, title: 'Post 2', content: 'This is the second post' },
];

// Get all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Get a specific post by ID
app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');
    res.json(post);
});

// Create a new post
app.post('/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// Update a post by ID
app.put('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');
    
    post.title = req.body.title;
    post.content = req.body.content;
    res.json(post);
});

// Delete a post by ID
app.delete('/posts/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (postIndex === -1) return res.status(404).send('Post not found');
    
    posts.splice(postIndex, 1);
    res.status(204).send(); // 204 No Content
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
