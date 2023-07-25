const express = require("express");
const router = express.Router();
const { json, urlencoded } = require("body-parser");
const connection = require("../database/connectToDatabase");

router.use(json());
router.use(urlencoded({ extended: true }));

router.get("/vocabulary", (req, res) => {
    connection.query("SELECT * FROM vocabulary", (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving vocabulary from database");
        } else {
            res.status(200).json(result.rows);
        }
    });
});

//Route for matching game vocabulary
router.get("/matching", (req, res) => {
    connection.query("SELECT * FROM matching_game_view", (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving vocabulary from database");
        }
        res.status(200).json(result.rows);
    });
});

router.get("/vocabulary/:id", (req, res) => {
    const id = parseInt(req.params.id);
    connection.query("SELECT * FROM vocabulary WHERE id = $1", [id], (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving vocabulary from database");
        } else {
            res.status(200).json(result.rows);
        }
    });
});

router.post("/vocabulary", (req, res) => {
    const { word, meaning, languageId, imgPath } = req.body;

    // Check if word already exists in database
    connection.query(
        "SELECT * FROM vocabulary WHERE word = $1 AND language_id = $2",
        [word, languageId],
        (err, result) => {
            if (err) {
                res.status(500).send("Error checking for existing word");
            } else if (result.rows.length > 0) {
                res.status(400).send("Word already exists");
            } else {
                // Word does not exist, create new word
                connection.query(
                    "INSERT INTO vocabulary (word, meaning, language_id, img_path) VALUES ($1, $2, $3, $4)",
                    [word, meaning, languageId, imgPath],
                    (err, result) => {
                        if (err) {
                            res.status(500).send("Error saving word");
                        } else {
                            res.status(200).send("Word successfully saved" + result.rows);
                        }
                    }
                );
            }
        }
    );
});

router.put("/vocabulary/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { word, meaning, languageId, imgPath } = req.body;
    connection.query(
        "UPDATE vocabulary SET word = $1, meaning = $2, language_id = $3, img_path = $4 WHERE id = $5",
        [word, meaning, languageId, imgPath, id],
        (err, result) => {
            if (err) {
                res.status(500).send("Error updating word");
            } else {
                res.status(200).send("Word successfully updated" + result.rows);
            }
        }
    );
});

router.delete("/vocabulary/:id", (req, res) => {
    const id = parseInt(req.params.id);
    connection.query("DELETE FROM vocabulary WHERE id = $1", [id], (err, result) => {
        if (err) {
            res.status(500).send("Error deleting word");
        } else {
            res.status(200).send("Word successfully deleted" + result.rows);
        }
    });
});

module.exports = router;
