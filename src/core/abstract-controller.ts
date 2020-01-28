import { IController } from './controller-interface';
import { Route } from './route';

export const HTTP_GET: string = 'GET';
export const HTTP_POST: string = 'POST';

export abstract class BaseController implements IController {
    protected routes: Route[];

    protected mapRoutes(routes: Route[]): void {
        this.routes = routes;
    }

    public getRoutes(): Route[] {
        return this.routes;
    }
}
