import { User } from "./types";

declare global {
  namespace Express {
    interface User extends User {}
  }
}

export {};
