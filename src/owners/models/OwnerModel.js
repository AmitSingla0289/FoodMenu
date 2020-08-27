import bookshelf from "../../db";
import * as queries from '../queries/OnwerQuery';
const TABLE_NAME = 'tbowner';
class OwnerModel extends bookshelf.Model {
    get tableName() {
        return TABLE_NAME;
    }

    get hasTimeStamps() {
        return false;
    }

    static getOwnerList() {
        return bookshelf.knex.raw(queries.FETCH_OWNER_LIST)
    }
    static getOwnerById(id){
        return bookshelf.knex.raw(queries.FETCH_OWNER_BY_ID,{
            owner_id : id
        })
    }
    static deleteOwner(owner_id){
        return bookshelf.knex('tbowner').where('owner_id',owner_id).del();
    }
    static updateOwner(owner_id, name, city, age){
        return bookshelf.knex('tbowner')
            .where('owner_id', '=', owner_id)
            .update({
                city: city,
                name: name,
                age: age,
                thisKeyIsSkipped: undefined
            })
    }
    static checkownerByOwnerId(owner_id){
        return bookshelf.knex('tbowner').where('owner_id', owner_id).select('owner_id');
    }
}
export default OwnerModel;