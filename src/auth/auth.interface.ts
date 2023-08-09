
export interface AccessTokenPayload {
    sub: string,
    exp: number
}

export interface RefreshTokenPayload extends AccessTokenPayload {
    type: 'refreshToken'
}
