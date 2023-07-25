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
exports.resetPassword = exports.forgotPassword = exports.signUp = exports.login = void 0;
const authService_1 = __importDefault(require("../services/authService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Lógica de autenticação e geração do token
        try {
            const { email, password } = req.body;
            const session = yield authService_1.default.login(email, password);
            res.json(session);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
}
exports.login = login;
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, cnpj } = req.body;
            const token = yield authService_1.default.signUp(cnpj, email, password);
            res.json({ token });
        }
        catch (error) {
            res.status(400).json({ error });
        }
    });
}
exports.signUp = signUp;
function forgotPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Lógica para redefinir a senha do usuário
            const { email } = req.body;
            if (!email) {
                res.status(400).json({ message: 'Email é obrigatório' });
                return;
            }
            // Envio do e-mail de redefinição de senha
            yield authService_1.default.sendPasswordResetEmail(email);
            res
                .status(200)
                .json({ message: 'E-mail de redefinição de senha enviado com sucesso' });
        }
        catch (error) {
            console.error('Erro ao redefinir a senha:', error);
            res.status(400).json({
                message: error.message || 'Ocorreu um erro ao redefinir a senha'
            });
        }
    });
}
exports.forgotPassword = forgotPassword;
function resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Lógica para redefinir a senha do usuário
            const { token } = req.query;
            const { password } = req.body;
            if (!password) {
                throw new Error('Senha é obrigatória');
            }
            if (token) {
                // Verificando e decodificando o token para obter o email do usuário
                const decoded = jsonwebtoken_1.default.verify(`${token}`, `${process.env.SECRET_KEY}`);
                const email = decoded.userId;
                // Envio do e-mail de redefinição de senha
                yield authService_1.default.resetPassword(email, password);
                res.status(200).json({
                    message: 'Senha atualizada com sucesso'
                });
            }
        }
        catch (error) {
            console.error('Erro ao redefinir a senha:', error);
            res.status(400).json({
                message: error.message || 'Ocorreu um erro ao redefinir a senha'
            });
        }
    });
}
exports.resetPassword = resetPassword;
exports.default = { login, forgotPassword, resetPassword, signUp };
