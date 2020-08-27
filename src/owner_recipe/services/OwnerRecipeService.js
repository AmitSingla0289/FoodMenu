import logger from '../../utils/logger'
import HttpStatus from 'http-status-codes';
import bookshelf from "../../db";
import OwnerRecipeModel from '../models/OwnerRecipeModel';
import * as OwnerRecipeDao from '../dao/OwnerRecipeDao';
import RecipeModel from "../../recipes/models/RecipeModel";
import OwnerModel from "../../owners/models/OwnerModel";

export async function getAllOwnersRecipe(){
    let ownerList = await OwnerModel.getOwnerList();
    for(let i=0; i <ownerList[0].length; i++){
        let ownersRecipeList = await OwnerRecipeModel.getOwnersRecipeWithOwnerId(ownerList[0][i].owner_id);
        ownerList[0][i].recipeList = ownersRecipeList[0]
    }

    if(ownerList[0].length>0){
        return {
            message :'',
            data :ownerList[0]
        };
    }else{
        return {
            message: 'No Owner Found',
            data : ''
        }
    }
}

export async function getOwnersRecipeWithOwnerId(owner_id){
    let ownersRecipesList = await OwnerRecipeModel.getOwnersRecipeWithOwnerId(owner_id);
    if(ownersRecipesList[0].length>0){
        return {
            message :'',
            data :ownersRecipesList[0]
        };
    }else{
        return {
            message: 'No Onwer Found with id '+ owner_id,
            data : []
        }
    }
}


export async function updateOwnerRecipe(owner_id, reqData){
    logger.info("in update owner's recipe price "+ JSON.stringify(reqData));
    if(reqData.recipe_id=== undefined){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Parameter recipe is missing"};
    }
    if(parseInt(reqData.recipe_id)<1){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Please Select valid Recipe"};
    }
    if(reqData.price=== undefined){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Parameter price is missing"};
    }
    if(parseInt(reqData.price)<1){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Price should be greater than 0"};
    }
    let checkOwner = await OwnerModel.checkownerByOwnerId(owner_id);
    if(checkOwner.length==1){
        let checkRecipe = await RecipeModel.checkReciepeByRecipeId(reqData.recipe_id);
        if(checkRecipe.length==1){
            let updateRecipePrice = await OwnerRecipeModel.updateRecipePrice(owner_id, reqData.recipe_id, reqData.price);
            logger.info("update owner's recipes price "+ JSON.stringify(updateRecipePrice));
            if(updateRecipePrice>0){
                return {
                    message: "Price updated successfully."
                };
            }
        }else{
            return {
                message: "recipe id not exists."
            };
        }
    }else{
        return {
            message: "owner id not exists."
        };
    }
}

export async function deleteOwnersRecipe(owner_recipe_id){
    let deleteOwner = await OwnerRecipeModel.deleteOwnerRecipe(owner_recipe_id);
    if(deleteOwner>0){
        return {
            message: "Owner's recipe deleted successfully."
        };
    }else{
        return {
            message: "owner_recipe_id not exist"
        };
    }
}


export async function createOwnerRecipe(reqData){
    logger.info("in create owner's recipe "+ JSON.stringify(reqData));
    if(reqData.recipe_id=== undefined){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Parameter recipe is missing"};
    }
    if(parseInt(reqData.recipe_id)<1){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Please Select valid Recipe"};
    }
    if(reqData.price=== undefined){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Parameter price is missing"};
    }
    if(parseInt(reqData.price)<1){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Price should be greater than 0"};
    }
    if(reqData.owner_id=== undefined){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Parameter owner_id is missing"};
    }
    if(parseInt(reqData.owner_id)<1){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Please Select valid owner_id"};
    }
    let checkOwner = await OwnerModel.checkownerByOwnerId(reqData.owner_id);
    if(checkOwner.length==1){
        let checkRecipe = await RecipeModel.checkReciepeByRecipeId(reqData.recipe_id);
        if(checkRecipe.length==1){
            let ownerRecipeDetails = await bookshelf.transaction(async (t) => {
                let newOwnerRecipe = await OwnerRecipeDao.createRow({
                    recipe_id: checkRecipe[0].recipe_id,
                    owner_id: checkOwner[0].owner_id,
                    price : parseFloat(reqData.price)
                }, t);
                if (!newOwnerRecipe.id) {
                    return {errorCode: HttpStatus.INTERNAL_SERVER_ERROR, errors: {Error: ['Server error']}};
                }
                return newOwnerRecipe.id;
            });
            return {
                message : "Recipe price updated for the particular owner."
            }

        }else{
            return {errorCode: HttpStatus.BAD_REQUEST, message: "Please Select valid Recipe"};

        }
    }else{
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Please Select valid owner"};
    }

    return  {
        message: "Recipe price updated for the particular owner."
    };
}

