import jwt from 'jsonwebtoken';

const secretKey = 'chave';

export const jwtService = {
  generateToken: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, secretKey, {
      expiresIn: expiration,
    });
  },
  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, secretKey, callbackfn);
  },
};
