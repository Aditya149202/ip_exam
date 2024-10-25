// src/seventh/course.jsx
import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Grid, Box } from '@mui/material';
import './course.css';
import image from '../assets/courses.jpg';

const CourseCatalog = () => {
    const [courses, setCourses] = useState([]);
    const [inquiry, setInquiry] = useState({ name: '', email: '', message: '' });
    const [responseMessage, setResponseMessage] = useState('');

    // Fetch courses from the backend
    useEffect(() => {
        fetch('http://localhost:5001/api/courses')
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error('Error fetching courses:', error));
    }, []);

    // Handle inquiry form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInquiry((prev) => ({ ...prev, [name]: value }));
    };

    // Handle inquiry form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5001/api/inquiries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inquiry),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setResponseMessage(data.message);
                setInquiry({ name: '', email: '', message: '' }); // Clear form
            })
            .catch((error) => {
                console.error('Error submitting inquiry:', error);
                setResponseMessage('Failed to send inquiry. Please try again.');
            });
    };

    return (
        <Container >
            <Typography variant="h3" component="h1" gutterBottom>
                Online Course Catalog
            </Typography>

            <Box sx={{ display: 'flex', overflowX: 'auto', py: 2,height:'50vh',width:'100%'}}>
                {courses.map((course) => (
                    <Paper
                        key={course.id}
                        elevation={3}
                        sx={{ minWidth: 250, margin: 1, padding: 2, flexShrink: 0 }}
                    >
                        <Typography variant="h5" component="h2">
                            {course.title}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {course.description}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Duration:</strong> {course.duration}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Instructor:</strong> {course.instructor}
                        </Typography>
                       <img src={image} style={{ height :'70%'}} />
                    </Paper>
                ))}
            </Box>

            <Box my={4} component={Paper} elevation={3} p={4} sx>
                <Typography variant="h4" component="h2" gutterBottom>
                    Contact Us
                </Typography>
                <form onSubmit={handleSubmit} className="contact-form">
                    <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={inquiry.name}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Your Email"
                        type="email"
                        name="email"
                        value={inquiry.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Your Message"
                        name="message"
                        value={inquiry.message}
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        rows={4}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Send Inquiry
                    </Button>
                </form>
                {responseMessage && (
                    <Typography variant="body1" color="secondary" mt={2}>
                        {responseMessage}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default CourseCatalog;


