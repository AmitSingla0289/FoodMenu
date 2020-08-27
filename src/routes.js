import {Router} from 'express';
import OwnerController from './owners/controller/OwnerController'
import RecipeController from './recipes/controller/RecipeController'
import OwnerRecipeController from './owner_recipe/controller/OwnerRecipeController'
/**
 * Contains all API routes for the application.
 */
let router = Router();






router.use('/owners', OwnerController);
router.use('/recipes', RecipeController);
router.use('/owner_recipe', OwnerRecipeController);

export default router;
