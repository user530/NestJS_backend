import { registerAs } from '@nestjs/config';
import { UserAccount } from 'src/users/user-account/user-account.entity';
import { UserProfile } from 'src/users/user-profile/user-profile.entity';

export default registerAs('database', () => (
    {
        type: process.env.DB_TYPE || 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'password',
        database: process.env.DB_NAME || 'my_database',
        synchronize: process.env.DB_SYNC === 'true' || true,
        entities: [UserAccount, UserProfile]
    }
))

