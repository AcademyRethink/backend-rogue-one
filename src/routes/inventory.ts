import express from 'express';
import notificationsRepository from '../repositories/notificationRepository';

const router = express.Router();

// Rota para obter todos os produtos
router.get('/products', async (req, res) => {
  try {
    const products = await notificationsRepository.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Erro ao obter todos os produtos:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter os produtos' });
  }
});

 router.patch('/products/:ean', async (req, res) => {
  try {
    const { ean } = req.params
    const quantity = Number(req.body.quantity)
    const message = await notificationsRepository.updateProductByEan(quantity, ean);

    res.json(message);
  } catch (error) {
    console.error('Erro ao obter todos os produtos:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter os produtos' });
  }
}); 

export default router;
