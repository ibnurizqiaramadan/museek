"use server";

import jwt from "jsonwebtoken";

export type JWT_PAYLOAD = {
  userId: string;
  queueId: string;
};

export const generateJWT = async (payload: JWT_PAYLOAD) => {
  const secret = process.env.JWT_SECRET;
  const expiration = Number(process.env.JWT_EXPIRATION);

  return jwt.sign(payload, secret, {
    expiresIn: expiration,
  });
};

export const verifyJWT = async (token: string) => {
  try {
    const secret = process.env.JWT_SECRET;
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Error verifying JWT", error);
    return null;
  }
};

export const decodeJWT = async (
  token: string,
): Promise<(jwt.Jwt & { payload: JWT_PAYLOAD }) | null> => {
  try {
    const decoded = jwt.decode(token, { complete: true });
    if (decoded && typeof decoded === "object" && "payload" in decoded) {
      return decoded as jwt.Jwt & { payload: JWT_PAYLOAD };
    }
    return null;
  } catch (error) {
    console.error("Error decoding JWT", error);
    return null;
  }
};
