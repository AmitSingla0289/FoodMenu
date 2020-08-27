import logger from '../../utils/logger'
import HttpStatus from 'http-status-codes';
import bookshelf from "../../db";
import OwnerModel from '../models/OwnerModel';
import * as OwnerDao from '../dao/OwnerDao';

export async function getAllOwners(){
    let ownerList = await OwnerModel.getOwnerList();
    if(ownerList[0].length>0){
        return {
            message :'',
            data :ownerList[0][0]
        };
    }else{
        return {
            message: 'No Owner Found',
            data : ''
        }
    }
}

export async function getOwnerWithId(owner_id){
    let ownerList = await OwnerModel.getOwnerById(owner_id);
    if(ownerList[0].length>0){
        return {
            message :'',
            data :ownerList[0]
        };
    }else{
        return {
            message: 'No Onwer Found by id '+ owner_id,
            data : []
        }
    }
}

export async function createOwner(reqData){
    logger.info("in create owner "+ JSON.stringify(reqData));
    if(reqData.name=== undefined){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Parameter name is missing"};
    }
    if(reqData.name=== ''){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Invalid owner name"};
    }
    if(reqData.age=== undefined){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Parameter age is missing"};
    }
    if(reqData.age=== ''){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Invalid age"};
    }
    if(reqData.city=== undefined){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Parameter city is missing"};
    }
    if(reqData.city=== ''){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Invalid city name"};
    }
    let User = await bookshelf.transaction(async (t) => {
        let newUser = await OwnerDao.createRow({
            name: reqData.name,
            age: reqData.age,
            city : reqData.city
        }, t);
        if (!newUser.id) {
            return {errorCode: HttpStatus.INTERNAL_SERVER_ERROR, errors: {Error: ['Server error']}};
        }
        return newUser.id;
    });
    return {
        message: "owner successfully registered ",
        owner_id: User
    };
}

export async function updateOwner(owner_id, reqData){
    logger.info("in update owner "+ JSON.stringify(reqData));
    if(reqData.name=== undefined){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Parameter name is missing"};
    }
    if(reqData.name=== ''){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Invalid owner name"};
    }
    if(reqData.age=== undefined){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Parameter age is missing"};
    }
    if(reqData.age=== ''){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Invalid age"};
    }
    if(reqData.city=== undefined){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Parameter city is missing"};
    }
    if(reqData.city=== ''){
        return {errorCode: HttpStatus.BAD_REQUEST, message: "Invalid city name"};
    }
    let updateOwner = await OwnerModel.updateOwner(owner_id, reqData.name, reqData.city, reqData.age);
    logger.info("update owner "+ JSON.stringify(updateOwner));
    if(updateOwner>0){
        return {
            message: "owner successfully updated :"
        };
    }else{
        return {
            message: "Owner id not exist"
        };
    }
}

export async function deleteOwner(owner_id){
    let deleteOwner = await OwnerModel.deleteOwner(owner_id);
    if(deleteOwner>0){
        return {
            message: "Owner successfully deleted with owner id :"
        };
    }else{
        return {
            message: "Owner id not exist"
        };
    }
}

