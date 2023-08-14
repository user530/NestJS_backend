import { Request } from 'express'

export interface AccessTokenPayload {
    sub: string,
    exp: number
}

export interface RefreshTokenPayload extends AccessTokenPayload {
    type: 'refreshToken'
}

export interface ExtendedRequest extends Request {
    user: {
        id: number;
        email: string;
    }
}