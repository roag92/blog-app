import * as express from 'express';

import { SESSION_ID } from '../middleware/session-register';
import { getS3 } from '../core/s3';
import { BaseController, HTTP_GET } from '../core/abstract-controller';
import { Route } from '../core/route';

export class BlogController extends BaseController {
    constructor() {
        super();

        this.mapRoutes([
            new Route('/blog', HTTP_GET, this.getBlog.bind(this)),
        ]);
    }

    private async getBlog(req: express.Request, res: express.Response): Promise<void> {
        res.render('blog', { user: req.session[SESSION_ID], posts: await getS3().listObjects() });
    }
}
