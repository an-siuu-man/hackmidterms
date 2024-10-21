const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const origin = process.env.ORIGIN || 'http://localhost:3000';

// Enable CORS for frontend
app.use(cors({ origin }));

// Middleware to parse JSON request body
app.use(express.json());

app.post('/api/hello', (req, res) => {
    const { name, sexx } = req.body;  // Destructure name from request body
    res.send({ express: `Hello ${name} from ${sexx}` });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
