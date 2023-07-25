export declare function login(email: string, password: string): Promise<{
    token: string;
    cnpj: string;
    email: string;
    password: string;
    has_access: boolean;
} | undefined>;
export declare function signUp(cnpj: string, email: string, password: string): Promise<import("../types/authType").User | undefined>;
export declare function resetPassword(email: string, password: string): Promise<void>;
export declare function sendPasswordResetEmail(email: string): Promise<void>;
declare const _default: {
    login: typeof login;
    signUp: typeof signUp;
    resetPassword: typeof resetPassword;
    sendPasswordResetEmail: typeof sendPasswordResetEmail;
};
export default _default;
