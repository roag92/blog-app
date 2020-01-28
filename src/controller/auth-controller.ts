import * as express from 'express';

import { SESSION_ID, COOKIE_NAME } from '../middleware/session-register';
import { getDatabase } from '../core/database';
import { Route } from '../core/route';
import { BaseController, HTTP_POST, HTTP_GET } from '../core/abstract-controller';

export class AuthController extends BaseController {
    constructor() {
        super();

        this.mapRoutes([
            new Route('/login', HTTP_GET, this.getLogin.bind(this)),
            new Route('/login', HTTP_POST, this.postLogin.bind(this)),
            new Route('/logout', HTTP_GET, this.getLogout.bind(this)),
        ]);
    }

    private getLogin(req: express.Request, res: express.Response): void {
        res.render('login', { error: null });
    }

    private async postLogin(req: express.Request, res: express.Response): Promise<void> {
        const { username, password } = req.body;

        if (username && password) {
            const db = getDatabase();

            const user = await db.users.findByUserNameAndPassword(username, password);

            if (user) {
                req.session[SESSION_ID] = user;

                res.redirect('blog');

                return;
            }
        }

        res.render('login', { error: 'Usuario no encontrado' });
    }

    private getLogout(req: express.Request, res: express.Response): void {
        req.session[SESSION_ID] = null;
        res.clearCookie(COOKIE_NAME);

        res.redirect('login');

        return;
    }
}
