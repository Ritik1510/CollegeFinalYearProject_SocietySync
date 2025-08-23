### 1. Problem
    createdAt error 
### 2. solution
### 1️⃣ Your `timestamps` object

You wrote:

```ts
export const timestamps = {
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
};
```

And then you’re using it in table definitions like:

```ts
export const maintenanceRequests = pgTable("maintenance_requests", {
  id: serial("id").primaryKey(),
  ...timestamps,
  description: text("description").notNull(),
});
```

✅ This is fine. The table now has `created_at` and `updated_at` columns.


### 2️⃣ The conflict with `createInsertSchema`

Earlier you had:

```ts
export const insertMaintenanceRequestSchema = createInsertSchema(maintenanceRequests)
  .omit({ id: true, createdAt: true });
```

Notice that `omit({ createdAt: true })` is **using `createdAt`**, but your column in the table is now called `created_at` (snake\_case), not `createdAt` (camelCase).

* Drizzle’s generated schema uses **the exact column names** from the table (`created_at`, `updated_at`).
* So `omit({ createdAt: true })` **doesn’t find a column called `createdAt`** → red line / error.


### 3️⃣ How to fix it

You need to match the names exactly:

```ts
export const insertMaintenanceRequestSchema = createInsertSchema(maintenanceRequests)
  .omit({ id: true, created_at: true });
```

Similarly, if you later want to omit `updated_at`, use:

```ts
.omit({ updated_at: true })
```

### 4️⃣ Optional: Using camelCase in code

If you prefer `createdAt` instead of `created_at` in your JS/TS code, you can use **mapping functions** or **aliases** when reading/writing, but the Drizzle schema must match the database column names.

**✅ TL;DR:**

* Your table column is now `created_at`, not `createdAt`.
* Update your `.omit()` call to use the **exact column name**:

```ts
.omit({ id: true, created_at: true });
```

This will remove the red-line errors.

If you want, I can rewrite your **timestamps + insert schema snippet** so it works cleanly with Drizzle and `omit` for all tables. Do you want me to do that?
