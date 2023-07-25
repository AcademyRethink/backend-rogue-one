"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../../knexfile"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db = (0, knex_1.default)(knexfile_1.default);
function findUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield db('pharmacy').where('email', userId).first();
            return user;
        }
        catch (error) {
            throw new Error('Erro ao buscar usuário');
        }
    });
}
function checkCurrentPassword(email, currentPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield db('pharmacy').where('email', email).first();
            if (!user) {
                return false;
            }
            const isValidPassword = yield bcrypt_1.default.compare(currentPassword, user.password);
            return isValidPassword;
        }
        catch (error) {
            throw new Error('Erro ao verificar a senha atual do usuário');
        }
    });
}
function updateUserPassword(email, newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db('pharmacy').where('email', email).update({
                password: newPassword,
                token: null
            });
        }
        catch (error) {
            throw new Error('Erro ao atualizar a senha do usuário');
        }
    });
}
exports.default = { findUserById, checkCurrentPassword, updateUserPassword };
