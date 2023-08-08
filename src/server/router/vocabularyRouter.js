const express = require("express");
const router = express.Router();
const { json, urlencoded } = require("body-parser");
const prisma = require("../database/connectToDatabase");

router.use(json());
router.use(urlencoded({ extended: true }));

router.get("/vocabulary", (req, res) => {
    prisma.vocabulary
        .findMany()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send("Error retrieving vocabulary from database" + err);
        });
});

//Route for matching game vocabulary
router.get("/quizwords", (req, res) => {
    prisma.quizword_view
        .findFirst()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send("Error retrieving vocabulary from database" + err);
        });
});

router.get("/vocabulary/:id", (req, res) => {
    const id = parseInt(req.params.id);
    prisma.vocabulary
        .findUnique({ where: { id: id } })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send("Error retrieving vocabulary from database" + err);
        });
});

router.post("/vocabulary", (req, res) => {
    const { word, meaning, languageId, imgPath } = req.body;

    // Check if word already exists in database
    prisma.vocabulary.findFirst({ where: { word: word } }).then((result) => {
        if (result) {
            res.status(500).send("Error creating word: word already exists in database");
        } else {
            prisma.vocabulary
                .create({
                    data: {
                        word: word,
                        meaning: meaning,
                        language_id: languageId,
                        img_path: imgPath,
                    },
                })
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(500).send("Error creating word" + err);
                });
        }
    });
});

router.put("/vocabulary/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { word, meaning, languageId, imgPath } = req.body;
    prisma.vocabulary
        .update({
            where: { id: id },
            data: { word: word, meaning: meaning, language_id: languageId, img_path: imgPath },
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send("Error updating word" + err);
        });
});

router.delete("/vocabulary/:id", (req, res) => {
    const id = parseInt(req.params.id);
    prisma.vocabulary
        .delete({ where: { id: id } })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send("Error deleting word" + err);
        });
});

module.exports = router;
