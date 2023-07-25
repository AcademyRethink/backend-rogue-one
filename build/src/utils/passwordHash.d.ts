declare function generatePassword(password: string): Promise<string>;
declare function validateUser(password: string, hash: string): Promise<boolean | undefined>;
declare const _default: {
    validateUser: typeof validateUser;
    generatePassword: typeof generatePassword;
};
export default _default;
