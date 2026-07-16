"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/components/motion";

/* ------------------------------------------------------------------ data */

const STEPS = [
  "Basic information",
  "Investment profile",
  "Buying intent",
  "Qualification",
  "Confirmation",
];

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi NCR", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Chandigarh", "Jammu and Kashmir", "Ladakh", "Puducherry", "Outside India",
];

const OCCUPATIONS = ["Founder", "CXO", "Business Owner", "Doctor", "NRI", "Professional", "Employee", "Other"];
const INCOMES = ["Under 25L", "25L-50L", "50L-1Cr", "1Cr-5Cr", "5Cr+", "Prefer not to say"];
const NET_WORTHS = ["Under 1Cr", "1-5Cr", "5-10Cr", "10-50Cr", "50Cr+", "Prefer not to say"];
const BUDGETS = ["Under 50L", "50L-1Cr", "1-2Cr", "2-5Cr", "5Cr+"];
const TIMELINES = ["Immediate", "3 Months", "6 Months", "12 Months", "Just Exploring"];
const INVESTMENTS = ["Stocks", "Mutual Funds", "Commercial", "Residential", "Land", "Gold", "Crypto", "Business"];
const PURPOSES = ["Investment", "Holiday Home", "Rental", "Retirement", "Self Use"];
const PROPERTY_TYPES = ["Apartment", "Villa", "Land", "Commercial"];
const GOA_LOCATIONS = ["North Goa", "South Goa", "Both", "Not Sure"];
const SOURCES = ["Instagram", "Facebook", "LinkedIn", "Google", "Friend", "Referral", "Broker", "YouTube"];
const PAYMENTS = ["Loan", "Self Funded", "Mix"];
const WOULD_LIKE = ["Site Visit", "Video Call", "Consultation", "Portfolio Review"];
const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  age: string;
  gender: string;
  occupation: string;
  company: string;
  designation: string;
  linkedin: string;
  annualIncome: string;
  netWorth: string;
  budget: string;
  timeline: string;
  currentInvestments: string[];
  purpose: string;
  propertyType: string;
  goaLocation: string;
  hearAbout: string;
  expectedValue: string;
  paymentPreference: string;
  wouldLike: string[];
  acceptedTerms: boolean;
}

const initialData: FormData = {
  fullName: "", email: "", phone: "", city: "", state: "", country: "India",
  age: "", gender: "", occupation: "", company: "", designation: "", linkedin: "",
  annualIncome: "", netWorth: "", budget: "", timeline: "", currentInvestments: [],
  purpose: "", propertyType: "", goaLocation: "", hearAbout: "", expectedValue: "",
  paymentPreference: "", wouldLike: [], acceptedTerms: false,
};

/* ---------------------------------------------------------- primitives */

function FieldLabel({ htmlFor, children, optional }: { htmlFor?: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-stone">
      {children}
      {optional ? <span className="ml-2 font-normal normal-case tracking-normal text-stone/60">Optional</span> : null}
    </label>
  );
}

const inputClass =
  "w-full border border-line bg-cream px-4 py-3.5 text-[15px] text-ink placeholder:text-stone/50 transition-colors focus:border-bronze focus:outline-none";

function TextField({
  id, label, value, onChange, error, type = "text", placeholder, optional, inputMode,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void; error?: string;
  type?: string; placeholder?: string; optional?: boolean;
  inputMode?: "text" | "email" | "tel" | "numeric" | "url";
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} optional={optional}>{label}</FieldLabel>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`${inputClass} ${error ? "border-red-700" : ""}`}
      />
      {error ? <p className="mt-1.5 text-[13px] text-red-800">{error}</p> : null}
    </div>
  );
}

function SelectField({
  id, label, value, onChange, options, error, placeholder, optional,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  options: string[]; error?: string; placeholder?: string; optional?: boolean;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} optional={optional}>{label}</FieldLabel>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1%201L5%205L9%201%22%20stroke%3D%22%236F6A60%22%20stroke-width%3D%221.5%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10 ${error ? "border-red-700" : ""} ${value ? "" : "text-stone/50"}`}
      >
        <option value="" disabled>
          {placeholder ?? "Select"}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <p className="mt-1.5 text-[13px] text-red-800">{error}</p> : null}
    </div>
  );
}

function PillGroup({
  label, options, value, onChange, error, columnsClass = "",
}: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
  error?: string; columnsClass?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone">{label}</legend>
      <div className={`flex flex-wrap gap-2 ${columnsClass}`}>
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={selected}
              className={`px-4 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                selected
                  ? "bg-ink text-cream"
                  : "border border-line bg-cream text-stone hover:border-bronze hover:text-bronze"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error ? <p className="mt-2 text-[13px] text-red-800">{error}</p> : null}
    </fieldset>
  );
}

function MultiPillGroup({
  label, options, values, onChange, optional,
}: {
  label: string; options: string[]; values: string[]; onChange: (v: string[]) => void; optional?: boolean;
}) {
  const toggle = (option: string) =>
    onChange(values.includes(option) ? values.filter((v) => v !== option) : [...values, option]);

  return (
    <fieldset>
      <legend className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone">
        {label}
        {optional ? <span className="ml-2 font-normal normal-case tracking-normal text-stone/60">Select all that apply</span> : null}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = values.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              aria-pressed={selected}
              className={`px-4 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                selected
                  ? "bg-bronze text-cream"
                  : "border border-line bg-cream text-stone hover:border-bronze hover:text-bronze"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ------------------------------------------------------------- the form */

type OtpState = "idle" | "sending" | "sent" | "verifying" | "verified";

export function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otpState, setOtpState] = useState<OtpState>("idle");
  const [otpCode, setOtpCode] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  // Changing the email invalidates a previous verification
  const setEmail = (value: string) => {
    set("email", value);
    setOtpState("idle");
    setOtpCode("");
    setOtpMessage("");
  };

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  /* ------------------------------ otp */

  async function sendOtp() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email address" }));
      return;
    }
    setOtpState("sending");
    setOtpMessage("");
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email.trim() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Could not send the code");
      setOtpState("sent");
      setOtpMessage(
        json.devCode
          ? `Code sent. Development mode: your code is ${json.devCode}.`
          : "Code sent to your inbox. Check spam if it does not arrive within a minute."
      );
    } catch (error) {
      setOtpState("idle");
      setOtpMessage(error instanceof Error ? error.message : "Could not send the code");
    }
  }

  async function verifyOtpCode() {
    setOtpState("verifying");
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email.trim(), code: otpCode.trim() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Verification failed");
      setOtpState("verified");
      setOtpMessage("Email verified.");
    } catch (error) {
      setOtpState("sent");
      setOtpMessage(error instanceof Error ? error.message : "Verification failed");
    }
  }

  /* ------------------------- validation */

  function validateStep(current: number): boolean {
    const next: Record<string, string> = {};

    if (current === 0) {
      if (data.fullName.trim().length < 2) next.fullName = "Enter your full name";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) next.email = "Enter a valid email address";
      else if (otpState !== "verified") next.email = "Please verify your email with the OTP";
      if (!/^\+?[0-9]{10,15}$/.test(data.phone.trim())) next.phone = "Enter a valid 10 digit mobile number";
      if (data.city.trim().length < 2) next.city = "Enter your city";
      if (!data.state) next.state = "Select your state";
      if (data.age && (Number(data.age) < 18 || Number(data.age) > 100)) next.age = "Enter an age between 18 and 100";
      if (!data.occupation) next.occupation = "Select your occupation";
    }
    if (current === 1) {
      if (!data.budget) next.budget = "Select your investment budget";
      if (!data.timeline) next.timeline = "Select your timeline";
    }
    if (current === 2) {
      if (!data.purpose) next.purpose = "Select your primary purpose";
      if (!data.propertyType) next.propertyType = "Select a property type";
      if (!data.goaLocation) next.goaLocation = "Select a preference";
    }
    if (current === 3) {
      if (!data.hearAbout) next.hearAbout = "Tell us how you found us";
    }
    if (current === 4) {
      if (!data.acceptedTerms) next.acceptedTerms = "Please accept the terms and privacy policy to continue";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  /* ----------------------------- submit */

  async function submit() {
    if (!validateStep(4)) return;
    setSubmitting(true);
    setSubmitError("");

    let attribution: Record<string, string | undefined> = {};
    let referrer: string | undefined;
    try {
      attribution = JSON.parse(sessionStorage.getItem("attribution") ?? "{}");
      referrer = sessionStorage.getItem("referrer") ?? undefined;
    } catch {
      // best effort
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          age: data.age ? Number(data.age) : undefined,
          gender: data.gender || undefined,
          annualIncome: data.annualIncome || undefined,
          netWorth: data.netWorth || undefined,
          paymentPreference: data.paymentPreference || undefined,
          ...attribution,
          referrer,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong. Please try again.");

      // Client-side conversion events when tags are configured
      const w = window as typeof window & { fbq?: (...a: unknown[]) => void; gtag?: (...a: unknown[]) => void };
      w.fbq?.("track", "CompleteRegistration");
      w.gtag?.("event", "generate_lead", { method: "event_registration" });

      router.push(`/thank-you?name=${encodeURIComponent(json.firstName)}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  /* ------------------------------ steps */

  const reviewRows: [string, string][] = [
    ["Name", data.fullName],
    ["Email", `${data.email} (verified)`],
    ["Mobile", data.phone],
    ["Location", [data.city, data.state].filter(Boolean).join(", ")],
    ["Occupation", [data.occupation, data.company].filter(Boolean).join(", ")],
    ["Budget", data.budget],
    ["Timeline", data.timeline],
    ["Purpose", data.purpose],
    ["Property type", data.propertyType],
    ["Preferred location", data.goaLocation],
    ["Heard about us", data.hearAbout],
    ["Would like", data.wouldLike.join(", ") || "Not specified"],
  ];

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* Progress */}
      <nav aria-label="Registration progress" className="mb-12">
        <ol className="flex items-center gap-0">
          {STEPS.map((name, i) => (
            <li key={name} className="flex flex-1 flex-col gap-2.5">
              <span
                className={`h-[3px] w-full transition-colors duration-500 ${
                  i < step ? "bg-bronze" : i === step ? "bg-ink" : "bg-line"
                }`}
                aria-hidden="true"
              />
              <span
                className={`hidden text-[10px] font-semibold uppercase tracking-[0.12em] md:block ${
                  i === step ? "text-ink" : i < step ? "text-bronze" : "text-stone/60"
                }`}
                aria-current={i === step ? "step" : undefined}
              >
                {name}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-[12px] text-stone md:hidden">
          Step {step + 1} of {STEPS.length}: <span className="font-semibold text-ink">{STEPS[step]}</span>
        </p>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {step === 0 ? (
            <div className="space-y-7">
              <div className="grid gap-7 sm:grid-cols-2">
                <TextField id="fullName" label="Full name" value={data.fullName} onChange={(v) => set("fullName", v)} error={errors.fullName} placeholder="Aditya Sharma" />
                <TextField id="phone" label="Mobile number" type="tel" inputMode="tel" value={data.phone} onChange={(v) => set("phone", v.replace(/[^\d+]/g, ""))} error={errors.phone} placeholder="98765 43210" />
              </div>

              {/* Email + OTP verification */}
              <div>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <div className="flex gap-2">
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    value={data.email}
                    placeholder="you@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={otpState === "verified"}
                    aria-invalid={Boolean(errors.email)}
                    className={`${inputClass} ${errors.email ? "border-red-700" : ""} disabled:bg-parchment`}
                  />
                  {otpState === "verified" ? (
                    <span className="flex shrink-0 items-center gap-2 rounded-full border border-bronze/40 bg-bronze/10 px-5 text-[11px] font-medium uppercase tracking-[0.12em] text-bronze-deep">
                      <svg width="13" height="10" viewBox="0 0 13 10" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M1 5L4.5 8.5L12 1" /></svg>
                      Verified
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={otpState === "sending"}
                      className="shrink-0 rounded-full bg-ink px-6 text-[11px] font-medium uppercase tracking-[0.12em] text-cream transition-colors hover:bg-bronze disabled:opacity-60"
                    >
                      {otpState === "sending" ? "Sending" : otpState === "idle" ? "Send code" : "Resend"}
                    </button>
                  )}
                </div>
                {errors.email ? <p className="mt-1.5 text-[13px] text-red-800">{errors.email}</p> : null}

                {(otpState === "sent" || otpState === "verifying") ? (
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="6 digit code"
                      aria-label="One time password"
                      className={`${inputClass} max-w-[200px] tracking-[0.3em]`}
                    />
                    <button
                      type="button"
                      onClick={verifyOtpCode}
                      disabled={otpCode.length !== 6 || otpState === "verifying"}
                      className="shrink-0 rounded-full border border-ink px-6 text-[11px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:border-bronze hover:text-bronze disabled:opacity-50"
                    >
                      {otpState === "verifying" ? "Checking" : "Verify"}
                    </button>
                  </div>
                ) : null}
                {otpMessage ? (
                  <p className={`mt-2 text-[13px] ${otpState === "verified" ? "text-bronze-deep" : "text-stone"}`}>
                    {otpMessage}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <TextField id="city" label="City" value={data.city} onChange={(v) => set("city", v)} error={errors.city} placeholder="New Delhi" />
                <SelectField id="state" label="State" value={data.state} onChange={(v) => set("state", v)} options={INDIAN_STATES} error={errors.state} />
              </div>
              <div className="grid gap-7 sm:grid-cols-3">
                <TextField id="country" label="Country" value={data.country} onChange={(v) => set("country", v)} />
                <TextField id="age" label="Age" inputMode="numeric" value={data.age} onChange={(v) => set("age", v.replace(/\D/g, ""))} error={errors.age} optional placeholder="42" />
                <SelectField id="gender" label="Gender" value={data.gender} onChange={(v) => set("gender", v)} options={GENDERS} optional />
              </div>
              <PillGroup label="Occupation" options={OCCUPATIONS} value={data.occupation} onChange={(v) => set("occupation", v)} error={errors.occupation} />
              <div className="grid gap-7 sm:grid-cols-2">
                <TextField id="company" label="Company" value={data.company} onChange={(v) => set("company", v)} optional />
                <TextField id="designation" label="Designation" value={data.designation} onChange={(v) => set("designation", v)} optional />
              </div>
              <TextField id="linkedin" label="LinkedIn profile" inputMode="url" value={data.linkedin} onChange={(v) => set("linkedin", v)} optional placeholder="linkedin.com/in/yourname" />
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-9">
              <div className="grid gap-7 sm:grid-cols-2">
                <SelectField id="annualIncome" label="Annual income" value={data.annualIncome} onChange={(v) => set("annualIncome", v)} options={INCOMES} optional />
                <SelectField id="netWorth" label="Approximate net worth" value={data.netWorth} onChange={(v) => set("netWorth", v)} options={NET_WORTHS} optional />
              </div>
              <PillGroup label="Investment budget" options={BUDGETS} value={data.budget} onChange={(v) => set("budget", v)} error={errors.budget} />
              <PillGroup label="Investment timeline" options={TIMELINES} value={data.timeline} onChange={(v) => set("timeline", v)} error={errors.timeline} />
              <MultiPillGroup label="Current investments" options={INVESTMENTS} values={data.currentInvestments} onChange={(v) => set("currentInvestments", v)} optional />
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-9">
              <PillGroup label="Primary purpose" options={PURPOSES} value={data.purpose} onChange={(v) => set("purpose", v)} error={errors.purpose} />
              <PillGroup label="Interested property type" options={PROPERTY_TYPES} value={data.propertyType} onChange={(v) => set("propertyType", v)} error={errors.propertyType} />
              <PillGroup label="Preferred Goa location" options={GOA_LOCATIONS} value={data.goaLocation} onChange={(v) => set("goaLocation", v)} error={errors.goaLocation} />
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-9">
              <PillGroup label="How did you hear about us?" options={SOURCES} value={data.hearAbout} onChange={(v) => set("hearAbout", v)} error={errors.hearAbout} />
              <TextField id="expectedValue" label="Expected purchase value" value={data.expectedValue} onChange={(v) => set("expectedValue", v)} optional placeholder="For example, around 2.5 Cr" />
              <PillGroup label="Preferred payment" options={PAYMENTS} value={data.paymentPreference} onChange={(v) => set("paymentPreference", v)} />
              <MultiPillGroup label="You would like" options={WOULD_LIKE} values={data.wouldLike} onChange={(v) => set("wouldLike", v)} optional />
            </div>
          ) : null}

          {step === 4 ? (
            <div>
              <h2 className="font-display text-3xl font-normal text-ink">Review your details</h2>
              <p className="mt-2 text-[15px] text-stone">
                A quick check before you submit. Use Back to change anything.
              </p>
              <dl className="mt-8 grid gap-x-10 gap-y-4 border border-line bg-cream p-8 sm:grid-cols-2">
                {reviewRows.map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone">{label}</dt>
                    <dd className="text-[15px] font-medium text-ink">{value || "Not specified"}</dd>
                  </div>
                ))}
              </dl>

              <label className="mt-8 flex cursor-pointer items-start gap-3.5">
                <input
                  type="checkbox"
                  checked={data.acceptedTerms}
                  onChange={(e) => set("acceptedTerms", e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#9c7c46]"
                />
                <span className="text-[14px] leading-relaxed text-stone">
                  I agree to the{" "}
                  <a href="/terms" target="_blank" className="font-medium text-ink underline underline-offset-2 hover:text-bronze">terms of use</a>{" "}
                  and{" "}
                  <a href="/privacy" target="_blank" className="font-medium text-ink underline underline-offset-2 hover:text-bronze">privacy policy</a>,
                  and consent to being contacted about this event on WhatsApp, email and phone.
                </span>
              </label>
              {errors.acceptedTerms ? <p className="mt-2 text-[13px] text-red-800">{errors.acceptedTerms}</p> : null}
              {submitError ? (
                <p className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-800">{submitError}</p>
              ) : null}
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-8">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(s - 1, 0))}
          disabled={step === 0 || submitting}
          className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-stone transition-colors hover:text-ink disabled:invisible"
        >
          <svg width="14" height="10" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 1L1 6L6 11M1 6H16" /></svg>
          Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="pill inline-flex items-center gap-3 bg-ink px-9 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-cream transition-colors duration-300"
          >
            <span className="pill-fill bg-bronze" aria-hidden="true" />
            Continue
            <svg width="14" height="10" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M10 1L15 6L10 11M15 6H0" /></svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="pill inline-flex items-center gap-3 bg-bronze px-9 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-cream transition-colors duration-300 disabled:opacity-60"
          >
            <span className="pill-fill bg-ink" aria-hidden="true" />
            {submitting ? "Submitting" : "Confirm registration"}
          </button>
        )}
      </div>
    </div>
  );
}
