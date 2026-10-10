import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, MapPin, CheckCircle2 } from 'lucide-react';
import PageContainer from './PageContainer';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-[#1B2A4A] bg-[#0F1930] text-white">
      <PageContainer width="wide" className="py-10 lg:py-12">
        <div className="grid grid-cols-2 gap-8 border-b border-[#1B2A4A] pb-8 lg:grid-cols-12">
          {/* BRAND (4 cols) */}
          <div className="col-span-2 space-y-3.5 lg:col-span-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 rounded-lg p-0.5 text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A62B]"
              aria-label="Shank's Code Edutech Home"
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#2F4368] bg-[#1B2A4A] shadow-xs">
                <Code2 className="h-4 w-4 text-white" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="text-base font-extrabold leading-none tracking-tight text-white">
                  SHANK'S CODE
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#D9A62B]">
                  Edutech &bull; Applied R&amp;D
                </span>
              </span>
            </Link>

            <p className="max-w-sm text-xs leading-relaxed text-slate-300">
              An EdTech, technical training and applied R&amp;D organisation in Villupuram, Tamil Nadu
              &mdash; running practical programs, internships, campus workshops and industry research.
            </p>

            <div className="flex items-center gap-1.5 pt-1 text-xs font-medium text-slate-300">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#D9A62B]" aria-hidden="true" />
              <span>Villupuram, Tamil Nadu, India &bull; Founded 2023</span>
            </div>
          </div>

          {/* EXPLORE (2 cols) */}
          <div className="space-y-3 lg:col-span-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#D9A62B]">
              Explore
            </h3>
            <nav
              className="flex flex-col space-y-2 text-xs sm:text-sm"
              aria-label="Footer Explore Navigation"
            >
              <Link to="/" className="text-slate-300 transition-colors hover:text-white">
                Home
              </Link>
              <Link to="/about" className="text-slate-300 transition-colors hover:text-white">
                About
              </Link>
              <Link to="/services" className="text-slate-300 transition-colors hover:text-white">
                Services
              </Link>
              <Link to="/rnd" className="text-slate-300 transition-colors hover:text-white">
                R&amp;D Division
              </Link>
            </nav>
          </div>

          {/* LEARN (2 cols) */}
          <div className="space-y-3 lg:col-span-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#D9A62B]">
              Learn
            </h3>
            <nav
              className="flex flex-col space-y-2 text-xs sm:text-sm"
              aria-label="Footer Learn Navigation"
            >
              <Link to="/programs" className="text-slate-300 transition-colors hover:text-white">
                Programs
              </Link>
              <Link to="/workshops" className="text-slate-300 transition-colors hover:text-white">
                Workshops
              </Link>
              <Link
                to="/portal"
                className="font-semibold text-white underline decoration-[#D9A62B] transition-colors hover:text-[#F5D98A]"
              >
                Student Portal
              </Link>
            </nav>
          </div>

          {/* CONTACT (2 cols) */}
          <div className="space-y-3 lg:col-span-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#D9A62B]">
              Contact
            </h3>
            <div className="flex flex-col space-y-2 font-mono text-xs text-slate-300">
              <a
                href="mailto:admin@shankscode.com"
                className="transition-colors hover:text-[#D9A62B]"
              >
                admin@shankscode.com
              </a>
              <a href="tel:+918754208557" className="transition-colors hover:text-[#D9A62B]">
                +91 87542 08557
              </a>
              <span className="text-[#D9A62B]/90">HQ: Villupuram, TN</span>
            </div>
          </div>

          {/* RECOGNITION (2 cols) */}
          <div className="col-span-2 space-y-3 lg:col-span-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#D9A62B]">
              Recognition
            </h3>
            <div className="flex flex-col space-y-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-medium text-slate-200">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D9A62B]" aria-hidden="true" />
                AICTE Approved
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-200">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D9A62B]" aria-hidden="true" />
                MSME Recognized
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-200">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D9A62B]" aria-hidden="true" />
                EDII-TN Mailam Hub
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-200">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D9A62B]" aria-hidden="true" />
                StartupTN Supported
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Positioning Line */}
        <div className="flex flex-col items-center justify-between gap-2 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>&copy; {currentYear} Shank's Code Edutech. All rights reserved.</p>
          <p className="text-center font-medium text-slate-300 sm:text-right">
            Practical Technical Training &bull; Campus Workshops &bull; Applied R&amp;D
          </p>
        </div>
      </PageContainer>
    </footer>
  );
};

export default Footer;