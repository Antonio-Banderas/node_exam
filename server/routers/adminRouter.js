import { Router } from "express";
import { ObjectId } from "mongodb";
import db from "../database/createConnection.js"

const adminRouter = Router();

// --- MIDDLEWARE TO CHECK FOR AUTHENTICATION --- //
adminRouter.use((req, res, next) => {
    if (req.session.authenticated) next();
    else {
        res.sendStatus(401);
    }
});

// --- NEW POLL CREATION --- //
adminRouter.post("/api/newPoll", async (req, res) => {
    const {title, option1_title, option2_title} = req.body

    const total_votes = 0;
    const option1_votes = 0;
    const option2_votes = 0;
    const option1 = {title: option1_title, votes: option1_votes}
    const option2 = {title: option2_title, votes: option2_votes}

    const newPoll = await db.polls.insertOne({title, total_votes, option1, option2})
    res.send(newPoll)

    
})

export {adminRouter}