import { NextFunction, Request, Response } from "express";
import AppError from "../Utils/AppError";
import { AppDataSource } from "../data-source";
import {Skills} from '../entity/Category';
export interface RequestCustom extends Request
{
    User: any;
}
const CategoryRepo= AppDataSource.getRepository(Skills)
export const getCategory=async (
    req:RequestCustom,
    res:Response,
    next:NextFunction,
)=>{
    try {
        console.log(req.User)
        await CategoryRepo.find().then((result:object)=>{
            res.status(200).json({
                message: "skill has been added",
                result
            })
        }).catch(err=>{
            next(new AppError(err.statusCode,err.message))
        });
        
    } catch (error) {
        next (new AppError(error.statusCode,error.message))
    }
}

export const postCategoryHandler=async (
    req:Request,
    res:Response,
    next:NextFunction
    )=>{
        console.log(req.body)
        try {
            await CategoryRepo.save(req.body).then((result:object)=>{
                res.status(200).json({
                    message: "skill has been added",
                    result
                })
            }).catch(err=>{
                next(new AppError(err.statusCode,err.message))
            });
        } catch (error) {
            next (new AppError(error.statusCode,error.message))
        }
    }

export const patchCategoryHandler=async (
        req:Request,
        res:Response,
        next:NextFunction
        )=>{
            try {
                let Category=await CategoryRepo.findOneBy({id:req.params.id});
                if(!Category){
                    return next(new AppError(404,"cateory with this di doesn't exist"))
                }
                Object.assign(Category,req.body);
                await CategoryRepo.save(Category).then((result:object)=>{
                    res.status(200).json({
                        message: "skill has been updated",
                        result
                    })
                }).catch((err:any)=>{
                    next(new AppError(err.statusCode,err.message))
                });
            } catch (error:any) {
                next (new AppError(error.statusCode,error.message))
            }
}

export const deleteCategoryHandler=async (
            req:Request,
            res:Response,
            next:NextFunction
            )=>{
                try {
                    let Category=await CategoryRepo.findOneBy({id:req.params.id});
                    if(!Category){
                        return next(new AppError(404,"skill with this di doesn't exist"))
                    }
                    await CategoryRepo.remove(Category).then((result:object)=>{
                        res.status(200).json({
                            message: "skill has been updated",
                            result
                        })
                    }).catch((err:any)=>{
                        next(new AppError(err.statusCode,err.message))
                    });
                } catch (error:any) {
                    next (new AppError(error.statusCode,error.message))
                }
            
}