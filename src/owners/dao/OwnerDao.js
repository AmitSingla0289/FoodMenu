import OwnerModel from '../models/OwnerModel';
import logger from "../../utils/logger";

//For update any onwer with owner id
export async function updateRow(id, data, transaction) {
    return await OwnerModel.where({'owner_id': id}).save(data, {method: 'update', transacting: transaction});
}

//For creating owner
export async function createRow(newOwner, transaction){
    logger.info("in ownerDao "+newOwner);
    return await new OwnerModel(newOwner).save(null,{transacting:transaction});
}