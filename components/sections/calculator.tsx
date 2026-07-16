"use client";

import { useMemo, useState } from "react";
import { Container, SectionHeading, Button } from "@/components/ui";
import { Reveal } from "@/components/motion";

function formatInr(value: number): string {
  if (value >= 1e7) return `₹${(value / 1e7).toFixed(2)} Cr`;
  if (value >= 1e5) return `₹${(value / 1e5).toFixed(1)} L`;
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

interface Field {
  label: string;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}

const fields: Record<string, Field> = {
  amount: {
    label: "Investment amount",
    min: 5e6,
    max: 1.5e8,
    step: 2.5e6,
    format: formatInr,
  },
  appreciation: {
    label: "Expected appreciation",
    min: 4,
    max: 20,
    step: 0.5,
    format: (v) => `${v}% p.a.`,
  },
  yield: {
    label: "Rental yield",
    min: 0,
    max: 10,
    step: 0.5,
    format: (v) => `${v}% p.a.`,
  },
  years: {
    label: "Holding period",
    min: 1,
    max: 15,
    step: 1,
    format: (v) => `${v} ${v === 1 ? "year" : "years"}`,
  },
};

export function InvestmentCalculator() {
  const [values, setValues] = useState({
    amount: 2e7,
    appreciation: 12,
    yield: 6,
    years: 5,
  });
  const [downloading, setDownloading] = useState(false);

  const results = useMemo(() => {
    const { amount, appreciation, yield: rentalYield, years } = values;
    const futureValue = amount * Math.pow(1 + appreciation / 100, years);

    // Rent grows with the property's value each year
    let rentalTotal = 0;
    for (let year = 0; year < years; year++) {
      rentalTotal += amount * Math.pow(1 + appreciation / 100, year) * (rentalYield / 100);
    }

    const totalReturns = futureValue - amount + rentalTotal;
    const multiple = (futureValue + rentalTotal) / amount;
    return { futureValue, rentalTotal, totalReturns, multiple };
  }, [values]);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [key]: Number(e.target.value) }));

  async function downloadPdf() {
    setDownloading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const inr = (v: number) =>
        v >= 1e7 ? `Rs ${(v / 1e7).toFixed(2)} crore` : `Rs ${(v / 1e5).toFixed(1)} lakh`;

      doc.setFillColor(26, 25, 23);
      doc.rect(0, 0, 210, 52, "F");
      doc.setTextColor(156, 124, 70);
      doc.setFontSize(9);
      doc.text("THINK REALTY  x  LUXOFY PROPERTIES", 20, 20);
      doc.setTextColor(253, 252, 249);
      doc.setFontSize(22);
      doc.text("Goa Investment Projection", 20, 34);
      doc.setFontSize(10);
      doc.setTextColor(200, 195, 185);
      doc.text("Prepared via the Goa Luxury Investor Showcase calculator", 20, 43);

      doc.setTextColor(26, 25, 23);
      doc.setFontSize(12);
      doc.text("Your assumptions", 20, 68);
      doc.setDrawColor(226, 221, 209);
      doc.line(20, 71, 190, 71);

      const rows: [string, string][] = [
        ["Investment amount", inr(values.amount)],
        ["Expected appreciation", `${values.appreciation}% per annum`],
        ["Rental yield", `${values.yield}% per annum`],
        ["Holding period", `${values.years} years`],
      ];
      doc.setFontSize(10);
      rows.forEach(([label, value], i) => {
        doc.setTextColor(111, 106, 96);
        doc.text(label, 20, 82 + i * 9);
        doc.setTextColor(26, 25, 23);
        doc.text(value, 110, 82 + i * 9);
      });

      doc.setFontSize(12);
      doc.text("Projected outcome", 20, 128);
      doc.line(20, 131, 190, 131);

      const outputs: [string, string][] = [
        ["Projected property value", inr(results.futureValue)],
        ["Cumulative rental earnings", inr(results.rentalTotal)],
        ["Total returns over holding period", inr(results.totalReturns)],
        ["Money multiple", `${results.multiple.toFixed(2)}x`],
      ];
      doc.setFontSize(10);
      outputs.forEach(([label, value], i) => {
        doc.setTextColor(111, 106, 96);
        doc.text(label, 20, 142 + i * 9);
        doc.setTextColor(156, 124, 70);
        doc.setFontSize(11);
        doc.text(value, 110, 142 + i * 9);
        doc.setFontSize(10);
      });

      doc.setTextColor(150, 145, 135);
      doc.setFontSize(8);
      doc.text(
        "Indicative projection for discussion only. Not investment advice. Actual returns depend on market conditions,\nproject selection and rental management. Discuss specifics with an advisor at the showcase on 9 August 2026.",
        20,
        195
      );
      doc.text("luxofy.in  |  sales@luxofy.in  |  +91 79690 33999", 20, 215);

      doc.save("goa-investment-projection.pdf");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <section id="calculator" className="bg-parchment py-28 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Investment calculator"
            title="Run your own numbers"
            copy="Adjust the assumptions to match your budget and outlook. The projection compounds capital growth annually and grows rent alongside the property's value."
          />
        </Reveal>

        <Reveal className="mt-16">
          <div className="grid overflow-hidden border border-line bg-cream lg:grid-cols-[3fr_2fr]">
            {/* Inputs */}
            <div className="space-y-10 p-9 md:p-12 lg:p-14">
              {(Object.keys(fields) as (keyof typeof values)[]).map((key) => {
                const field = fields[key];
                return (
                  <div key={key}>
                    <div className="mb-4 flex items-baseline justify-between gap-4">
                      <label
                        htmlFor={`calc-${key}`}
                        className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone"
                      >
                        {field.label}
                      </label>
                      <span className="font-display text-2xl text-ink">
                        {field.format(values[key])}
                      </span>
                    </div>
                    <input
                      id={`calc-${key}`}
                      type="range"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={values[key]}
                      onChange={set(key)}
                      className="w-full"
                    />
                    <div className="mt-2 flex justify-between text-[11px] text-stone/70">
                      <span>{field.format(field.min)}</span>
                      <span>{field.format(field.max)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Outputs */}
            <div className="flex flex-col justify-between bg-ink p-9 text-cream md:p-12 lg:p-14">
              <div className="space-y-8">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">
                    Projected property value
                  </p>
                  <p className="font-display mt-3 text-4xl font-light text-bronze md:text-[3.2rem] md:leading-none">
                    {formatInr(results.futureValue)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8 border-t border-line-dark pt-8">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">
                      Rental earnings
                    </p>
                    <p className="font-display mt-2 text-2xl">
                      {formatInr(results.rentalTotal)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/50">
                      Total returns
                    </p>
                    <p className="font-display mt-2 text-2xl">
                      {formatInr(results.totalReturns)}
                    </p>
                  </div>
                </div>
                <p className="border-t border-line-dark pt-8 text-[13px] leading-relaxed text-cream/60">
                  Your capital grows to{" "}
                  <span className="text-cream">{results.multiple.toFixed(2)}x</span> over{" "}
                  {values.years} {values.years === 1 ? "year" : "years"}, combining appreciation and
                  rental income.
                </p>
              </div>

              <Button
                type="button"
                variant="bronze"
                onClick={downloadPdf}
                disabled={downloading}
                className="mt-10 w-full"
              >
                {downloading ? "Preparing PDF" : "Download projection PDF"}
              </Button>
            </div>
          </div>
          <p className="mt-4 text-[12px] text-stone/80">
            Indicative projection for discussion only, not investment advice.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
