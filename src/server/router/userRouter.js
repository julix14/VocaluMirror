const express = require("express");
const router = express.Router();
const { json, urlencoded } = require("body-parser");
const connection = require("../database/connectToDatabase");
const bcrypt = require("bcrypt");

router.use(json());
router.use(urlencoded({ extended: true }));

//Retrieve all users
router.get("/user", (req, res) => {
    connection.query("SELECT * FROM users", (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving users from database");
        } else {
            res.status(200).json(result.rows);
        }
    });
});

//Retrieve a single user by ID
router.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    connection.query("SELECT * FROM users WHERE id = $1", [id], (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving user from database");
        } else {
            res.status(200).json(result.rows);
        }
    });
});

//Create a new user
router.post("/user", (req, res) => {
    const { name, email, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    // Check if email already exists in database
    connection.query("SELECT * FROM users WHERE email = $1", [email], (err, result) => {
        if (err) {
            res.status(500).send("Error checking for existing email");
        } else if (result.rows.length > 0) {
            res.status(400).send("User with this Email already exists");
        } else {
            // Email does not exist, create new user
            connection.query(
                "INSERT INTO users (name, email, password) VALUES ($1, $2, $3))",
                [name, email, encryptedPassword],
                (err, result) => {
                    if (err) {
                        res.status(500).send("Error saving user");
                    } else {
                        res.status(200).send("User successfully saved" + result.rows);
                    }
                }
            );
        }
    });
});

//Update a user
router.put("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;
    connection.query(
        "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4",
        [name, email, password, id],
        (err, result) => {
            if (err) {
                res.status(500).send("Error updating user");
            } else {
                res.status(200).send("User successfully updated" + result.rows);
            }
        }
    );
});

//Delete a user
router.delete("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    connection.query("DELETE FROM users WHERE id = $1", [id], (err, result) => {
        if (err) {
            res.status(500).send("Error deleting user");
        } else {
            res.status(200).send("User successfully deleted" + result.rows);
        }
    });
});

//Retrieve all vocabulary for a user
router.get("/user/:userId/vocabulary", (req, res) => {
    const id = parseInt(req.params.userId);
    connection.query(
        "SELECT v.* FROM vocabulary v JOIN vocabulary_user_mapping m ON v.id = m.vocabulary_id WHERE m.user_id = $1",
        [id],
        (err, result) => {
            if (err) {
                res.status(500).send("Error retrieving vocabulary from database");
            } else {
                res.status(200).json(result.rows);
            }
        }
    );
});

//Map a vocabulary to a user
router.post("/user/:userId/vocabulary", (req, res) => {
    const userId = parseInt(req.params.userId);
    const { vocabularyId, stage } = req.body;
    connection.query(
        "INSERT INTO vocabulary_user_mapping (user_id, vocabulary_id, stage) VALUES ($1, $2, $3)",
        [userId, vocabularyId, stage],
        (err, result) => {
            if (err) {
                res.status(500).send("Error saving vocabulary");
            } else {
                res.status(200).send("Vocabulary successfully saved" + result.rows);
            }
        }
    );
});

//Update User Vocabulary Mapping
router.put("/user/:userId/vocabulary/:vocabularyId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const vocabularyId = parseInt(req.params.vocabularyId);
    const { stage } = req.body;
    connection.query(
        "UPDATE vocabulary_user_mapping SET stage = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND vocabulary_id = $3",
        [stage, userId, vocabularyId],
        (err, result) => {
            if (err) {
                res.status(500).send("Error updating vocabulary");
            } else {
                res.status(200).send("Vocabulary successfully updated" + result.rows);
            }
        }
    );
});

//Delete User Vocabulary Mapping
router.delete("/user/:userId/vocabulary/:vocabularyId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const vocabularyId = parseInt(req.params.vocabularyId);
    connection.query(
        "DELETE FROM vocabulary_user_mapping WHERE user_id = $1 AND vocabulary_id = $2",
        [userId, vocabularyId],
        (err, result) => {
            if (err) {
                res.status(500).send("Error deleting vocabulary");
            } else {
                res.status(200).send("Vocabulary successfully deleted" + result.rows);
            }
        }
    );
});

//Retrieve all flashcards for a user
router.get("/user/:userId/flashcard", (req, res) => {
    const id = parseInt(req.params.userId);
    connection.query(
        "SELECT f.* FROM flashcard f JOIN flashcard_user_mapping m ON f.id = m.flashcard_id WHERE m.user_id = $1",
        [id],
        (err, result) => {
            if (err) {
                res.status(500).send("Error retrieving flashcards from database");
            } else {
                res.status(200).json(result.rows);
            }
        }
    );
});

//Map a flashcard to a user
router.post("/user/:userId/flashcard", (req, res) => {
    const userId = parseInt(req.params.userId);
    const { flashcardId } = req.body;
    connection.query(
        "INSERT INTO flashcard_user_mapping (user_id, flashcard_id) VALUES ($1, $2)",
        [userId, flashcardId],
        (err, result) => {
            if (err) {
                res.status(500).send("Error saving flashcard");
            } else {
                res.status(200).send("Flashcard successfully saved" + result.rows);
            }
        }
    );
});

// Update User Flashcard Mapping
router.put("/user/:userId/flashcard/:flashcardId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const flashcardId = parseInt(req.params.flashcardId);
    connection.query(
        "UPDATE flashcard_user_mapping SET updated_at = CURRENT_TIMESTAMP WHERE user_id = $1 AND flashcard_id = $2",
        [userId, flashcardId],
        (err, result) => {
            if (err) {
                res.status(500).send("Error updating flashcard");
            } else {
                res.status(200).send("Flashcard successfully updated" + result.rows);
            }
        }
    );
});

// Delete User Flashcard Mapping
router.delete("/user/:userId/flashcard/:flashcardId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const flashcardId = parseInt(req.params.flashcardId);
    connection.query(
        "DELETE FROM flashcard_user_mapping WHERE user_id = $1 AND flashcard_id = $2",
        [userId, flashcardId],
        (err, result) => {
            if (err) {
                res.status(500).send("Error deleting flashcard");
            } else {
                res.status(200).send("Flashcard successfully deleted" + result.rows);
            }
        }
    );
});

module.exports = router;
