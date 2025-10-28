// // import { getNotifications } from "./notification";
// import { v } from "convex/values";
// import { mutation, MutationCtx, query } from "./_generated/server";
// // import { getAuthenticatedUser } from "./user";
// import { Id } from "./_generated/dataModel";

// export const generateUploadUrl = mutation(async (ctx) => {
//   const identity = await ctx.auth.getUserIdentity();
//   if (!identity) throw new Error("Unauthorized");
//   return await ctx.storage.generateUploadUrl();
// });

// export const createPost = mutation({
//   args: {
//     caption: v.optional(v.string()),
//     storageId: v.id("_storage"),
//   },

//   handler: async (ctx, args) => {
//     // const currentUser = await getAuthenticatedUser(ctx);

//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("Unauthorized");

//     const currentUser = await ctx.db
//     .query("users")
//     .withIndex("by_clerkId",(q) => q.eq("clerkId" , identity.subject))
//     .first();

//     if(!currentUser) throw new Error("User Not Found");

//       await ctx.db.insert("posts", {
//       userId: currentUser._id,
//       imageUrl,
//       storageId: args.storageId,
//       caption: args.caption,
//       likes: 0,
//       comments: 0
//     });

//     // increment user's post count by 1
//     await ctx.db.patch(currentUser._id, {
//       posts: currentUser.posts + 1,
//     });

//     return postId;
//   },
// });