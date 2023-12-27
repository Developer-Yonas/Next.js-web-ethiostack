const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const Prompt = require('./models/prompt');

const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors());

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

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
});

// Function to fetch the latest prompts from the database
const fetchLatestPrompts = async () => {
  try {
    const prompts = await Prompt.find({}).populate('creator');
    return prompts;
  } catch (error) {
    console.error('Failed to fetch prompts:', error);
    throw error;
  }
};

// API endpoint to fetch prompts
app.get('/api/prompt', async (req, res) => {
  try {
    const prompts = await fetchLatestPrompts();
    res.setHeader('Cache-Control', 'no-store');
    res.json(prompts);
  } catch (error) {
    console.error('Failed to fetch prompts:', error);
    res.status(500).json({ error: 'Failed to fetch prompts' });
  }
});

// Send real-time updates to connected clients
const sendRealTimeUpdates = async () => {
  try {
    const latestPrompts = await fetchLatestPrompts();
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(latestPrompts));
      }
    });
  } catch (error) {
    console.error('Failed to send real-time updates:', error);
  }
};

// Set up change detection in the database to trigger real-time updates
const promptCollection = mongoose.connection.collection('prompts');
const changeStream = promptCollection.watch();
changeStream.on('change', (change) => {
  console.log('Change detected:', change);
  sendRealTimeUpdates();
});

// Serverless function export
module.exports = app;
