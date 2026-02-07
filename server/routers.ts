import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  events: router({
    list: protectedProcedure
      .input(z.object({ startDate: z.date().optional(), endDate: z.date().optional() }))
      .query(({ ctx, input }) => db.getUserEvents(ctx.user.id, input.startDate, input.endDate)),
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1).max(255),
        description: z.string().optional(),
        startDate: z.date(),
        endDate: z.date().optional(),
        location: z.string().optional(),
        notificationBefore: z.number().optional(),
        source: z.enum(["manual", "whatsapp", "calendar"]).default("manual"),
      }))
      .mutation(({ ctx, input }) => db.createEvent({ userId: ctx.user.id, ...input })),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        isCompleted: z.boolean().optional(),
      }))
      .mutation(({ input }) => db.updateEvent(input.id, input)),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => db.deleteEvent(input.id)),
  }),

  tasks: router({
    list: protectedProcedure
      .input(z.object({ date: z.date().optional() }))
      .query(({ ctx, input }) => db.getUserTasks(ctx.user.id, input.date)),
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1).max(255),
        description: z.string().optional(),
        scheduledTime: z.date(),
        duration: z.number().optional(),
        priority: z.enum(["low", "medium", "high"]).default("medium"),
      }))
      .mutation(({ ctx, input }) => db.createTask({ userId: ctx.user.id, ...input, order: 0 })),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        scheduledTime: z.date().optional(),
        isCompleted: z.boolean().optional(),
        priority: z.enum(["low", "medium", "high"]).optional(),
      }))
      .mutation(({ input }) => db.updateTask(input.id, input)),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => db.deleteTask(input.id)),
    reorder: protectedProcedure
      .input(z.object({ taskIds: z.array(z.number()) }))
      .mutation(({ ctx, input }) => db.reorderTasks(ctx.user.id, input.taskIds)),
  }),

  transactions: router({
    list: protectedProcedure
      .input(z.object({ startDate: z.date().optional(), endDate: z.date().optional() }))
      .query(({ ctx, input }) => db.getUserTransactions(ctx.user.id, input.startDate, input.endDate)),
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1).max(255),
        description: z.string().optional(),
        amount: z.string(),
        type: z.enum(["income", "expense"]),
        category: z.string().optional(),
        transactionDate: z.date(),
        source: z.enum(["manual", "bank_notification", "excel"]).default("manual"),
        bankName: z.string().optional(),
      }))
      .mutation(({ ctx, input }) => db.createTransaction({ userId: ctx.user.id, ...input })),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        amount: z.string().optional(),
        category: z.string().optional(),
      }))
      .mutation(({ input }) => db.updateTransaction(input.id, input)),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => db.deleteTransaction(input.id)),
    stats: protectedProcedure
      .input(z.object({ startDate: z.date(), endDate: z.date() }))
      .query(({ ctx, input }) => db.getTransactionStats(ctx.user.id, input.startDate, input.endDate)),
  }),

  news: router({
    list: protectedProcedure
      .input(z.object({ category: z.string().optional() }))
      .query(({ ctx, input }) => db.getUserNewsArticles(ctx.user.id, input.category)),
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1).max(255),
        description: z.string().optional(),
        content: z.string().optional(),
        imageUrl: z.string().optional(),
        sourceUrl: z.string(),
        source: z.string(),
        category: z.enum(["jobs", "technology", "politics", "economy"]),
        publishedAt: z.date(),
      }))
      .mutation(({ ctx, input }) => db.createNewsArticle({ userId: ctx.user.id, ...input })),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        isSaved: z.boolean().optional(),
      }))
      .mutation(({ input }) => db.updateNewsArticle(input.id, input)),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => db.deleteNewsArticle(input.id)),
  }),

  settings: router({
    get: protectedProcedure
      .query(({ ctx }) => db.getUserSettings(ctx.user.id)),
    update: protectedProcedure
      .input(z.object({
        theme: z.enum(["light", "dark", "auto"]).optional(),
        notificationsEnabled: z.boolean().optional(),
        soundEnabled: z.boolean().optional(),
        vibrationEnabled: z.boolean().optional(),
        defaultNotificationMinutes: z.number().optional(),
      }))
      .mutation(({ ctx, input }) => db.updateUserSettings(ctx.user.id, input)),
  }),
});

export type AppRouter = typeof appRouter;
