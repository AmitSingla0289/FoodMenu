import {Router} from 'express';
import  * as RecipeService from '../services/RecipeService';
import HttpStatus from 'http-status-codes';
import logger from "../../utils/logger";

let router = Router();
//For getting list of recipes
router.get('/',(req, res, next) =>
{
    logger.info("Request for getting List Of Recipe : ");
    RecipeService.getAllRecipe(res)
        .then(result =>
        {
            logger.info("Response List Of Recipe "+ JSON.stringify(result));
            if('errorCode' in result){
                return res.status(HttpStatus.OK).json({
                    statusCode : result.errorCode,
                    message: result.message
                });
            }
            res.status(HttpStatus.OK).json({
                status : 'Success',
                statusCode : 200,
                data : result
            });
        }).catch(err => next(err));
});
//For getting recipe by recipe id
router.get('/:id',(req, res, next) =>
{
    logger.info("Request for getting recipe with id : "+ req.params.id);
    RecipeService.getRecipeWithId(req.params.id, res)
        .then(result =>
        {
            logger.info("Response for recipe by particular recipe id "+ JSON.stringify(result));
            if('errorCode' in result){
                return res.status(HttpStatus.OK).json({
                    statusCode : result.errorCode,
                    message: result.message
                });
            }
            res.status(HttpStatus.OK).json({
                status : 'Success',
                statusCode : 200,
                data : result
            });
        }).catch(err => next(err));
});

//For creating recipe with paramter (recipe)
router.post('/',(req, res, next) =>
{
    logger.info("Request for creating recipe : "+ JSON.stringify(req.body));
    RecipeService.createRecipe(req.body,res)
        .then(result =>
        {
            logger.info("Response after creation of recipe "+ JSON.stringify(result));
            if('errorCode' in result){
                return res.status(HttpStatus.OK).json({
                    statusCode : result.errorCode,
                    message: result.message
                });
            }
            res.status(HttpStatus.OK).json({
                status : 'Success',
                statusCode : 200,
                data : result
            });
        }).catch(err => next(err));
});

//Update Recipe name details by recipe id
router.put('/:id',(req, res, next) =>
{
    logger.info("Request for updating recipe : "+ JSON.stringify(req.params.id));
    RecipeService.updateRecipe(req.params.id, req.body, res)
        .then(result =>
        {
            logger.info("Response after updating of recipe "+ JSON.stringify(result));
            if('errorCode' in result){
                return res.status(HttpStatus.OK).json({
                    statusCode : result.errorCode,
                    message: result.message
                });
            }
            res.status(HttpStatus.OK).json({
                status : 'Success',
                statusCode : 200,
                data : result
            });
        }).catch(err => next(err));
});
//Delete recipe by recipe id
router.delete('/:id',(req, res, next) =>
{
    logger.info("Request for delete recipe : "+ JSON.stringify(req.params.id));
    RecipeService.deleteRecipe(req.params.id, res)
        .then(result =>
        {
            logger.info("Response after deleting recipe "+ JSON.stringify(result));
            if('errorCode' in result){
                return res.status(HttpStatus.OK).json({
                    statusCode : result.errorCode,
                    message: result.message
                });
            }
            res.status(HttpStatus.OK).json({
                status : 'Success',
                statusCode : 200,
                data : result
            });
        }).catch(err => next(err));
});

export default router;
