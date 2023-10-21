import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => (
    {
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: '1h'
        }
    }
)
)