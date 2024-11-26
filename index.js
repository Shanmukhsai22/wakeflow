const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Token validation middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing' });
  }

  // Example validation logic
  // if (token !== 'your-secure-token') {
  //   return res.status(403).json({ error: 'Invalid token' });
  // }

  next();
}

// Define routes
app.get('/functions/base64Encode', (req, res) => {
  res.json({
    name: "base64Encode",
    description: "Encode anything to base64",
    input: {
      type: "string",
      description: "Input the data you'd like to encode to base64",
      example: "Hello, world"
    },
    output: {
      type: "string",
      description: "Base64 encoded string",
      example: "SGVsbG8sIHdvcmxk"
    }
  });
});

app.post('/functions/base64Encode', authenticateToken, (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'Input is required' });
  }

  const output = Buffer.from(input).toString('base64');
  res.json({ output });
});

// Export as a serverless function
module.exports = app;
