import * as express from 'express';

export interface IRegister{
    register(app: express.Application): void;
}
