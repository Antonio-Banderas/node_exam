import { Router } from "express";
import { compare } from "bcrypt"
import db from "../database/createConnection.js"

const loginRouter = Router();

// --- login with check to database --- //
loginRouter.post("/api/login", async (req, res) => {

    const password = req.body.password
    if (!password) res.sendStatus(401).send()

    const administratorDB = await db.admins.find().toArray()
    const isValid = await compare(password, administratorDB[0].password)
    if (isValid) {
        req.session.authenticated = true;
        res.sendStatus(200)
    } else {
        res.sendStatus(401)
    }
})

// --- logout if logged in --- //
loginRouter.post("/api/logout", async (req, res) => {
    if (req.session.authenticated === true) {
        delete req.session.authenticated
        res.sendStatus(200)
    } else { res.sendStatus(400) }
})

export { loginRouter }