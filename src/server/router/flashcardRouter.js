const express = require("express");
const router = express.Router();
const { json, urlencoded } = require("body-parser");
const prisma = require("../database/connectToDatabase");

router.use(json());
router.use(urlencoded({ extended: true }));

//Retrieve all flashcards
router.get("/flashcard", (req, res) => {
    prisma.flashcard
        .findMany()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send("Error retrieving flashcards from database" + err);
        });
});

//Retrieve a single flashcard by ID
router.get("/flashcard/:id", (req, res) => {
    const id = parseInt(req.params.id);
    prisma.flashcard
        .findUnique({ where: { id: id } })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send("Error retrieving flashcard from database" + err);
        });
});

//Create a new flashcard
router.post("/flashcard", (req, res) => {
    const { question, answer, languageId } = req.body;

    // Check if flashcard already exists in database
    prisma.flashcard
        .findFirst({ where: { question: question, answer: answer, language_id: languageId } })
        .then((result) => {
            if (result) {
                res.status(500).send(
                    "Error creating flashcard: flashcard already exists in database"
                );
            } else {
                prisma.flashcard
                    .create({
                        data: {
                            question: question,
                            answer: answer,
                            language: {
                                connect: {
                                    id: languageId,
                                },
                            },
                        },
                    })
                    .then((result) => {
                        res.status(200).json(result);
                    })
                    .catch((err) => {
                        res.status(500).send("Error creating flashcard" + err);
                    });
            }
        });
});

//Update a flashcard by ID
router.put("/flashcard/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { question, answer, languageId } = req.body;
    prisma.flashcard
        .update({
            where: { id: id },
            data: {
                question: question,
                answer: answer,
                language: {
                    connect: {
                        id: languageId,
                    },
                },
            },
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send("Error updating flashcard" + err);
        });
});

//Delete a flashcard by ID
router.delete("/flashcard/:id", (req, res) => {
    const id = parseInt(req.params.id);
    prisma.flashcard
        .delete({ where: { id: id } })
        .then((result) => {
            res.status(200).send("Flashcard successfully deleted" + result.id);
        })
        .catch((err) => {
            res.status(500).send("Error deleting flashcard" + err);
        });
});

module.exports = router;
