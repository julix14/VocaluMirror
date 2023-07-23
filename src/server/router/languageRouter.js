const express = require("express");
const router = express.Router();
const { json, urlencoded } = require("body-parser");
const connection = require("../database/connectToDatabase");

router.use(json());
router.use(urlencoded({ extended: true }));

router.get("/language", (req, res) => {
    connection.query("SELECT * FROM language", (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving languages from database");
        } else {
            res.status(200).json(result.rows);
        }
    });
});

router.get("/language/:id", (req, res) => {
    const id = parseInt(req.params.id);
    connection.query("SELECT * FROM language WHERE id = $1", [id], (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving language from database");
        } else {
            res.status(200).json(result.rows);
        }
    });
});

router.post("/language", (req, res) => {
    const { name } = req.body;

    // Check if language already exists in database
    connection.query("SELECT * FROM language WHERE name = $1", [name], (err, result) => {
        if (err) {
            res.status(500).send("Error checking for existing language");
        } else if (result.rows.length > 0) {
            res.status(400).send("Language already exists");
        } else {
            // Language does not exist, create new language
            connection.query("INSERT INTO language (name) VALUES ($1)", [name], (err, result) => {
                if (err) {
                    res.status(500).send("Error saving language");
                } else {
                    res.status(200).send("Language successfully saved" + result.rows);
                }
            });
        }
    });
});

router.put("/language/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    connection.query("UPDATE language SET name = $1 WHERE id = $2", [name, id], (err, result) => {
        if (err) {
            res.status(500).send("Error updating language");
        } else {
            res.status(200).send("Language successfully updated" + result.rows);
        }
    });
});

router.delete("/language/:id", (req, res) => {
    const id = parseInt(req.params.id);
    connection.query("DELETE FROM language WHERE id = $1", [id], (err, result) => {
        if (err) {
            res.status(500).send("Error deleting language");
        } else {
            res.status(200).send("Language successfully deleted" + result.rows);
        }
    });
});

module.exports = router;
