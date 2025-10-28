import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createUser = mutation({
    args:{
        username: v.string(),
        fullname: v.string(),
        image: v.string(),
        bio: v.optional(v.string()),
        email: v.string(),
        clerkId: v.string(),
    },

    handler: async(ctx , args) =>{
        const exisitingUser = await ctx.db
        .query("users")
        .withIndex("by_clerkId",(q) => q.eq("clerkId",args.clerkId))
        .first();

        if(exisitingUser) return;

        //create user in db
        await ctx.db.insert("users",{
            username: args.username,
            fullname: args.fullname,
            image: args.image,
            bio: args.bio,
            email: args.email,
            followers: 0,
            following: 0,
            posts:0,
            clerkId: args.clerkId,
        })
    }   
});