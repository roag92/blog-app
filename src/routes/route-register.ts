import * as express from 'express';

import { IRegister } from '../core/register-interface';

import { AuthController } from '../controller/auth-controller';
import { BlogController } from '../controller/blog-controller';
import { Route } from '../core/route';
import { HTTP_GET, HTTP_POST } from '../core/abstract-controller';

export class RouteRegister implements IRegister
{
    public register(app: express.Application): void {

        const routes =  new AuthController().getRoutes()
            .concat(new BlogController().getRoutes())

        routes.forEach((route: Route) => {
            switch (route.method) {
                case HTTP_GET:
                    app.get(route.uri, route.action);
                    break;
                case HTTP_POST:
                    app.post(route.uri, route.action);
                    break;
            }
        });
    }
}
