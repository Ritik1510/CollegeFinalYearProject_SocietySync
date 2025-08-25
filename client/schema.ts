import { z } from "zod";

// ---------------- USER ----------------
export const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["tenant", "manager", "owner", "visitor", "security"]),
  name: z.string().min(1, "Name is required"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

// ---------------- APARTMENT ----------------
export const insertApartmentSchema = z.object({
  number: z.string().min(1, "Apartment number required"),
  building: z.string().min(1, "Building name required"),
  tenantId: z.number().optional(),
  ownerId: z.number().optional(),
  rent: z.number().int().positive(),
  status: z.enum(["vacant", "occupied"]).default("vacant"),
  area: z.number().int().positive(),
  amenities: z.array(z.string()).optional(), // plain string array in frontend
  lastMaintenanceDate: z.date().optional(),
  societyName: z.string().min(1, "Society name required"),
});

export type InsertApartment = z.infer<typeof insertApartmentSchema>;

// ---------------- MAINTENANCE REQUEST ----------------
export const insertMaintenanceRequestSchema = z.object({
  apartmentId: z.number(),
  tenantId: z.number(),
  description: z.string().min(1, "Description required"),
  status: z.enum(["pending", "in_progress", "completed", "denied"]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});


// ---------------- PAYMENT ----------------
export const insertPaymentSchema = z.object({
  apartmentId: z.number(),
  tenantId: z.number(),
  amount: z.number().positive(),
  date: z.date(),
  type: z.enum(["rent", "maintenance"]),
});


// ---------------- VISITOR ----------------
export const insertVisitorSchema = z.object({
  name: z.string().min(1),
  purpose: z.string().min(1),
  status: z.enum(["upcoming", "current", "past", "pending"]),
  apartmentId: z.number(),
  expectedAt: z.date(),
  actualEntryAt: z.date().optional(),
  actualExitAt: z.date().optional(),
  approvedBy: z.number().optional(),
  contactNumber: z.string().min(1),
  pendingApproval: z.boolean().default(false),
});


// ---------------- ANNOUNCEMENT ----------------
export const insertAnnouncementSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  createdAt: z.date().optional(),
  createdBy: z.number(),
  important: z.boolean().default(false),
});

export type InsertMaintenanceRequest = z.infer<typeof insertMaintenanceRequestSchema>;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type InsertVisitor = z.infer<typeof insertVisitorSchema>;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;
