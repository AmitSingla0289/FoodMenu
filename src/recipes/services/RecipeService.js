import logger from '../../utils/logger'
import HttpStatus from 'http-status-codes';
import bookshelf from "../../db";
import RecipeModel from '../models/RecipeModel';
import * as OwnerRecipeDao from '../../owner_recipe/dao/OwnerRecipeDao';

export async function getAllRecipe(){
    let recipeList = await RecipeModel.getRecipeList();
    if(recipeList[0].length>0){
        return {
            message :'',
            data :recipeList[0][0]
        };
    }else{
        return {
            message: 'No Recipe Found',
            data : ''
        }
    }
}

export async function getRecipeWithId(recipe_id){
    let recipe = await RecipeModel.getRecipeById(recipe_id);
    if(recipe[0].length>0){
        return {
            message :'',
            data :recipe[0]
        };
    }else{
        return {
            message: 'No recipe found by id '+ recipe_id,
            data : []
        }
    }
}

export async function createRecipe(reqData) {
    logger.info("in create recipe " + JSON.stringify(reqData));
    if (reqData.recipe === undefined) {
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Parameter recipe is missing"};
    }
    if (reqData.recipe === '') {
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Invalid recipe name"};
    }
    let checkRecipe = await RecipeModel.checkReciepeByName(reqData.recipe);
    if (checkRecipe.length == 1) {
        logger.info("Recipe   "+ JSON.stringify(checkRecipe));
        return {
            message: "Recipe is already in the list",
            recipe_id : checkRecipe[0].recipe_id
        }

    } else {
        let recipeDetails = await bookshelf.transaction(async (t) => {
            let newRecipe = await OwnerRecipeDao.createRow({
                recipe: reqData.recipe
            }, t);
            if (!newRecipe.id) {
                return {errorCode: HttpStatus.INTERNAL_SERVER_ERROR, errors: {Error: ['Server error']}};
            }
            return newRecipe.id;
        });
        return {
            message: "Recipe added successfully",
            recipe_id :  recipeDetails
        }
    }
}

export async function updateRecipe(recipe_id, reqData){
    logger.info("in update recipe "+ JSON.stringify(reqData));
    if(reqData.recipe=== undefined){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Parameter recipe is missing"};
    }
    if(reqData.recipe=== ''){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Please set valid Recipe"};
    }
    let recipe = await RecipeModel.getRecipeById(recipe_id);
    if(recipe[0].length==1){
        let updateRecipe = await RecipeModel.updateRecipe(recipe_id, reqData.recipe);
        logger.info("update recipe "+ JSON.stringify(updateRecipe));
        if(updateRecipe>0){
            return {
                message: "Recipe updated successfully."

            };
        }else{
            return {
                message: "Recipe id not exist"
            };
        }
    }

}
export async function deleteRecipe(recipe_id){
    let deleteRecipe = await RecipeModel.deleteRecipe(recipe_id);
    if(deleteRecipe>0){
        return {
            message: "Recipe deleted successfully."
        };
    }else{
        return {
            message: "Recipe id not exist"
        };
    }
}

