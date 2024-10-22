const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const origin = process.env.ORIGIN || 'http://localhost:3000';
const pool = require('./db');

app.use(cors({ origin }));

app.use(express.json());


// Creating a new table for when a new user signs up
app.post('/create-user', async (req, res) => {
    const { uid } = req.body;  // Extract uid from the frontend

    if (!uid) {
        return res.status(400).json({ error: 'UID is required' });
    }

    try {
        // Create the table dynamically with the name of the uid
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS ${uid} (
                "UniqueFlashID" SERIAL PRIMARY KEY,
                "Question" TEXT NOT NULL,
                "Answer" TEXT NOT NULL,
                "Date" DATE NOT NULL,
                "Group" TEXT,
                "ActiveInactive" BOOLEAN DEFAULT true
            );
        `;

        await pool.query(createTableQuery);

        // Send response back to the frontend
        res.status(200).json({ message: `User's table '${uid}' was created successfully.` });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Getting Flashcards from the database sorted by date
app.post('/get-by-date', async (req, res) => {
    const { uid } = req.body;  // Extract uid from the frontend

    if (!uid) {
        return res.status(400).json({ error: 'UID is required' });
    }

    try {
        // Query the table named after the UID
        const result = await pool.query(`SELECT Question, Answer, Date FROM ${uid}`);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No flashcards found for this UID' });
        }

        // Group the flashcards by date
        const flashcardsByDate = result.rows.reduce((acc, row) => {
            const date = row.date; // Extract the date from the current row
            if (!acc[date]) { // If the date is not already a key in the accumulator object
            acc[date] = []; // Initialize it with an empty array
            }
            // Push the current flashcard (question and answer) into the array for the corresponding date
            acc[date].push({
            question: row.question,
            answer: row.answer
            });
            return acc; // Return the accumulator for the next iteration
        }, {}); // Initialize the accumulator as an empty object

        // Send the response back to the frontend as a JSON object
        res.json({ dates: flashcardsByDate });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Endpoint to add a flashcard to the user's table
app.post('/add-flashcard', async (req, res) => {
    const { uid, question, answer } = req.body;  // Extract uid, question, and answer from the frontend

    if (!uid || !question || !answer) {
        return res.status(400).json({ error: 'UID, Question, and Answer are required' });
    }

    try {
        // Insert a new flashcard into the table named after the uid
        const insertFlashcardQuery = `
            INSERT INTO ${uid} ("Question", "Answer", "Date", "Group", "ActiveInactive")
            VALUES ($1, $2, CURRENT_DATE, 'Ungrouped', true)
            RETURNING *;
        `;

        const result = await pool.query(insertFlashcardQuery, [question, answer]);

        // Send response back to the frontend
        res.status(201).json({ message: 'Flashcard added successfully', flashcard: result.rows[0] });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});


app.listen(port, () => console.log(`Listening on port ${port}`));
