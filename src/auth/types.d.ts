import { Request } from "express";

interface AuthedRequest extends Request {
  user: {
    id: number;
    name: string;
    email: string;
  };
}
