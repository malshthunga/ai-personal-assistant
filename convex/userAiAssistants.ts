import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const InsertSelectedAssistants = mutation({
  args: {
    records: v.array(v.any()),
    uid: v.id("users"),
  },
  handler: async (ctx, args) => {
    const insertedIds = await Promise.all(
      args.records.map(async (record: any) => {
        return await ctx.db.insert("userAiAssistants", {
          ...record,
          uid: args.uid,
        });
      })
    );
    return insertedIds;
  },
});

export const GetAllUserAssistants = query({
  args: {
    uid: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("userAiAssistants")
      .filter((q) => q.eq(q.field("uid"), args.uid))
      .collect();
    return result;
  },
});