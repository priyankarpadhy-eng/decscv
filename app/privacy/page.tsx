import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock, Trash, Eye, Globe } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Privacy Policy — DecsCV",
  description: "Learn how DecsCV collects, protects, and manages your resume and portfolio data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-sm font-bold text-slate-900 tracking-tight"
          >
            <span className="w-7 h-7 rounded-lg bg-[#6E44FF] text-white flex items-center justify-center font-extrabold text-xs shadow-sm shadow-[#6E44FF]/25">
              D
            </span>
            <span>decs/cv</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[760px] w-full mx-auto px-6 py-12 sm:py-16 flex flex-col gap-10">
        {/* Title Header */}
        <div className="flex flex-col gap-3 border-b border-slate-200/80 pb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6E44FF] text-xs font-semibold w-max border border-purple-200/60">
            <ShieldCheck size={16} weight="bold" />
            <span>Privacy & Data Protection</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 font-normal">
            Last updated: October 13, 2026 · Effective for all users of cv.decslab.in
          </p>
        </div>

        {/* Quick Highlights Box */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card flex flex-col gap-3.5">
          <h3 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
            <Lock size={18} className="text-[#6E44FF]" weight="bold" />
            <span>Our Core Privacy Principles</span>
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 font-medium">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
              <span>We never sell or rent your personal information to data brokers or advertisers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
              <span>Your profile is only accessible via your public URL if you choose to publish it.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
              <span>Full data ownership: export your complete profile JSON at any time.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
              <span>One-click permanent account and data erasure from Firestore and Storage.</span>
            </li>
          </ul>
        </div>

        {/* Policy Sections */}
        <div className="flex flex-col gap-8 text-sm text-slate-700 leading-relaxed font-normal">
          <section className="flex flex-col gap-3">
            <h2 className="font-display text-xl font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              When you use DecsCV, we collect only the information necessary to provide you with an ATS-compliant placement resume and a portfolio website:
            </p>
            <div className="space-y-2 pl-4 border-l-2 border-[#6E44FF]/30">
              <p>
                <strong>Google Account Information:</strong> When you sign in using Google Authentication, we receive your Google user ID, primary email address, full name, and profile picture avatar.
              </p>
              <p>
                <strong>Career & Portfolio Content:</strong> Information you voluntarily input into the builder, including professional summary, educational institutions, internship and employment records, project titles, tech stacks, and social profile links.
              </p>
              <p>
                <strong>Analytics & Usage Telemetry:</strong> Aggregated, non-personally identifiable visit counters (e.g. view count) used to display profile performance metrics on your private dashboard.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-xl font-bold text-slate-900">2. How Your Data Is Used</h2>
            <p>We process your data strictly for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Generating your responsive public portfolio website across our 8 visual engines.</li>
              <li>Rendering your downloadable A4 placement resume PDF.</li>
              <li>Associating and synchronizing your draft profile with your authenticated user account.</li>
              <li>Preventing spam, abuse, unauthorized account access, and domain impersonation.</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-xl font-bold text-slate-900">3. Google API Services & Limited Use Policy</h2>
            <p>
              DecsCV&apos;s use and transfer of information received from Google APIs to any other app adheres to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noreferrer"
                className="text-[#6E44FF] underline font-medium hover:text-[#5E34E8]"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements. We request only basic OAuth profile scopes (<code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-xs">openid</code>, <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-xs">email</code>, <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-xs">profile</code>) to authenticate your identity.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-xl font-bold text-slate-900">4. Data Storage & Infrastructure Security</h2>
            <p>
              Your data is stored securely in Google Cloud Firebase Firestore and Firebase Storage located in regional data centers. All communications between your browser, our application servers, and Firebase are encrypted using modern Transport Layer Security (TLS 1.3/HTTPS). Strict Firestore security rules prevent unauthorized third parties from writing or modifying your personal documents.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-xl font-bold text-slate-900">5. Data Retention, Export & Erasure (DPDP Act)</h2>
            <p>
              In compliance with the Indian Digital Personal Data Protection (DPDP) Act and global privacy best practices:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Data Export:</strong> You can download a complete, portable JSON archive of your career profile anytime from your Settings page.
              </li>
              <li>
                <strong>Right to Erasure:</strong> You can permanently delete your account and all associated Firestore records, published websites, and uploaded assets in one click from the Settings page. This deletion is immediate and irrevocable.
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-xl font-bold text-slate-900">6. Contact & Grievance Officer</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact our team:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1 text-slate-600 font-mono">
              <p><strong>DecsCV / DecsLab</strong></p>
              <p>Email: <a href="mailto:support@decslab.in" className="text-[#6E44FF] underline">support@decslab.in</a></p>
              <p>Website: https://cv.decslab.in</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} DecsCV. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </Link>
            <span>·</span>
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
