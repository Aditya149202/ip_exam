// backend/server7.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5001;

// Enable CORS for cross-origin requests
app.use(cors());
app.use(express.json()); // For parsing application/json

// Dummy course data
const courses = [
    {
        id: 1,
        title: 'Introduction to JavaScript',
        description: 'Learn the fundamentals of JavaScript, the most popular programming language.',
        duration: '4 weeks',
        instructor: 'John Doe'
    },
    {
        id: 2,
        title: 'React for Beginners',
        description: 'Get started with React, a JavaScript library for building user interfaces.',
        duration: '6 weeks',
        instructor: 'Jane Smith'
    },
    {
        id: 3,
        title: 'Node.js Basics',
        description: 'Understand the basics of Node.js and how to build scalable applications.',
        duration: '5 weeks',
        instructor: 'Alice Johnson'
    },
    {
        id: 1,
        title: 'Introduction to JavaScript',
        description: 'Learn the fundamentals of JavaScript, the most popular programming language.',
        duration: '4 weeks',
        instructor: 'John Doe'
    },
    {
        id: 1,
        title: 'Introduction to JavaScript',
        description: 'Learn the fundamentals of JavaScript, the most popular programming language.',
        duration: '4 weeks',
        instructor: 'John Doe'
    },
    {
        id: 1,
        title: 'Introduction to JavaScript',
        description: 'Learn the fundamentals of JavaScript, the most popular programming language.',
        duration: '4 weeks',
        instructor: 'John Doe'
    },
    {
        id: 1,
        title: 'Introduction to JavaScript',
        description: 'Learn the fundamentals of JavaScript, the most popular programming language.',
        duration: '4 weeks',
        instructor: 'John Doe'
    },
    {
        id: 1,
        title: 'Introduction to JavaScript',
        description: 'Learn the fundamentals of JavaScript, the most popular programming language.',
        duration: '4 weeks',
        instructor: 'John Doe'
    },
];

// API route to fetch courses
app.get('/api/courses', (req, res) => {
    res.json(courses);
});

// API route to handle inquiries
app.post('/api/inquiries', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Here, you could save the inquiry to a database or send an email

    res.json({ message: 'Inquiry received successfully!' });
});

// Start server
app.listen(port, () => {
    console.log(`Course Catalog server running on http://localhost:${port}`);
});
