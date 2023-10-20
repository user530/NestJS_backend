import { Request } from 'express'
import { MinRequestUserAccountDTO } from 'src/shared-db/dtos';

export interface AccessTokenPayload {
    sub: string,
    created_at: string,
    exp: number
}

export interface RefreshTokenPayload extends AccessTokenPayload {
    type: 'refreshToken'
}

export interface ExtendedRequest extends Request {
    user: MinRequestUserAccountDTO
}