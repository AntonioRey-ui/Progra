import { Router } from 'express';
import productsRoutes from './products.routes';

const router = Router();

// Group routes under /api/v1/products
router.use('/products', productsRoutes);

export default router;
