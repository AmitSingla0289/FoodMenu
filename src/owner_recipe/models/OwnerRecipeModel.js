import bookshelf from "../../db";
import * as queries from '../queries/OwnerRecipeQuery';
const TABLE_NAME = 'tbowner_recipe';
class OwnerRecipeModel extends bookshelf.Model {
    get tableName() {
        return TABLE_NAME;
    }

    get hasTimeStamps() {
        return false;
    }

    static getAllOwnersRecipeList() {
        return bookshelf.knex.raw(queries.FETCH_OWNER_RECIPE_LIST)
    }
    static getOwnersRecipeWithOwnerId(id){
        return bookshelf.knex.raw(queries.FETCH_OWNER_RECIPES_LIST_BY_OWNER_ID,{
            owner_id : id
        })
    }
    static deleteOwnerRecipe(owner_recipe_id){
        return bookshelf.knex('tbowner_recipe').where('owner_recipe_id',owner_recipe_id).del();
    }
    static updateRecipePrice(owner_id, recipe_id, price){
        return bookshelf.knex('tbowner_recipe')
            .where('owner_id', '=', owner_id)
            .andWhere(function() {
                this.where('recipe_id','=', recipe_id)
            })
            .update({
                price :price,
                thisKeyIsSkipped: undefined
            })
    }
}
export default OwnerRecipeModel;