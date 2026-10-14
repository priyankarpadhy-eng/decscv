"use client";

import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Profile, LinkKind } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "@phosphor-icons/react";

export function BasicsStep({ form }: { form: UseFormReturn<Profile> }) {
  const { register, control, formState: { errors } } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "basics.links",
  });

  const linkKinds: LinkKind[] = [
    "github",
    "linkedin",
    "leetcode",
    "behance",
    "dribbble",
    "twitter",
    "portfolio",
    "other",
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6E44FF]">
          Step 01 · Essentials
        </span>
        <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
          Basic Information
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Tell recruiters who you are and where they can reach you.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Input
          label="Full Name"
          placeholder="Full name"
          {...register("basics.name")}
          error={errors.basics?.name?.message}
        />

        <Input
          label="Professional Headline"
          hint="Max 120 chars"
          placeholder="e.g. Software Engineer · Full-Stack & Systems"
          {...register("basics.headline")}
          error={errors.basics?.headline?.message}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            {...register("basics.email")}
            error={errors.basics?.email?.message}
          />

          <Input
            label="Phone Number (Optional)"
            placeholder="+91 98765 43210"
            {...register("basics.phone")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Location"
            placeholder="City, Country"
            {...register("basics.location")}
          />

          <Input
            label="Avatar Photo URL (Optional)"
            placeholder="https://..."
            {...register("basics.photo.url")}
          />
        </div>

        {/* Available for Work Card */}
        <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-slate-900">
              Available For Work / Placement
            </span>
            <span className="text-xs text-slate-500">
              Shows a green live availability badge on your public portfolio
            </span>
          </div>
          <input
            type="checkbox"
            className="w-4.5 h-4.5 accent-[#10B981] rounded-md cursor-pointer"
            {...register("basics.availableForWork")}
          />
        </div>

        {/* Social / Portfolio Links */}
        <div className="flex flex-col gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">
              Profiles & Social Links
            </span>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              icon={<Plus size={14} weight="bold" />}
              onClick={() => append({ kind: "github", label: "GitHub", url: "" })}
            >
              Add Link
            </Button>
          </div>

          <div className="space-y-2.5">
            {fields.map((field, idx) => (
              <div
                key={field.id}
                className="flex items-center gap-2 p-2 rounded-xl border border-slate-200/80 bg-white shadow-sm"
              >
                <select
                  className="bg-slate-50 text-xs font-semibold text-slate-700 rounded-lg px-2.5 py-1.5 uppercase focus:outline-none border border-slate-200"
                  {...register(`basics.links.${idx}.kind` as const)}
                >
                  {linkKinds.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>

                <input
                  placeholder="Label (e.g. GitHub)"
                  className="w-24 text-xs font-medium text-slate-800 bg-transparent px-1 focus:outline-none"
                  {...register(`basics.links.${idx}.label` as const)}
                />

                <input
                  placeholder="https://..."
                  className="flex-1 text-xs text-slate-600 bg-transparent px-1 focus:outline-none"
                  {...register(`basics.links.${idx}.url` as const)}
                />

                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
