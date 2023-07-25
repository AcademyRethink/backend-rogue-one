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
const resetPasswordLoggedRepository_1 = __importDefault(require("../repositories/resetPasswordLoggedRepository"));
const passwordHash_1 = __importDefault(require("../utils/passwordHash"));
function resetPasswordLoggedService(email, currentPassword, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield resetPasswordLoggedRepository_1.default.findUserById(email);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        const isCurrentPasswordCorrect = yield resetPasswordLoggedRepository_1.default.checkCurrentPassword(email, currentPassword);
        if (!isCurrentPasswordCorrect) {
            throw new Error('Senha atual incorreta');
        }
        const hashedNewPassword = yield passwordHash_1.default.generatePassword(password);
        yield resetPasswordLoggedRepository_1.default.updateUserPassword(email, hashedNewPassword);
    });
}
exports.default = { resetPasswordLoggedService };
