import { Request } from 'express'
import { RequestUserProfileDTO } from 'src/shared-db/dtos';
import { MinRequestUserAccountDTO } from 'src/shared-db/dtos/user-account';
import { UserProfile } from 'src/shared-db/entities';

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