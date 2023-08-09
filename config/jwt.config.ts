import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => (
    {
        secret: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5MTU3NzIwOSwiaWF0IjoxNjkxNTc3MjA5fQ.O2QUT7o9vb6A9B8fhxVVMWxnQSGb2Ql93URkEueksjk',
        expiresIn: '1h'
    }
))