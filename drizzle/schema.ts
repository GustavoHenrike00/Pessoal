import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  boolean,
  decimal,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Events table (Agenda)
export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate"),
  location: varchar("location", { length: 255 }),
  category: mysqlEnum("category", ["trabalho", "pessoal", "urgente", "lazer", "saude", "outro"]).default("pessoal").notNull(),
  color: varchar("color", { length: 7 }).default("#22C55E").notNull(),
  notificationBefore: int("notificationBefore"),
  isCompleted: boolean("isCompleted").default(false).notNull(),
  source: mysqlEnum("source", ["manual", "whatsapp", "calendar"]).default("manual").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Event = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;

// Tasks table (Rotina)
export const tasks = mysqlTable("tasks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  scheduledTime: timestamp("scheduledTime").notNull(),
  duration: int("duration"), // minutes
  isCompleted: boolean("isCompleted").default(false).notNull(),
  priority: mysqlEnum("priority", ["low", "medium", "high"]).default("medium").notNull(),
  order: int("order").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Task = typeof tasks.$inferSelect;
export type InsertTask = typeof tasks.$inferInsert;

// Financial transactions table (Finanças)
export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  type: mysqlEnum("type", ["income", "expense"]).notNull(),
  category: varchar("category", { length: 100 }),
  transactionDate: timestamp("transactionDate").notNull(),
  source: mysqlEnum("source", ["manual", "bank_notification", "excel"]).default("manual").notNull(),
  bankName: varchar("bankName", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;

// News articles table (Notícias)
export const newsArticles = mysqlTable("newsArticles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  content: text("content"),
  imageUrl: varchar("imageUrl", { length: 500 }),
  sourceUrl: varchar("sourceUrl", { length: 500 }).notNull(),
  source: varchar("source", { length: 100 }).notNull(),
  category: mysqlEnum("category", ["jobs", "technology", "politics", "economy"]).notNull(),
  publishedAt: timestamp("publishedAt").notNull(),
  savedAt: timestamp("savedAt").defaultNow().notNull(),
  isSaved: boolean("isSaved").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type NewsArticle = typeof newsArticles.$inferSelect;
export type InsertNewsArticle = typeof newsArticles.$inferInsert;

// Excel imports table (Finanças - histórico de importações)
export const excelImports = mysqlTable("excelImports", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileUrl: varchar("fileUrl", { length: 500 }),
  rowsImported: int("rowsImported").notNull(),
  importedAt: timestamp("importedAt").defaultNow().notNull(),
});

export type ExcelImport = typeof excelImports.$inferSelect;
export type InsertExcelImport = typeof excelImports.$inferInsert;

// User settings table
export const userSettings = mysqlTable("userSettings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  theme: mysqlEnum("theme", ["light", "dark", "auto"]).default("auto").notNull(),
  notificationsEnabled: boolean("notificationsEnabled").default(true).notNull(),
  soundEnabled: boolean("soundEnabled").default(true).notNull(),
  vibrationEnabled: boolean("vibrationEnabled").default(true).notNull(),
  defaultNotificationMinutes: int("defaultNotificationMinutes").default(15).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserSettings = typeof userSettings.$inferSelect;
export type InsertUserSettings = typeof userSettings.$inferInsert;

// Secret Notes table (Bloco de notas secreto)
export const secretNotes = mysqlTable("secretNotes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  content: text("content"),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SecretNote = typeof secretNotes.$inferSelect;
export type InsertSecretNote = typeof secretNotes.$inferInsert;
