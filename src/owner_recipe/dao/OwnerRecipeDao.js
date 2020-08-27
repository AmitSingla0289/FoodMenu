import OwnerRecipeModel from '../models/OwnerRecipeModel';
import logger from "../../utils/logger";

//For update any onwer with owner id
export async function updateRow(id, data, transaction) {
    return await OwnerRecipeModel.where({'owner_id': id}).save(data, {method: 'update', transacting: transaction});
}

//For creating Recipe of owner
export async function createRow(newOwnerRecipe, transaction){
    logger.info("in create recipe of owner "+newOwnerRecipe);
    return await new OwnerRecipeModel(newOwnerRecipe).save(null,{transacting:transaction});
}