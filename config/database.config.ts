import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserAccount, UserProfile } from 'src/shared-db/entities';
import { CreateUserAccount, CreateUserProfile } from 'src/migrations'

export default registerAs('database', (): TypeOrmModuleOptions => {
    const type = isDbType(process.env.DB_TYPE) ? process.env.DB_TYPE : 'mysql';
    console.log(process.env)
    return {
        type,
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'password',
        database: process.env.DB_NAME || 'my_database',
        synchronize: process.env.DB_SYNC === 'true',
        entities: [UserAccount, UserProfile],
        migrations: [CreateUserAccount, CreateUserProfile],
        migrationsRun: true,
    }
})

function isDbType(dbTypeString: string): dbTypeString is "postgres" {
    return dbTypeString === 'postgres'
}