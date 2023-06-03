import { type IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "sugar-shack/cc/next",
  cookieOptions: { secure: process.env.NODE_ENV === "production" },
};

declare module "iron-session" {
  interface IronSessionData {
    user: string | null;
  }
}

declare module "jsonwebtoken" {
  interface WithCartSession extends JwtPayload {
    domain: string;
    cartID: null | string;
  }
}
