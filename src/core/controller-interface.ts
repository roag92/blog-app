import { Route } from './route';

export interface IController {
    getRoutes(): Route[];
}
