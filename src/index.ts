import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { SessionRegister } from './middleware/session-register';
import { RouteRegister } from './routes/route-register';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

new SessionRegister().register(app);
new RouteRegister().register(app);

app.listen(port, () => {
    console.info( `server started at http://localhost:${ port }` );
});
