import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserAccount, UserProfile } from 'src/shared-db/entities';

export default registerAs('database', (): TypeOrmModuleOptions => {
    const type = isDbType(process.env.DB_TYPE) ? process.env.DB_TYPE : 'mysql';

    return {
        type,
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'password',
        database: process.env.DB_NAME || 'my_database',
        synchronize: process.env.DB_SYNC === 'true' || true,
        entities: [UserAccount, UserProfile],
    }
})

function isDbType(dbTypeString: string): dbTypeString is "postgres" {
    return dbTypeString === 'postgres'
}