const express = require("express");
const router = express.Router();
const { json, urlencoded } = require("body-parser");
const connection = require("../database/connectToDatabase");

router.use(json());
router.use(urlencoded({ extended: true }));

//Retrieve all flashcards
router.get("/flashcard", (req, res) => {
    connection.query("SELECT * FROM flashcard", (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving flashcards from database");
        } else {
            res.status(200).json(result.rows);
        }
    });
});

//Retrieve a single flashcard by ID
router.get("/flashcard/:id", (req, res) => {
    const id = parseInt(req.params.id);
    connection.query("SELECT * FROM flashcard WHERE id = $1", [id], (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving flashcard from database");
        } else {
            res.status(200).json(result.rows);
        }
    });
});

//Create a new flashcard
router.post("/flashcard", (req, res) => {
    const { question, answer, languageId } = req.body;

    // Check if flashcard already exists in database
    connection.query(
        "SELECT * FROM flashcard WHERE question = $1 AND language_id = $2",
        [question, languageId],
        (err, result) => {
            if (err) {
                res.status(500).send("Error checking for existing flashcard");
            } else if (result.rows.length > 0) {
                res.status(400).send("Flashcard already exists");
            } else {
                // Flashcard does not exist, create new flashcard
                connection.query(
                    "INSERT INTO flashcard (question, answer, language_id) VALUES ($1, $2, $3)",
                    [question, answer, languageId],
                    (err, result) => {
                        if (err) {
                            res.status(500).send("Error saving flashcard");
                        } else {
                            res.status(200).send("Flashcard successfully saved" + result.rows);
                        }
                    }
                );
            }
        }
    );
});

//Update a flashcard by ID
router.put("/flashcard/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { question, answer, languageId } = req.body;
    connection.query(
        "UPDATE flashcard SET question = $1, answer = $2, language_id = $3 WHERE id = $4",
        [question, answer, languageId, id],
        (err, result) => {
            if (err) {
                res.status(500).send("Error updating flashcard");
            } else {
                res.status(200).send("Flashcard successfully updated" + result.rows);
            }
        }
    );
});

//Delete a flashcard by ID
router.delete("/flashcard/:id", (req, res) => {
    const id = parseInt(req.params.id);
    connection.query("DELETE FROM flashcard WHERE id = $1", [id], (err, result) => {
        if (err) {
            res.status(500).send("Error deleting flashcard");
        } else {
            res.status(200).send("Flashcard successfully deleted" + result.rows);
        }
    });
});

module.exports = router;
