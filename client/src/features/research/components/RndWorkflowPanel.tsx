import React from 'react';
import { workflowSteps } from '../data/researchData';

/**
 * RndWorkflowPanel
 * The five-stage research lifecycle (Identify → Research → Develop → Test →
 * Deploy). Shared by the homepage R&D section and the `/rnd` page.
 */
export const RndWorkflowPanel: React.FC = () => (
  <div className="reveal-on-scroll overflow-hidden rounded-xl border border-[#2F4368] bg-[#1B2A4A]">
    <div className="border-b border-[#2F4368] px-5 py-5 sm:px-7 sm:py-6">
      <h3 className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
        Five-stage R&amp;D workflow
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-[#EEF1F6]/80 sm:text-[13px]">
        A repeatable path from hypothesis to patentable, deployable work.
      </p>
    </div>

    <ol className="grid grid-cols-1 gap-px bg-[#2F4368] sm:grid-cols-2 lg:grid-cols-5">
      {workflowSteps.map((item) => (
        <li key={item.step} className="bg-[#1B2A4A] px-5 py-4 sm:px-6 sm:py-5">
          <span className="font-mono text-[11px] font-bold tracking-wider text-[#F5D98A]">
            {item.step}
          </span>
          <h4 className="mt-1 text-sm font-bold uppercase tracking-wide text-white">{item.title}</h4>
          <p className="mt-1.5 text-xs leading-relaxed text-[#EEF1F6]/80">{item.detail}</p>
        </li>
      ))}
    </ol>
  </div>
);

export default RndWorkflowPanel;
