const express = require('express');
const WebSocket = require('ws'); // Use 'ws' for WebSocket server
const mongoose = require('mongoose');
const Prompt = require('./models/prompt');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://ethiostack.vercel.app/share_prompt', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a WebSocket server
const wss = new WebSocket.Server({
  noServer: true,
  verifyClient: (info, callback) => {
    // Add logic to verify the origin, e.g., check against a whitelist
    const isValid = /* Your logic to validate the origin */;
    callback(isValid);
  },
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', function connection(ws, req) {
  console.log('A new client connected');

  // Add logic to handle CORS, e.g., check req.headers.origin

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
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
