import { Router } from "express";
import { ObjectId } from "mongodb";
import db from "../database/createConnection.js"

const pollRouter = Router();

// --- GET ENTIRE POLL-ARRAY --- //
pollRouter.get("/api/polls", async (req, res) => {
    const data = await db.polls.find().toArray()
    res.send({ data: data })
})

// --- PLACE A VOTE ON A SPECIFIC POLL AND OPTION WITHIN --- //
pollRouter.patch("/api/pollVote/:id", async (req, res) => {
    const id = ObjectId(req.params.id)
    const choice = req.body.choice + '.votes'

    const filter = { '_id': id };
    const update = { $inc: { total_votes: 1, [choice]: 1 } }

    const data = await db.polls.updateOne(filter, update)

    if (data.modifiedCount) {
        req.session.voted = true; 
        res.sendStatus(200)
    } else { res.sendStatus(404) }

});

export { pollRouter };