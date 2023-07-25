'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.sendPasswordResetEmail =
  exports.resetPassword =
  exports.signUp =
  exports.login =
    void 0;
const authRepository_1 = __importDefault(
  require('../repositories/authRepository')
);
const passwordHash_1 = __importDefault(require('../utils/passwordHash'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const nodemailer_1 = __importDefault(require('nodemailer'));
function login(email, password) {
  return __awaiter(this, void 0, void 0, function* () {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }
    const user = yield authRepository_1.default.findUserByEmail(email);
    if (!user) {
      throw new Error('Email inválido');
    }
    if (!user.has_access) {
      throw new Error(
        'Assinatura suspensa por inadimplência. A plataforma será liberada após o pagamento.'
      );
    }
    if (user) {
      const isValid = yield passwordHash_1.default.validateUser(
        password,
        user.password
      );
      if (isValid) {
        // generate token
        Reflect.deleteProperty(user, 'password');
        const token = jsonwebtoken_1.default.sign(
          { userId: user.cnpj },
          String(process.env.SECRET_KEY),
          {
            expiresIn: '10h'
          }
        );
        return Object.assign(Object.assign({}, user), { token });
      } else {
        throw new Error('Senha inválida');
      }
    }
  });
}
exports.login = login;
function signUp(cnpj, email, password) {
  return __awaiter(this, void 0, void 0, function* () {
    const user = yield authRepository_1.default.findUserByEmail(email);
    if (!user) {
      const passwordHashed = yield passwordHash_1.default.generatePassword(
        password
      );
      if (passwordHashed) {
        const newUser = authRepository_1.default.createUser(
          cnpj,
          email,
          passwordHashed
        );
        return newUser;
      }
    }
  });
}
exports.signUp = signUp;
function resetPassword(email, password) {
  return __awaiter(this, void 0, void 0, function* () {
    const user = yield authRepository_1.default.findUserByEmail(email);
    if (user && user.token) {
      const passwordHashed = yield passwordHash_1.default.generatePassword(
        password
      );
      if (passwordHashed) {
        const updatedUser = authRepository_1.default.updateUserPassword(
          email,
          passwordHashed
        );
        return updatedUser;
      }
    } else {
      throw new Error('Link de redefinição de senha expirado');
    }
  });
}
exports.resetPassword = resetPassword;
function sendPasswordResetEmail(email) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      // Gerando um novo token
      const token = jsonwebtoken_1.default.sign(
        { userId: email },
        String(process.env.SECRET_KEY),
        {
          expiresIn: '1h'
        }
      );
      // Update no banco com o novo token gerado para o usuário que tera a senha resetada
      yield authRepository_1.default.updateUser(email, token);
      const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
          user: String(process.env.EMAIL_USER),
          pass: String(process.env.PASS)
        }
      });
      const urlResetPassword = `http://localhost:5173/reset-password?token=${token}`;
      yield transporter.sendMail({
        from: String(process.env.EMAIL_USER),
        to: email,
        subject: 'Redefinição de Senha',
        html: `<h3>Olá! Clique no link abaixo para redefinir sua senha:<h3><br> <a href=${urlResetPassword}>Recupere a sua senha<a>`
      });
    } catch (error) {
      throw new Error('Erro ao enviar o e-mail de redefinição de senha');
    }
  });
}
exports.sendPasswordResetEmail = sendPasswordResetEmail;
exports.default = { login, signUp, resetPassword, sendPasswordResetEmail };
