import dotenv from 'dotenv';
import fs from 'fs-extra';
import { Client } from 'pg';

const init = async () => {
    dotenv.config();

    const client = new Client();

    try {
        await client.connect();

        const sql = await fs.readFile('./tools/db/init-db.pgsql', { encoding: 'UTF-8' } );

        const statements = sql.split(/;\s*$/m);

        for (const statement of statements) {
            if (statement !== '') {
                await client.query( statement );
            }
        }
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        await client.end();
    }
};

init().then(() => {
    console.info('Data imported successfully' );
}).catch(() => {
    console.error('Error at moment to import database');
});
