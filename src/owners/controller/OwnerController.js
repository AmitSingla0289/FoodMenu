import {Router} from 'express';
import  * as OwnerService from '../services/OwnerService';
import HttpStatus from 'http-status-codes';
import logger from "../../utils/logger";

let router = Router();
//For getting list of owners
router.get('/',(req, res, next) =>
{
    logger.info("Request for getting List Of Owners : ");
    OwnerService.getAllOwners(res)
        .then(result =>
        {
            logger.info("Response List Of owners "+ JSON.stringify(result));
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
//For getting owner by onwer id
router.get('/:id',(req, res, next) =>
{
    logger.info("Request for getting Owner with id : "+ req.params.id);
    OwnerService.getOwnerWithId(req.params.id, res)
        .then(result =>
        {
            logger.info("Response of owner by owner id "+ JSON.stringify(result));
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

//For creating owner with paramter (name, city and age)
router.post('/',(req, res, next) =>
{
    logger.info("Request for creating Owner : "+ JSON.stringify(req.body));
    OwnerService.createOwner(req.body,res)
        .then(result =>
        {
            logger.info("Response after creation of owner "+ JSON.stringify(result));
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

//Update owner details by owner id
router.put('/:id',(req, res, next) =>
{
    logger.info("Request for updating Owner : "+ JSON.stringify(req.params.id));
    OwnerService.updateOwner(req.params.id, req.body, res)
        .then(result =>
        {
            logger.info("Response after updating of owner "+ JSON.stringify(result));
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
//Delete owner by owner id
router.delete('/:id',(req, res, next) =>
{
    logger.info("Request for delete Owner : "+ JSON.stringify(req.params.id));
    OwnerService.deleteOwner(req.params.id, res)
        .then(result =>
        {
            logger.info("Response after deletion of owner "+ JSON.stringify(result));
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
