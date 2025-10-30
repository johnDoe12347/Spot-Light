import { v } from "convex/values";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";

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

export async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");

  const currentUser = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
    .first();

  if (!currentUser) throw new Error("User not found");

  return currentUser;
}

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    return user;
  },
});