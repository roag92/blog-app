import session from 'express-session';
import * as express from 'express';

import { IRegister } from '../core/register-interface';

export const COOKIE_NAME = 'session-id';
export const SESSION_ID = 'user'

export class SessionRegister implements IRegister {
    public register(app: express.Application): void {
        app.use(session({
            resave: true,
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET,
            name: COOKIE_NAME,
            cookie: {
                expires: new Date(new Date().getMinutes() + new Date().setMinutes(15)),
                maxAge: 900,
            }
        }));

        app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (req.path === '/logout') {
                next();

                return;
            }

            if (
                req.path !== '/login' &&
                !req.cookies[COOKIE_NAME] &&
                !req.session[SESSION_ID]
            ) {
                res.redirect('/login');

                return;
            }

            next();
        });
    }
}
