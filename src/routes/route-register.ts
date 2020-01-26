import * as express from "express";

import { IRegister } from "../core/register-interface";
import { SESSION_ID, COOKIE_NAME } from "../middleware/session-auth";
import { Post } from "../model/blog";
import { getDatabase } from "../core/database";
import { getS3 } from "../core/s3";

export class Route implements IRegister
{
    register(app: express.Application): void {
        app.get("/login", (req: express.Request, res: express.Response) => {
            res.render("login", { error: null });
        });

        app.post("/login", async (req: express.Request, res: express.Response) => {
            const { username, password } = req.body;

            if (username && password) {
                const db = getDatabase();

                const user = await db.users.findByUserNameAndPassword(username, password);

                if (user) {
                    req.session[SESSION_ID] = user;

                    res.redirect("blog");

                    return;
                }
            }

            res.render("login", { error: "Usuario no encontrado" });
        });

        app.get("/blog", async (req: express.Request, res: express.Response) => {
            res.render("blog", { user: req.session[SESSION_ID], posts: await getS3().listObjects() });
        });

        app.get("/logout", (req: express.Request, res: express.Response) => {
            req.session[SESSION_ID] = null;
            res.clearCookie(COOKIE_NAME);

            res.redirect("login");

            return;
        });
    }
}
