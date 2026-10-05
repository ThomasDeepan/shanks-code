import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';

/**
 * ContactCTASection
 * Single closing CTA. The four-audience engagement matrix from the previous
 * version was removed: it repeated information already covered by the hero,
 * services and workshops sections.
 */
export const ContactCTASection: React.FC = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-cta-heading"
      className="w-full border-t border-[#D3DAE6] bg-[#EEF1F6] py-12 md:py-16"
    >
      <PageContainer>
        <div className="reveal-on-scroll grid grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl border border-[#2F4368] bg-[#1B2A4A] p-7 shadow-elevated sm:p-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: message and actions */}
          <div className="space-y-5 lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D9A62B]/50 bg-[#FDF3D9] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#6E4F06]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D9A62B]" aria-hidden="true" />
              Get started
            </span>

            <h2
              id="contact-cta-heading"
              className="font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl"
            >
              Tell us what you need to build.
            </h2>

            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Whether you are a student looking for practical training, a college planning skill
              development or a workshop, or a company needing an engineering or R&amp;D partner — start with
              a conversation.
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-4">
              <Link to="/programs" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="border-2 border-[#D9A62B] bg-[#D9A62B] font-bold text-[#0F1930] shadow-md hover:bg-[#F5D98A]"
                  rightIcon={<ArrowRight className="h-4 w-4 text-[#0F1930]" aria-hidden="true" />}
                >
                  Explore Programs
                </Button>
              </Link>
              <Link to="/workshops" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="border-2 border-white bg-white font-semibold text-[#1B2A4A] shadow-md hover:border-[#EEF1F6] hover:bg-[#EEF1F6]"
                >
                  Request a Workshop
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="border-2 border-[#2F4368] bg-transparent font-semibold text-white shadow-xs hover:border-white hover:bg-white/5"
                >
                  Student Portal
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: contact details */}
          <div className="rounded-xl border border-[#2F4368] bg-[#0F1930] p-5 lg:col-span-5 sm:p-6">
            <h3 className="border-b border-[#2F4368] pb-3 text-sm font-bold text-white">
              Official contact
            </h3>

            <dl className="mt-4 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D9A62B]" aria-hidden="true" />
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                    Headquarters
                  </dt>
                  <dd className="mt-0.5 text-xs font-medium text-slate-200 sm:text-[13px]">
                    Villupuram, Tamil Nadu, India
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#D9A62B]" aria-hidden="true" />
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                    Email
                  </dt>
                  <dd className="mt-0.5 space-y-0.5">
                    <a
                      href="mailto:admin@shankscode.com"
                      className="block font-mono text-xs text-slate-200 transition-colors hover:text-[#D9A62B]"
                    >
                      admin@shankscode.com
                    </a>
                    <a
                      href="mailto:info@shankscode.com"
                      className="block font-mono text-xs text-slate-200 transition-colors hover:text-[#D9A62B]"
                    >
                      info@shankscode.com
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#D9A62B]" aria-hidden="true" />
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                    Telephone
                  </dt>
                  <dd className="mt-0.5">
                    <a
                      href="tel:+918754208557"
                      className="font-mono text-xs text-slate-200 transition-colors hover:text-[#D9A62B]"
                    >
                      +91 87542 08557
                    </a>
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export default ContactCTASection;