/// <reference types="qs" />
import { Response, Request } from 'express';
declare const _default: {
    selectInventory: (request: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) => Promise<void>;
    selectProducts: (request: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, response: Response<any, Record<string, any>>) => Promise<void>;
};
export default _default;
