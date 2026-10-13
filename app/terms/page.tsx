import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft, CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Terms of Service — DecsCV",
  description: "Terms and conditions governing your use of DecsCV career platform.",
};

export default function TermsPage() {
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
            <FileText size={16} weight="bold" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500 font-normal">
            Last updated: October 13, 2026 · Effective for all users of cv.decslab.in
          </p>
        </div>

        {/* Quick Summary Card */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card flex flex-col gap-3">
          <h3 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle size={18} className="text-[#10B981]" weight="bold" />
            <span>Summary in Plain English</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            You own 100% of your career content, code projects, and credentials. DecsCV provides the software engine to render them into beautiful portfolios and resumes. Do not use DecsCV for phishing, harassment, or impersonation. You may delete your account and profile anytime.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="flex flex-col gap-8 text-sm text-slate-700 leading-relaxed font-normal">
          <section className="flex flex-col gap-3">
            <h2 className="font-display text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing or using DecsCV (&ldquo;the Service&rdquo;), accessible at cv.decslab.in, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-xl font-bold text-slate-900">2. User Accounts & Google Authentication</h2>
            <p>
              To create and publish your career profile, you may sign in through Google OAuth. You agree that the information you provide is accurate and truthful. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-xl font-bold text-slate-900">3. Acceptable Use Policy</h2>
            <p>You agree not to use DecsCV to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>Upload malicious code, phishing portals, trojans, or unauthorized scripts.</li>
              <li>Impersonate any person, student, professional, corporation, or public official.</li>
              <li>Squat on usernames or brand trademarks with intent to resell or mislead.</li>
              <li>Publish defamatory, abusive, obscene, or unlawful material.</li>
              <li>Attempt to disrupt, exploit, or probe the infrastructure or Firestore security boundaries.</li>
            </ul>
            <p className="text-xs text-slate-500 mt-1">
              Violations of this policy will result in immediate profile suspension and termination of access.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-xl font-bold text-slate-900">4. User Content & Intellectual Property</h2>
            <p>
              <strong>You retain 100% ownership</strong> of all resumes, work history, projects, descriptions, images, and links you publish through DecsCV. By creating a public profile, you grant DecsCV a worldwide, royalty-free, non-exclusive license solely to host, display, and format your content in accordance with your chosen portfolio and resume settings.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-xl font-bold text-slate-900">5. Public Profile Links & Visibility</h2>
            <p>
              When your profile visibility is set to &ldquo;Public&rdquo;, anyone with your link (<code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-xs">cv.decslab.in/{'{username}'}</code>) can view your selected portfolio style and resume. You may toggle your visibility to &ldquo;Draft&rdquo; or delete your public profile at any time in the builder or Settings page.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-xl font-bold text-slate-900">6. Service Availability & Disclaimers</h2>
            <p>
              DecsCV is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. While we strive for 99.9% uptime, we do not warrant that the service will be uninterrupted, error-free, or entirely secure from unforeseen third-party disruptions.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-xl font-bold text-slate-900">7. Account Termination & Deletion</h2>
            <p>
              You may terminate your account at any time by navigating to Settings and selecting &ldquo;Delete Account&rdquo;. All your Firestore profile records, uploaded assets, and published URLs will be permanently deleted immediately. We reserve the right to suspend or remove profiles that violate these terms.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-xl font-bold text-slate-900">8. Governing Law & Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any legal disputes shall be subject to the exclusive jurisdiction of the competent courts in Odisha, India.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-display text-xl font-bold text-slate-900">9. Contact Us</h2>
            <p>For inquiries regarding these Terms of Service, please reach out to:</p>
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
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">
              Privacy Policy
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
