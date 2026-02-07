import { eq, and, gte, lte, desc, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import {
  events,
  tasks,
  transactions,
  newsArticles,
  excelImports,
  userSettings,
  Event,
  InsertEvent,
  Task,
  InsertTask,
  Transaction,
  InsertTransaction,
  NewsArticle,
  InsertNewsArticle,
  ExcelImport,
  InsertExcelImport,
  UserSettings,
  InsertUserSettings,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ EVENTS (AGENDA) ============

export async function getUserEvents(userId: number, startDate?: Date, endDate?: Date) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(events).where(eq(events.userId, userId)) as any;

  if (startDate && endDate) {
    query = query.where(
      and(
        gte(events.startDate, startDate),
        lte(events.startDate, endDate)
      )
    );
  }

  return query.orderBy(asc(events.startDate));
}

export async function createEvent(data: InsertEvent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(events).values(data);
  return (result as any).insertId;
}

export async function updateEvent(id: number, data: Partial<InsertEvent>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(events).set(data).where(eq(events.id, id));
}

export async function deleteEvent(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(events).where(eq(events.id, id));
}

// ============ TASKS (ROTINA) ============

export async function getUserTasks(userId: number, date?: Date) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(tasks).where(eq(tasks.userId, userId)) as any;

  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    query = query.where(
      and(
        gte(tasks.scheduledTime, startOfDay),
        lte(tasks.scheduledTime, endOfDay)
      )
    );
  }

  return query.orderBy(asc(tasks.order), asc(tasks.scheduledTime));
}

export async function createTask(data: InsertTask) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(tasks).values(data);
  return (result as any).insertId;
}

export async function updateTask(id: number, data: Partial<InsertTask>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(tasks).set(data).where(eq(tasks.id, id));
}

export async function deleteTask(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(tasks).where(eq(tasks.id, id));
}

export async function reorderTasks(userId: number, taskIds: number[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  for (let i = 0; i < taskIds.length; i++) {
    await db.update(tasks).set({ order: i }).where(eq(tasks.id, taskIds[i]));
  }
}

// ============ TRANSACTIONS (FINANÇAS) ============

export async function getUserTransactions(userId: number, startDate?: Date, endDate?: Date) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(transactions).where(eq(transactions.userId, userId)) as any;

  if (startDate && endDate) {
    query = query.where(
      and(
        gte(transactions.transactionDate, startDate),
        lte(transactions.transactionDate, endDate)
      )
    );
  }

  return query.orderBy(desc(transactions.transactionDate));
}

export async function createTransaction(data: InsertTransaction) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(transactions).values(data);
  return (result as any).insertId;
}

export async function updateTransaction(id: number, data: Partial<InsertTransaction>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(transactions).set(data).where(eq(transactions.id, id));
}

export async function deleteTransaction(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(transactions).where(eq(transactions.id, id));
}

export async function getTransactionStats(userId: number, startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) return { income: 0, expense: 0 };

  const txs = await db
    .select()
    .from(transactions)
    .where(
      and(
        eq(transactions.userId, userId),
        gte(transactions.transactionDate, startDate),
        lte(transactions.transactionDate, endDate)
      )
    );

  let income = 0;
  let expense = 0;

  txs.forEach((tx) => {
    const amount = parseFloat(tx.amount as any);
    if (tx.type === "income") {
      income += amount;
    } else {
      expense += amount;
    }
  });

  return { income, expense };
}

// ============ NEWS ARTICLES (NOTÍCIAS) ============

export async function getUserNewsArticles(userId: number, category?: string) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(newsArticles).where(eq(newsArticles.userId, userId)) as any;

  if (category) {
    query = query.where(eq(newsArticles.category, category as any));
  }

  return query.orderBy(desc(newsArticles.publishedAt));
}

export async function createNewsArticle(data: InsertNewsArticle) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(newsArticles).values(data);
  return (result as any).insertId;
}

export async function updateNewsArticle(id: number, data: Partial<InsertNewsArticle>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(newsArticles).set(data).where(eq(newsArticles.id, id));
}

export async function deleteNewsArticle(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(newsArticles).where(eq(newsArticles.id, id));
}

// ============ EXCEL IMPORTS (FINANÇAS) ============

export async function getUserExcelImports(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(excelImports).where(eq(excelImports.userId, userId)).orderBy(desc(excelImports.importedAt));
}

export async function createExcelImport(data: InsertExcelImport) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(excelImports).values(data);
  return (result as any).insertId;
}

// ============ USER SETTINGS ============

export async function getUserSettings(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(userSettings).where(eq(userSettings.userId, userId));
  return result[0] || null;
}

export async function createUserSettings(data: InsertUserSettings) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(userSettings).values(data);
  return (result as any).insertId;
}

export async function updateUserSettings(userId: number, data: Partial<InsertUserSettings>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(userSettings).set(data).where(eq(userSettings.userId, userId));
}
