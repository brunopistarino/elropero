import "dotenv/config";
import {
  integer,
  // pgTable,
  pgTableCreator,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel, relations } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

const pgTable = pgTableCreator((name) => `elropero_${name}`);

export const Products = pgTable(
  "Products",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    price: integer("price").notNull(),
    size: text("size"),
    categoryId: integer("categoryId")
      .references(() => Categories.id)
      .notNull(),
    supplierId: integer("supplierId")
      .references(() => Suppliers.id)
      .notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    soldAt: timestamp("soldAt"),
    returnedAt: timestamp("returnedAt"),
    paidAt: timestamp("paidAt"),
  }
  // (products) => {
  //   return {
  //     uniqueIdx: uniqueIndex("unique_idx").on(products.name),
  //   };
  // }
);

export const ProductsRelations = relations(Products, ({ one }) => ({
  category: one(Categories, {
    fields: [Products.categoryId],
    references: [Categories.id],
  }),
  supplier: one(Suppliers, {
    fields: [Products.supplierId],
    references: [Suppliers.id],
  }),
}));

export const Categories = pgTable(
  "Categories",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (categories) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(categories.name),
    };
  }
);

export const CategoriesRelations = relations(Categories, ({ many }) => ({
  products: many(Products),
}));

export const Suppliers = pgTable(
  "Suppliers",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    dni: text("dni"),
    address: text("address"),
    phone: text("phone"),
    email: text("email"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (suppliers) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(suppliers.name),
    };
  }
);

export const SuppliersRelations = relations(Suppliers, ({ many }) => ({
  products: many(Products),
}));

export type Product = InferSelectModel<typeof Products>;
export type NewProduct = InferInsertModel<typeof Products>;
export type Category = InferSelectModel<typeof Categories>;
export type NewCategory = InferInsertModel<typeof Categories>;
export type Supplier = InferSelectModel<typeof Suppliers>;
export type NewSupplier = InferInsertModel<typeof Suppliers>;

// Connect to Vercel Postgres
// export const db = drizzle(sql);
