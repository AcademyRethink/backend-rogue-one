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
exports.updateUserPassword = exports.updateUser = exports.createUser = exports.findUserByEmail = void 0;
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../../knexfile"));
const db = (0, knex_1.default)(knexfile_1.default);
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield db('pharmacy').where('email', email).first();
            return user;
        }
        catch (error) {
            throw new Error('Erro ao buscar email');
        }
    });
}
exports.findUserByEmail = findUserByEmail;
function createUser(cnpj, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield db('pharmacy').insert({
                cnpj,
                email,
                password,
                has_access: true
            });
            return user;
        }
        catch (error) {
            throw new Error('Erro ao criar usuário');
        }
    });
}
exports.createUser = createUser;
function updateUser(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db('pharmacy')
                .update({
                token
            })
                .where({ email });
        }
        catch (error) {
            throw new Error('Erro ao criar usuário');
        }
    });
}
exports.updateUser = updateUser;
function updateUserPassword(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db('pharmacy')
                .update({
                password,
                token: null
            })
                .where({ email });
        }
        catch (error) {
            throw new Error('Erro ao atualizar senha');
        }
    });
}
exports.updateUserPassword = updateUserPassword;
exports.default = { findUserByEmail, createUser, updateUser, updateUserPassword };
