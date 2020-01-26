import { IDatabase, IMain } from "pg-promise";

export abstract class BaseRepository {
    constructor(protected db: IDatabase<any>, protected pgp: IMain) {}
}
