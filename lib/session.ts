import type { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  cookieName: process.env.SESSION_COOKIE_NAME as string,
  password: process.env.SESSION_COOKIE_SECRET as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    id: number;
  }
}
