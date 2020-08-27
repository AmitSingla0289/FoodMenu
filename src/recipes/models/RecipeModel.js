import bookshelf from "../../db";
import * as queries from '../queries/RecipeQuery';
const TABLE_NAME = 'tbrecipe';
class RecipeModel extends bookshelf.Model {
    get tableName() {
        return TABLE_NAME;
    }

    get hasTimeStamps() {
        return false;
    }

    static getRecipeList() {
        return bookshelf.knex.raw(queries.FETCH_RECIPE_LIST)
    }
    static getRecipeById(id){
        return bookshelf.knex.raw(queries.FETCH_RECIPE_BY_ID,{
            recipe_id : id
        })
    }
    static deleteRecipe(recipe_id){
        return bookshelf.knex('tbrecipe').where('recipe_id',recipe_id).del();
    }
    static updateRecipe(recipe_id, recipe){
        return bookshelf.knex('tbrecipe')
            .where('recipe_id', '=', recipe_id)
            .update({
                recipe: recipe,
                thisKeyIsSkipped: undefined
            })
    }
    static checkReciepeByName(recipe){
        return bookshelf.knex('tbrecipe').where('recipe', recipe).select('recipe_id');
    }
    static checkReciepeByRecipeId(recipe_id){
        return bookshelf.knex('tbrecipe').where('recipe_id', recipe_id).select('recipe_id');
    }
}
export default RecipeModel;