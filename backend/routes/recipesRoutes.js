import express from 'express';
const router = express.Router();
import RecipeController from '../controllers/recipesController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

// Routes for CRUD operations
router.post('/', verifyToken, RecipeController.createRecipe);
router.get('/', RecipeController.getRecipes);
router.get('/:id', RecipeController.getRecipe);
router.put('/:id', verifyToken, RecipeController.updateRecipe);
router.delete('/:id', verifyToken, RecipeController.deleteRecipe);


export default router;
