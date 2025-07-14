import { mutation } from "./_generated/server";
import { v } from "convex/values";
//create user convex function
export const CreateUser= mutation({
    args:{
        name:v.string(),
        email:v.string(),
        picture:v.string(),
    },
    handler:async(ctx,args)=>{
        //If user already exists in DB Table
        const user=await ctx.db.query('users')
        //checking if column from table 
        .filter(q=>q.eq(q.field('email'), args.email))
        .collect();

        if(user?.length==0){
        //If not then only ->Add User
        const data={
            name:args.name,
            email:args.email,
            picture:args.picture,
            credits:5000
        }
        const result=await ctx.db.insert('users',data); // users table and pass as data
        return data
        }

        return user[0]; //return user of first element


    }
})