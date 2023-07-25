import { User } from '../types/authType';
declare function findUserById(userId: string): Promise<User | undefined>;
declare function checkCurrentPassword(email: string, currentPassword: string): Promise<boolean>;
declare function updateUserPassword(email: string, newPassword: string): Promise<void>;
declare const _default: {
    findUserById: typeof findUserById;
    checkCurrentPassword: typeof checkCurrentPassword;
    updateUserPassword: typeof updateUserPassword;
};
export default _default;
