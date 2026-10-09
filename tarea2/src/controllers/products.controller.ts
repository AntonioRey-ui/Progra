import { Request, Response } from 'express';
import { ResultSetHeader } from 'mysql2';
import { pool } from '../conf/dbConnection';
import {
  ProductRow,
  CreateProductDTO,
  UpdateProductDTO,
  ChangePriceDTO,
} from '../types/product.interface';

/**
 * Validates that an ID is a valid positive integer.
 */
const parsePositiveIntegerId = (idParam: string | string[] | undefined): number | null => {
  if (typeof idParam !== 'string') {
    return null;
  }
  const parsed = Number(idParam);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
};

/**
 * GET /api/v1/products/getAll
 * Retrieves all active products (default: active = TRUE).
 */
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    let isActive = true;
    if (req.query.active !== undefined) {
      isActive = req.query.active === 'true' || req.query.active === '1';
    }

    const [rows] = await pool.query<ProductRow[]>(
      'SELECT id, name, price, stock, description, brand, img, active FROM products WHERE active = ?',
      [isActive]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /api/v1/products/getById/:id
 * Retrieves a single active product by ID.
 */
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parsePositiveIntegerId(req.params.id);
    if (!productId) {
      res.status(400).json({ error: 'ID parameter must be a positive integer' });
      return;
    }

    const [rows] = await pool.query<ProductRow[]>(
      'SELECT id, name, price, stock, description, brand, img, active FROM products WHERE id = ? AND active = TRUE',
      [productId]
    );

    if (rows.length === 0) {
      res.status(404).json({ message: 'Product not found or inactive' });
      return;
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /api/v1/products/create
 * Creates a new active product.
 */
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, stock, description, brand, img } = req.body as CreateProductDTO;

    // Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      res.status(400).json({ error: 'Field "name" is required and must be a non-empty string' });
      return;
    }

    if (typeof price !== 'number' || isNaN(price) || price <= 0) {
      res.status(400).json({ error: 'Field "price" is required and must be a number greater than 0' });
      return;
    }

    if (typeof stock !== 'number' || !Number.isInteger(stock) || stock < 0) {
      res.status(400).json({ error: 'Field "stock" is required and must be a non-negative integer' });
      return;
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
      res.status(400).json({ error: 'Field "description" is required and must be a non-empty string' });
      return;
    }

    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO products (name, price, stock, description, brand, img, active) VALUES (?, ?, ?, ?, ?, ?, TRUE)',
      [
        name.trim(),
        price,
        stock,
        description.trim(),
        brand ? brand.trim() : null,
        img ? img.trim() : null,
      ]
    );

    res.status(201).json({
      message: 'Product created successfully',
      product: {
        id: result.insertId,
        name: name.trim(),
        price,
        stock,
        description: description.trim(),
        brand: brand ? brand.trim() : null,
        img: img ? img.trim() : null,
        active: true,
      },
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * PUT /api/v1/products/update/:id
 * Updates all fields of an active product.
 */
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parsePositiveIntegerId(req.params.id);
    if (!productId) {
      res.status(400).json({ error: 'ID parameter must be a positive integer' });
      return;
    }

    const { name, price, stock, description, brand, img } = req.body as UpdateProductDTO;

    // Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      res.status(400).json({ error: 'Field "name" is required and must be a non-empty string' });
      return;
    }

    if (typeof price !== 'number' || isNaN(price) || price <= 0) {
      res.status(400).json({ error: 'Field "price" is required and must be a number greater than 0' });
      return;
    }

    if (typeof stock !== 'number' || !Number.isInteger(stock) || stock < 0) {
      res.status(400).json({ error: 'Field "stock" is required and must be a non-negative integer' });
      return;
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
      res.status(400).json({ error: 'Field "description" is required and must be a non-empty string' });
      return;
    }

    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE products SET name = ?, price = ?, stock = ?, description = ?, brand = ?, img = ? WHERE id = ? AND active = TRUE',
      [
        name.trim(),
        price,
        stock,
        description.trim(),
        brand ? brand.trim() : null,
        img ? img.trim() : null,
        productId,
      ]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Product not found or inactive' });
      return;
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: {
        id: productId,
        name: name.trim(),
        price,
        stock,
        description: description.trim(),
        brand: brand ? brand.trim() : null,
        img: img ? img.trim() : null,
        active: true,
      },
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * DELETE /api/v1/products/delete/:id
 * Performs logical deletion by setting active = FALSE.
 */
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parsePositiveIntegerId(req.params.id);
    if (!productId) {
      res.status(400).json({ error: 'ID parameter must be a positive integer' });
      return;
    }

    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE products SET active = FALSE WHERE id = ? AND active = TRUE',
      [productId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Product not found or already inactive' });
      return;
    }

    res.status(200).json({
      message: `Product with ID ${productId} deactivated successfully`,
    });
  } catch (error) {
    console.error('Error deactivating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * PATCH /api/v1/products/change-price/:id
 * Exclusively updates the price of an active product.
 */
export const changeProductPrice = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = parsePositiveIntegerId(req.params.id);
    if (!productId) {
      res.status(400).json({ error: 'ID parameter must be a positive integer' });
      return;
    }

    const { price } = req.body as ChangePriceDTO;

    if (typeof price !== 'number' || isNaN(price) || price <= 0) {
      res.status(400).json({ error: 'Field "price" is required and must be a number greater than 0' });
      return;
    }

    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE products SET price = ? WHERE id = ? AND active = TRUE',
      [price, productId]
    );

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Product not found or inactive' });
      return;
    }

    res.status(200).json({
      message: 'Product price updated successfully',
      id: productId,
      newPrice: price,
    });
  } catch (error) {
    console.error('Error changing product price:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
