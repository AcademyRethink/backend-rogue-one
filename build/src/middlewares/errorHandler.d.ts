import { NextFunction, Request, Response } from "express";
export type ErrorType = {
    message: string;
    status: number;
    stack?: string;
};
export declare const errorHandler: (error: ErrorType, req: Request, res: Response, next: NextFunction) => void;
export declare const makeError: ({ message, status }: ErrorType) => {
    message: string;
    status: number;
};
