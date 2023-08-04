const express = require("express");
const router = express.Router();
const { json, urlencoded } = require("body-parser");
const prisma = require("../database/connectToDatabase");
const bcrypt = require("bcrypt");

router.use(json());
router.use(urlencoded({ extended: true }));

//Retrieve all users
router.get("/user", (req, res) => {
    prisma.user
        .findMany()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send("Error retrieving users from database" + err);
        });
});

//Retrieve a single user by ID
router.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    prisma.user
        .findFirst({ where: { id: id } })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send("Error retrieving user from database" + err);
        });
});

//Retrieve a matching score for a single user by ID
router.get("/user/:id/score", (req, res) => {
    const id = parseInt(req.params.id);
    prisma.user
        .findFirst({ where: { id: id } })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send("Error retrieving matching score from database" + err);
        });
});

//Update a matching score for a single user by ID
router.put("/user/:id/score", (req, res) => {
    const id = parseInt(req.params.id);
    const { matchingScore } = req.body;
    prisma.user
        .update({ where: { id: id }, data: { matching_score: matchingScore } })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send("Error updating user from database" + err);
        });
});

//Create a new user
router.post("/user", (req, res) => {
    const { name, email, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    // Check if email already exists in database
    prisma.user.findUnique({ where: { email: email } }).then((result) => {
        if (result) {
            res.status(409).send("Email already exists");
        } else {
            prisma.user
                .create({
                    data: {
                        name: name,
                        email: email,
                        password: encryptedPassword,
                    },
                })
                .then((result) => {
                    res.status(200).send("User successfully created with the name: " + result.name);
                })
                .catch((err) => {
                    res.status(500).send("Error creating user" + err);
                });
        }
    });
});

//Update a user
router.put("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    prisma.user
        .update({
            where: { id: id },
            data: {
                name: name,
                email: email,
                password: encryptedPassword,
            },
        })
        .then((result) => {
            res.status(200).send("User successfully updated" + result.id);
        })
        .catch((err) => {
            res.status(500).send("Error updating user" + err);
        });
});

//Delete a user
router.delete("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    prisma.user
        .delete({ where: { id: id } })
        .then(() => {
            res.status(200).send("User successfully deleted");
        })
        .catch((err) => {
            res.status(500).send("Error deleting user" + err);
        });
});

//Map vocabulary to a user
router.post("/user/:userId/vocabulary/:vocabularyId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const vocabularyId = parseInt(req.params.vocabularyId);
    prisma.vocabularyOnUser
        .create({
            data: {
                user_id: userId,
                vocabulary_id: vocabularyId,
            },
        })
        .then(() => {
            res.status(200).send("Vocabulary successfully mapped to user");
        })
        .catch((err) => {
            res.status(500).send("Error mapping vocabulary to user" + err);
        });
});

//Retrieve all vocabulary for a user
router.get("/user/:userId/vocabulary", (req, res) => {
    const id = parseInt(req.params.userId);
    prisma.user
        .findUnique({ where: { id: id }, include: { vocabulary: true } })
        .then((result) => {
            res.status(200).json(result.vocabulary);
        })
        .catch((err) => {
            res.status(500).send("Error retrieving vocabulary from database" + err);
        });
});

//Delete User Vocabulary Mapping
router.delete("/user/:userId/vocabulary/:vocabularyId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const vocabularyId = parseInt(req.params.vocabularyId);
    prisma.vocabularyOnUser
        .delete({ where: { user_id: userId, vocabulary_id: vocabularyId } })
        .then(() => {
            res.status(200).send("Vocabulary successfully deleted");
        })
        .catch((err) => {
            res.status(500).send("Error deleting vocabulary" + err);
        });
});

//Retrieve all flashcards for a user
router.get("/user/:userId/flashcard", (req, res) => {
    const id = parseInt(req.params.userId);
    prisma.user.findUnique({ where: { id: id } }).then((user) => {
        if (!user) {
            res.status(404).send("User not found");
            return;
        }

        prisma.flashcardOnUser
            .findMany({
                where: { user_id: id },
                select: { flashcard: true },
            })
            .then((result) => {
                const flashcards = result.map((item) => item.flashcard);

                res.status(200).json(flashcards);
            })
            .catch((err) => {
                res.status(500).send("Error retrieving flashcards from database" + err);
            });
    });
});

//Map a flashcard to a user
router.post("/user/:userId/flashcard", (req, res) => {
    const userId = parseInt(req.params.userId);
    const { flashcardId } = req.body;
    prisma.flashcardOnUser
        .create({ data: { user_id: userId, flashcard_id: flashcardId } })
        .then(() => {
            res.status(200).send("Flashcard successfully mapped to user");
        })
        .catch((err) => {
            res.status(500).send("Error mapping flashcard to user" + err);
        });
});

// Delete User Flashcard Mapping
router.delete("/user/:userId/flashcard/:flashcardId", (req, res) => {
    const userId = parseInt(req.params.userId);
    const flashcardId = parseInt(req.params.flashcardId);
    prisma.flashcardOnUser
        .delete({ where: { user_id: userId, flashcard_id: flashcardId } })
        .then(() => {
            res.status(200).send("Flashcard successfully deleted");
        })
        .catch((err) => {
            res.status(500).send("Error deleting flashcard" + err);
        });
});

module.exports = router;
