import { IDatabase } from "pg-promise";
import UserRepository from "../repository/user-repository";

export interface IExtensions {
    users: UserRepository,
}

export type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;
