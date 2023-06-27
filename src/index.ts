/* import express from 'express';
import admin from 'firebase-admin';
const app = express();

// Inicializar o Firebase Admin SDK
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require("../authrogueone.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware para fazer o parsing do corpo da requisição
app.use(express.json());

// Rota de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  admin
    .auth()
    .getUserByEmail(email)
    .then((userRecord) => {
      // Comparar a senha fornecida com a senha armazenada no Firebase Authentication
      // Aqui você pode usar uma biblioteca de hashing de senhas, como bcrypt, para comparar as senhas de forma segura
      if (userRecord.passwordHash === password) {
        res.send('Autenticação de login bem-sucedida');
      } else {
        res.status(400).send('Falha na autenticação de login: senha incorreta');
      }
    })
    .catch((error) => {
      res.status(400).send('Falha na autenticação de login: ' + error.message);
    });
});
// Rota de recuperação de senha
app.post('/reset-password', (req, res) => {
  // Lógica de recuperação de senha aqui
  res.send('Recuperação de senha');
});

// Inicie o servidor
app.listen(3030, () => {
  console.log('Servidor iniciado na porta 3030');
});
 */

import express, { Application } from 'express';
import authRoutes from './routes/authRoute';
import dashboardRoute from './routes/dashboardRoute';
import { auth } from './middlewares/auth';

// Crie uma instância do aplicativo Express
const app: Application = express();

app.use(express.json());
// Defina as rotas
app.use('/auth', authRoutes);

// Definindo middleware de verificação/validação do token
app.use(auth);

// Definindo rotas "privadas"
app.use('/dashboard', dashboardRoute);

// Inicie o servidor
app.listen(3050, () => {
  console.log('Servidor rodando na porta 3050');
});
