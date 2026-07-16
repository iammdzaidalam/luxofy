import { z } from "zod";

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[0-9]{10,15}$/, "Enter a valid mobile number");

export const otpSendSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(200),
});

export const otpVerifySchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(200),
  code: z.string().trim().regex(/^[0-9]{6}$/, "Enter the 6 digit code"),
});

export const registrationSchema = z.object({
  // Step 1
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(200),
  phone: phoneSchema,
  city: z.string().trim().min(2, "Enter your city").max(100),
  state: z.string().trim().min(2, "Select your state").max(100),
  country: z.string().trim().min(2).max(100).default("India"),
  age: z.coerce.number().int().min(18, "You must be at least 18").max(100).optional(),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]).optional(),
  occupation: z.enum([
    "Founder",
    "CXO",
    "Business Owner",
    "Doctor",
    "NRI",
    "Professional",
    "Employee",
    "Other",
  ]),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  designation: z.string().trim().max(150).optional().or(z.literal("")),
  linkedin: z.string().trim().max(300).optional().or(z.literal("")),

  // Step 2
  annualIncome: z
    .enum(["Under 25L", "25L-50L", "50L-1Cr", "1Cr-5Cr", "5Cr+", "Prefer not to say"])
    .optional(),
  netWorth: z
    .enum(["Under 1Cr", "1-5Cr", "5-10Cr", "10-50Cr", "50Cr+", "Prefer not to say"])
    .optional(),
  budget: z.enum(["Under 50L", "50L-1Cr", "1-2Cr", "2-5Cr", "5Cr+"]),
  timeline: z.enum(["Immediate", "3 Months", "6 Months", "12 Months", "Just Exploring"]),
  currentInvestments: z
    .array(
      z.enum(["Stocks", "Mutual Funds", "Commercial", "Residential", "Land", "Gold", "Crypto", "Business"])
    )
    .default([]),

  // Step 3
  purpose: z.enum(["Investment", "Holiday Home", "Rental", "Retirement", "Self Use"]),
  propertyType: z.enum(["Apartment", "Villa", "Land", "Commercial"]),
  goaLocation: z.enum(["North Goa", "South Goa", "Both", "Not Sure"]),

  // Step 4
  hearAbout: z.enum([
    "Instagram",
    "Facebook",
    "LinkedIn",
    "Google",
    "Friend",
    "Referral",
    "Broker",
    "YouTube",
  ]),
  expectedValue: z.string().trim().max(100).optional().or(z.literal("")),
  paymentPreference: z.enum(["Loan", "Self Funded", "Mix"]).optional(),
  wouldLike: z
    .array(z.enum(["Site Visit", "Video Call", "Consultation", "Portfolio Review"]))
    .default([]),

  // Step 5
  acceptedTerms: z.literal(true, { message: "Please accept the terms" }),

  // Attribution
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  referrer: z.string().max(500).optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
