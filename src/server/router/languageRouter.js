const express = require("express");
const router = express.Router();
const { json, urlencoded } = require("body-parser");
const prisma = require("../database/connectToDatabase");

router.use(json());
router.use(urlencoded({ extended: true }));

router.get("/language", (req, res) => {
    prisma.language
        .findMany()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send("Error retrieving languages from database" + err);
        });
});

router.get("/language/:id", (req, res) => {
    const id = parseInt(req.params.id);
    prisma.language
        .findUnique({ where: { id: id } })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send("Error retrieving language from database" + err);
        });
});

router.post("/language", (req, res) => {
    const { name } = req.body;

    // Check if language already exists in database
    prisma.language.findFirst({ where: { name: name } }).then((result) => {
        if (result) {
            res.status(500).send("Error creating language: language already exists in database");
        } else {
            prisma.language
                .create({
                    data: {
                        name: name,
                    },
                })
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((err) => {
                    res.status(500).send("Error creating language" + err);
                });
        }
    });
});

router.put("/language/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    prisma.language
        .update({
            where: { id: id },
            data: {
                name: name,
            },
        })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send("Error updating language" + err);
        });
});

router.delete("/language/:id", (req, res) => {
    const id = parseInt(req.params.id);
    prisma.language
        .delete({ where: { id: id } })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send("Error deleting language" + err);
        });
});

module.exports = router;
