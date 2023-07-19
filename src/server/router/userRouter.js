import { Router, json, urlencoded } from "express";
const router = Router();
import { query } from "../database/connectToDatabase";

router.use(json());
router.use(urlencoded({ extended: true }));

router.get("/user", (req, res) => {
    query("SELECT * FROM users", (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving users from database");
        } else {
            res.status(200).json(result.rows);
        }
    });
});

router.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    query("SELECT * FROM users WHERE id = $1", [id], (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving user from database");
        } else {
            res.status(200).json(result.rows);
        }
    });
});

router.post("/user", (req, res) => {
    const { name, email, password } = req.body;

    // Check if email already exists in database
    query("SELECT * FROM users WHERE email = $1", [email], (err, result) => {
        if (err) {
            res.status(500).send("Error checking for existing email");
        } else if (result.rows.length > 0) {
            res.status(400).send("User with this Email already exists");
        } else {
            // Email does not exist, create new user
            query(
                "INSERT INTO users (name, email, password) VALUES ($1, $2, crypt($3, gen_salt('bf')))",
                [name, email, password],
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

router.put("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;
    query(
        "UPDATE users SET name = $1, email = $2, password = crypt($3, gen_salt('bf')) WHERE id = $4",
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

router.delete("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);
    query("DELETE FROM users WHERE id = $1", [id], (err, result) => {
        if (err) {
            res.status(500).send("Error deleting user");
        } else {
            res.status(200).send("User successfully deleted" + result.rows);
        }
    });
});

export default router;
