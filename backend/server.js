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
        // Query the table named after the UID, only get flashcards where ActiveInactive is true
        const result = await pool.query(`SELECT UniqueFlashID, Question, Answer, Date FROM ${uid} WHERE "ActiveInactive" = true`);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No active flashcards found for this UID' });
        }

        // Group the flashcards by date
        const flashcardsByDate = result.rows.reduce((acc, row) => {
            const date = row.date; // Extract the date from the current row
            if (!acc[date]) { // If the date is not already a key in the accumulator object
                acc[date] = []; // Initialize it with an empty array
            }
            // Push the current flashcard (question and answer) into the array for the corresponding date
            acc[date].push({
                id: row.uniqueflashid,
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

app.post('/get-by-group', async (req, res) => {
    const { uid } = req.body;  // Extract uid from the frontend

    if (!uid) {
        return res.status(400).json({ error: 'UID is required' });
    }

    try {
        // Query the table named after the UID, fetching Group, Question, Answer, and ensuring ActiveInactive is true
        const result = await pool.query(`SELECT UniqueFlashID, Question, Answer, "Group" FROM ${uid} WHERE "ActiveInactive" = true`);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No active flashcards found for this UID' });
        }

        // Group the flashcards by 'Group'
        const flashcardsByGroup = result.rows.reduce((acc, row) => {
            const group = row.Group || 'Ungrouped';  // Handle case where 'Group' might be null or undefined
            if (!acc[group]) {  // If the group is not already a key in the accumulator object
                acc[group] = [];  // Initialize it with an empty array
            }
            // Push the current flashcard (question and answer) into the array for the corresponding group
            acc[group].push({
                id: row.uniqueflashid,
                question: row.question,
                answer: row.answer
            });
            return acc;  // Return the accumulator for the next iteration
        }, {});  // Initialize the accumulator as an empty object

        // Send the response back to the frontend as a JSON object
        res.json({ groups: flashcardsByGroup });

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

// !!!!!Endpoint to permanently delete a flashcard from the user's table permanently
app.post('/private-delete-flashcard', async (req, res) => {
    const { uid, flashcardID } = req.body;  // Extract uid and flashcardID from the frontend

    if (!uid || !flashcardID) {
        return res.status(400).json({ error: 'UID and flashcardID are required' });
    }

    try {
        // Delete the flashcard with the given UniqueFlashID from the uid's table
        const deleteFlashcardQuery = `
            DELETE FROM ${uid}
            WHERE "UniqueFlashID" = $1;
        `;

        const result = await pool.query(deleteFlashcardQuery, [flashcardID]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Flashcard not found' });
        }

        // Send response back to the frontend
        res.status(200).json({ message: 'Flashcard permanently deleted successfully.' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Endpoint to soft delete a flashcard (set as inactive)
app.post('/delete-flashcard', async (req, res) => {
    const { uid, flashcardID } = req.body;  // Extract uid and flashcardID from the frontend

    if (!uid || !flashcardID) {
        return res.status(400).json({ error: 'UID and flashcardID are required' });
    }

    try {
        // Update the flashcard's status to inactive in the uid's table
        const softDeleteFlashcardQuery = `
            UPDATE ${uid}
            SET "ActiveInactive" = false
            WHERE "UniqueFlashID" = $1;
        `;

        const result = await pool.query(softDeleteFlashcardQuery, [flashcardID]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Flashcard not found' });
        }

        // Send response back to the frontend
        res.status(200).json({ message: 'Flashcard marked as inactive successfully.' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});


// !!!!!Endpoint to delete the table associated with a given UID (No authentication for now) permanently
app.post('/private-delete-table', async (req, res) => {
    const { uid } = req.body;  // Extract uid from the frontend

    if (!uid) {
        return res.status(400).json({ error: 'UID is required' });
    }

    try {
        // SQL query to drop the table named after the UID
        const dropTableQuery = `DROP TABLE IF EXISTS ${uid};`;

        await pool.query(dropTableQuery);

        // Send response back to the frontend
        res.status(200).json({ message: `Table '${uid}' was successfully deleted.` });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// gets all the deleted flashcards
app.post('/get-trash', async (req, res) => {
    const { uid } = req.body;  // Extract uid from the frontend

    if (!uid) {
        return res.status(400).json({ error: 'UID is required' });
    }

    try {
        // Query the table named after the UID, only get flashcards where ActiveInactive is false (inactive flashcards)
        const result = await pool.query(`SELECT UniqueFlashID, Question, Answer, Date FROM ${uid} WHERE "ActiveInactive" = false`);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No inactive flashcards found for this UID' });
        }

        // Group the flashcards by date
        const flashcardsByDate = result.rows.reduce((acc, row) => {
            const date = row.date; // Extract the date from the current row
            if (!acc[date]) { // If the date is not already a key in the accumulator object
                acc[date] = []; // Initialize it with an empty array
            }
            // Push the current flashcard (question and answer) into the array for the corresponding date
            acc[date].push({
                id: row.uniqueflashid,
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

app.post('/move-group', async (req, res) => {
    const { uid, flashcardID, toGroup } = req.body;  // Extract uid, flashcardID, and toGroup from the frontend

    if (!uid || !flashcardID || !toGroup) {
        return res.status(400).json({ error: 'UID, flashcardID, and toGroup are required' });
    }

    try {
        // SQL query to update the Group of the flashcard with the given flashcardID
        const updateGroupQuery = `
            UPDATE ${uid}
            SET "Group" = $1
            WHERE "UniqueFlashID" = $2
            RETURNING *;
        `;

        const result = await pool.query(updateGroupQuery, [toGroup, flashcardID]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }

        // Send the response back to the frontend
        res.status(200).json({ message: `Flashcard moved to group '${toGroup}' successfully.` });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/update-question', async (req, res) => {
    const { uid, flashcardID, newQuestion } = req.body;  // Extract uid, flashcardID, and newQuestion from the frontend

    if (!uid || !flashcardID || !newQuestion) {
        return res.status(400).json({ error: 'UID, flashcardID, and newQuestion are required' });
    }

    try {
        // SQL query to update the Question of the flashcard with the given flashcardID
        const updateQuestionQuery = `
            UPDATE ${uid}
            SET "Question" = $1
            WHERE "UniqueFlashID" = $2
            RETURNING *;
        `;

        const result = await pool.query(updateQuestionQuery, [newQuestion, flashcardID]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }

        // Send the response back to the frontend
        res.status(200).json({ message: 'Flashcard question updated successfully.' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/update-answer', async (req, res) => {
    const { uid, flashcardID, newAnswer } = req.body;  // Extract uid, flashcardID, and newAnswer from the frontend

    if (!uid || !flashcardID || !newAnswer) {
        return res.status(400).json({ error: 'UID, flashcardID, and newAnswer are required' });
    }

    try {
        // SQL query to update the Answer of the flashcard with the given flashcardID
        const updateAnswerQuery = `
            UPDATE ${uid}
            SET "Answer" = $1
            WHERE "UniqueFlashID" = $2
            RETURNING *;
        `;

        const result = await pool.query(updateAnswerQuery, [newAnswer, flashcardID]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }

        // Send the response back to the frontend
        res.status(200).json({ message: 'Flashcard answer updated successfully.' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));