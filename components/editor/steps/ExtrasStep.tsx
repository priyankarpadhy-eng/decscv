"use client";

import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Profile } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "@phosphor-icons/react";

export function ExtrasStep({ form }: { form: UseFormReturn<Profile> }) {
  const { control, register } = form;

  const {
    fields: achFields,
    append: appendAch,
    remove: removeAch,
  } = useFieldArray({
    control,
    name: "achievements",
  });

  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({
    control,
    name: "certifications",
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
          Step 07 · Recognition
        </span>
        <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
          Achievements & Certifications
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Hackathon wins, competitive programming ranks, licenses, and verified credentials.
        </p>
      </div>

      {/* Achievements Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700">
            Achievements & Awards ({achFields.length})
          </span>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            icon={<Plus size={14} weight="bold" />}
            onClick={() =>
              appendAch({
                id: Math.random().toString(36).substring(2, 9),
                title: "",
                issuer: "SIH / College",
                date: "2024",
              })
            }
          >
            Add Award
          </Button>
        </div>

        <div className="space-y-3">
          {achFields.map((field, idx) => (
            <div
              key={field.id}
              className="p-4 border border-slate-200/90 rounded-2xl bg-white shadow-card flex flex-col gap-2.5 transition-all"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-xs font-semibold text-slate-600">Award #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeAch(idx)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash size={15} />
                </button>
              </div>
              <Input
                label="Award Title"
                placeholder="e.g. Smart India Hackathon Finalist"
                {...register(`achievements.${idx}.title` as const)}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Issued By"
                  placeholder="Govt. of India / LeetCode"
                  {...register(`achievements.${idx}.issuer` as const)}
                />
                <Input
                  label="Year / Date"
                  placeholder="2024"
                  {...register(`achievements.${idx}.date` as const)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700">
            Licenses & Certifications ({certFields.length})
          </span>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            icon={<Plus size={14} weight="bold" />}
            onClick={() =>
              appendCert({
                id: Math.random().toString(36).substring(2, 9),
                name: "",
                issuer: "AWS / Autodesk",
                date: "2024",
              })
            }
          >
            Add Certificate
          </Button>
        </div>

        <div className="space-y-3">
          {certFields.map((field, idx) => (
            <div
              key={field.id}
              className="p-4 border border-slate-200/90 rounded-2xl bg-white shadow-card flex flex-col gap-2.5 transition-all"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-xs font-semibold text-slate-600">Cert #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeCert(idx)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash size={15} />
                </button>
              </div>
              <Input
                label="Certificate Name"
                placeholder="e.g. AWS Certified Solutions Architect"
                {...register(`certifications.${idx}.name` as const)}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Issuing Organization"
                  placeholder="e.g. Amazon Web Services"
                  {...register(`certifications.${idx}.issuer` as const)}
                />
                <Input
                  label="Date"
                  placeholder="2023"
                  {...register(`certifications.${idx}.date` as const)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
