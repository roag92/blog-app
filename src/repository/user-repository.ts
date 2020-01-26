import { User } from "../model/user";
import { IDatabase, IMain } from "pg-promise";
import { BaseRepository } from "./abtsract-repository";

export default class UserRepository extends BaseRepository {
    constructor(db: IDatabase<any>, pgp: IMain) {
        super(db, pgp);
    }

    async findByUserNameAndPassword(username: string, password: string): Promise<User | null> {
        const data: any = await this.db.oneOrNone(
                'SELECT * FROM users WHERE username = $1 AND password = $2',
                [username, password]
            );

        if (!data) {
            return null;
        }

        return new User(data.id, data.name, data.username);
    }
}
