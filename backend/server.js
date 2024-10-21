const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const origin = process.env.ORIGIN || 'http://localhost:3000';
const pool = require('./db');

app.use(cors({ origin }));

app.use(express.json());

// Getting Flashcards from the database sorted by date
app.post('/get-by-date', async (req, res) => {
    const { uid } = req.body;  // Extract uid from the frontend

    if (!uid) {
        return res.status(400).json({ error: 'UID is required' });
    }

    try {
        // Query the table named after the UID
        const result = await pool.query(`SELECT question, answer, date FROM ${uid}`);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No flashcards found for this UID' });
        }

        // Group the flashcards by date
        const flashcardsByDate = result.rows.reduce((acc, row) => {
            const date = row.date;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push({
                question: row.question,
                answer: row.answer
            });
            return acc;
        }, {});

        // Send the response back to the frontend as a JSON object
        res.json({ dates: flashcardsByDate });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
