import dotenv from "dotenv";
import express from "express";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import { SessionAuth } from "./middleware/session-auth";
import { Route } from "./routes/route-register";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.set("views", path.join( __dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

new SessionAuth().register(app);
new Route().register(app);

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});
