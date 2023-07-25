import { Request, Response } from 'express';
export declare function login(req: Request, res: Response): Promise<void>;
export declare function signUp(req: Request, res: Response): Promise<void>;
export declare function forgotPassword(req: Request, res: Response): Promise<void>;
export declare function resetPassword(req: Request, res: Response): Promise<void>;
declare const _default: {
    login: typeof login;
    forgotPassword: typeof forgotPassword;
    resetPassword: typeof resetPassword;
    signUp: typeof signUp;
};
export default _default;
