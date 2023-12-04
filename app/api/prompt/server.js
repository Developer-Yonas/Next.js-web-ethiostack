const express = require('express');
const WebSocket = require('ws'); // Use 'ws' for WebSocket server
const mongoose = require('mongoose');
const Prompt = require('./models/prompt');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://ethiostack.vercel.app/share_prompt', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('A new client connected');
});

// API endpoint to fetch prompts
app.get('/api/prompt', async (req, res) => {
  try {
    const prompts = await Prompt.find({}).populate('creator');
    res.setHeader('Cache-Control', 'no-store'); // Add cache-control header to disable caching
    res.json(prompts);
  } catch (error) {
    console.error('Failed to fetch prompts:', error); // Log the error
    res.status(500).json({ error: 'Failed to fetch prompts' });
  }
});


// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
