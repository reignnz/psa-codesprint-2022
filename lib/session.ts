import { Admin, DesignatedOfficer, Staff, User, Aetos } from "@prisma/client";
import type { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  cookieName: process.env.SESSION_COOKIE_NAME as string,
  password: process.env.SESSION_COOKIE_SECRET as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export declare type UserSession = User & {
    admin: Admin | null;
    staff: Staff | null;
    designatedOfficer: DesignatedOfficer | null;
    aetos: Aetos | null;
}

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user: UserSession;
  }
}
