import { Request as ExpressRequest } from "express";
import { TokenUserType } from "./common/utils/tokenManager";

declare global {
  export interface RequestType extends RequestInterface {}
}

export interface RequestInterface extends ExpressRequest {
  currentUser: TokenUserType;
}
