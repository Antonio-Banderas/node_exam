import { application, Router } from "express";
import session from "express-session";

const sessionRouter = Router();


// --- get current session data --- //
sessionRouter.get("/api/session", async (req, res) => {
    let hasVoted;
    let isAuthenticated;

    if (req.session.voted) { 
         hasVoted = req.session.voted 
    } else { hasVoted = false}

    if (req.session.authenticated) { 
        isAuthenticated = req.session.authenticated 
   } else { isAuthenticated = false}

    res.send({ hasVoted, isAuthenticated })

})


export { sessionRouter }