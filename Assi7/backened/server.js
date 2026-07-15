const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/feedbackDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// model
const Feedback = mongoose.model('Feedback', {
  name: String,
  message: String
});

// add feedback
app.post('/feedback', async (req, res) => {
  try {
    const f = await Feedback.create(req.body);
    res.json(f);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get feedback
app.get('/feedback', async (req, res) => {
  const list = await Feedback.find();
  res.json(list);
});

// start server
app.listen(5000, () => console.log('Server running on port 5000'));
