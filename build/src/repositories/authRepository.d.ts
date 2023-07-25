import { User } from '../types/authType';
export declare function findUserByEmail(email: string): Promise<User | undefined>;
export declare function createUser(cnpj: string, email: string, password: string): Promise<User>;
export declare function updateUser(email: string, token: string): Promise<void>;
export declare function updateUserPassword(email: string, password: string): Promise<void>;
declare const _default: {
    findUserByEmail: typeof findUserByEmail;
    createUser: typeof createUser;
    updateUser: typeof updateUser;
    updateUserPassword: typeof updateUserPassword;
};
export default _default;
