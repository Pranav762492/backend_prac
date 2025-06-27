const axios = require('axios');
require('dotenv').config();

// POST /generate-text
// Expects: { "text": "your prompt here" }
// Returns: { "output": "..." } or error
exports.generateText = async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required in the request body.' });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'DeepSeek API key not configured.' });
  }

  try {
    const response = await axios.post(
      'https://api.deepseek.com/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: text }
        ],
        stream: false
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const output = response.data?.choices?.[0]?.message?.content;
    if (!output) {
      return res.status(502).json({ error: 'No output returned from DeepSeek.' });
    }
    res.json({ output });
  } catch (error) {
    console.error('DeepSeek API error:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate text.', details: error?.response?.data || error.message });
  }
};
