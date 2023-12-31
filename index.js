const express = require('express');
const axios = require('axios');
const cors = require("cors")
require('dotenv').config();

const app = express();
app.use(cors())
const port = 9000;

app.use(express.json());
app.get("/",(req,res)=>{
    console.log("hello");
    res.send("hello")
})

app.get('/shayari', async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt: `Shayari about ${keyword}`,
      max_tokens: 100,
      temperature: 0.7,
      n: 1
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const shayari = response.data.choices[0].text.trim();
    res.json({ shayari });
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});