import {Router} from 'express';
import  * as OwnerRecipeService from '../services/OwnerRecipeService';
import HttpStatus from 'http-status-codes';
import logger from "../../utils/logger";

let router = Router();
//For getting list of owners with recipe
router.get('/',(req, res, next) =>
{
    logger.info("Request for getting List Of all Owner's Recipes : ");
    OwnerRecipeService.getAllOwnersRecipe(res)
        .then(result =>
        {
            logger.info("Response List Of owners recipes "+ JSON.stringify(result));
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
//For getting owner's recipes by onwer id
router.get('/:id',(req, res, next) =>
{
    logger.info("Request for getting Owner's recipes by owner id : "+ req.params.id);
    OwnerRecipeService.getOwnersRecipeWithOwnerId(req.params.id, res)
        .then(result =>
        {
            logger.info("Response for owners's recipe by owner id "+ JSON.stringify(result));
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

//For creating owner's recipe with parameter (recipe_id, owner_id, price)
router.post('/',(req, res, next) =>
{
    logger.info("Request for creating Owner's recipe : "+ JSON.stringify(req.body));
    OwnerRecipeService.createOwnerRecipe(req.body,res)
        .then(result =>
        {
            logger.info("Response after creation of owner's recipe "+ JSON.stringify(result));
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

//Update owner's recipe's price by owner_recipe_id
router.put('/:id',(req, res, next) =>
{
    logger.info("Request for updating recipe price with owner_recipe_id : "+ JSON.stringify(req.params.id));
    OwnerRecipeService.updateOwnerRecipe(req.params.id, req.body, res)
        .then(result =>
        {
            logger.info("Response after updating price of owner;s recipe "+ JSON.stringify(result));
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
//Delete owner's rcipes by owner_recipe_id
router.delete('/:id',(req, res, next) =>
{
    logger.info("Request for delete Owners Recipe by owner_recipe_id : "+ JSON.stringify(req.params.id));
    OwnerRecipeService.deleteOwnersRecipe(req.params.id, res)
        .then(result =>
        {
            logger.info("Response after deletion of owner's recipe "+ JSON.stringify(result));
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
