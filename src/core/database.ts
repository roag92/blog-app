import pgPromise, { IMain, IInitOptions } from "pg-promise";
import UserRepository from "../repository/user-repository";
import { ExtendedProtocol, IExtensions } from "./extended-protocol";

let _instance: ExtendedProtocol = null;

export function getDatabase(): ExtendedProtocol {
    if (!_instance) {
        const initOptions: IInitOptions<IExtensions> = {
            extend(obj: ExtendedProtocol, dc: any) {
                obj.users = new UserRepository(obj, pgp);
            }
        };

        const pgp: IMain = pgPromise(initOptions);

        _instance = pgp({
            database: process.env.PGDATABASE,
            host: process.env.PGHOST,
            port: parseInt(process.env.PGPORT, 10),
            user: process.env.PGUSER
        });
    }

    return _instance;
}
