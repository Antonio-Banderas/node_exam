import express from "express";
import path from "path";
import session from "express-session"
import cors from "cors";
import helmet from "helmet";
import http from "http";
import { Server } from "socket.io";
import { adminRouter } from "./routers/adminRouter.js";
import { loginRouter } from "./routers/loginRouter.js";
import { pollRouter } from "./routers/pollRouter.js";
import { sessionRouter } from "./routers/sessionRouter.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.resolve("../client/dist")));
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors({ credentials: true, origin: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, }
}));

// -------- ROUTES --------- //
app.use('/admin', adminRouter)
app.use('/login', loginRouter)
app.use('/poll', pollRouter)
app.use('/session', sessionRouter)

// ------ SOCKET.IO ------ //

let count;

io.on('connection', (socket) => {
    socket.on("newCountToServer", (data) => {
        count = data.newCount
        count++
        io.emit("newCountFromServer", { count });
    })
    socket.on("newPollfromClient", (socket) => {
        io.emit("newPollFromServer")
    })
});


// ------- PORT ------- //
const PORT = 8080 || process.env.PORT;
server.listen(PORT, () => console.log("Server is running on port", PORT));