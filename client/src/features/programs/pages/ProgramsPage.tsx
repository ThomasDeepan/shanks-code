import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { SearchX, RotateCcw, Info, SlidersHorizontal } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import ProgramSearch from '../components/ProgramSearch';
import ProgramFilters from '../components/ProgramFilters';
import ProgramCard, { ProgramItem } from '../components/ProgramCard';
import AppliedProgramsTracks from '../components/AppliedProgramsTracks';
import ProgramsPhilosophy from '../components/ProgramsPhilosophy';
import ProgramOutcomesSection from '../components/ProgramOutcomesSection';
import programService from '../services/programService';
import { ApiError } from '@/services/api/errors';

// Official Technology Areas aligned with Task 13.6 specification
const CATEGORIES = ['All', 'Full Stack & Software', 'IoT & Embedded Systems', 'AI & Data Science'];

export const ProgramsPage: React.FC = () => {
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeNotice, setActiveNotice] = useState<string | null>(null);

  const fetchPrograms = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await programService.getPrograms();
      setPrograms(data);
    } catch (err: unknown) {
      const message =
        err instanceof ApiError
          ? err.userMessage
          : 'Unable to retrieve technical programs catalog. Please check your connection and retry.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  // Combined client-side search & category filtering
  const filteredPrograms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return programs.filter((program) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'All' || program.category === selectedCategory;

      if (!matchesCategory) {
        return false;
      }

      // Keyword match across title, description, category, and skills
      if (!query) {
        return true;
      }

      const matchesTitle = program.title.toLowerCase().includes(query);
      const matchesDescription = program.description.toLowerCase().includes(query);
      const matchesCategoryText = program.category.toLowerCase().includes(query);
      const matchesSkills = program.skills.some((skill) =>
        skill.toLowerCase().includes(query)
      );

      return matchesTitle || matchesDescription || matchesCategoryText || matchesSkills;
    });
  }, [programs, searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  const handleProgramPreviewClick = (program: ProgramItem) => {
    setActiveNotice(
      `"${program.title}" curriculum overview. Official course enrollment and syllabus schedules are published per training batch.`
    );
  };

  return (
    <div className="w-full pt-8 sm:pt-10 md:pt-12 pb-16 md:pb-20 bg-[#FAFAF9] min-h-[calc(100vh-16rem)]">
      <PageContainer>
        {/* Page Header: Strong Editorial Introduction */}
        <div className="max-w-3xl mb-8 sm:mb-10 reveal-on-scroll">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#5C6F97] font-bold mb-2.5">
            APPLIED TECHNOLOGY PROGRAMS
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B2A4A] tracking-tight leading-[1.12]">
            Technology learning built around real-world practice.
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-[#5F5A50] leading-relaxed">
            Applied engineering curriculum structured around real-world execution, verified builds, and functional prototypes across our official technology domains.
          </p>
        </div>

        {/* Informational Notification Banner (Non-breaking interaction) */}
        {activeNotice && (
          <div
            role="status"
            className="mb-8 p-4 rounded-xl bg-[#EEF1F6] border border-[#D3DAE6] text-sm text-[#1B2A4A] flex items-start justify-between gap-3 shadow-xs"
          >
            <div className="flex items-start gap-2.5">
              <Info className="w-5 h-5 text-[#D9A62B] shrink-0 mt-0.5" aria-hidden="true" />
              <span className="leading-relaxed">{activeNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveNotice(null)}
              className="text-xs font-semibold text-[#1B2A4A] hover:text-[#2F4368] underline shrink-0 mt-0.5 px-1 py-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Educational philosophy — relocated here from the homepage */}
        <ProgramsPhilosophy className="mt-10" />

        {/* Two Distinct Structural Color Worlds: Software & Data Systems + Hardware, Robotics & AI */}
        <AppliedProgramsTracks showIntroHeading={false} className="mt-14" />

        {/* Catalog Search & Filter Section Header */}
        <div className="pt-10 border-t border-[#D3DAE6] mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <SlidersHorizontal className="w-4 h-4 text-[#1B2A4A]" aria-hidden="true" />
            <h2 className="text-lg sm:text-xl font-bold text-[#1B2A4A] tracking-tight">
              Curriculum Discovery &amp; Search Catalog
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5C6F97]">
            Filter and preview comprehensive syllabi structures across official training batches.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <LoadingState message="Loading technical curriculum tracks..." minHeight="min-h-[300px]" />
        )}

        {/* Error State */}
        {!isLoading && error && (
          <ErrorState
            title="Failed to Load Curriculum"
            message={error}
            onRetry={fetchPrograms}
            className="my-8"
          />
        )}

        {/* Content: Search & Filters + Cards */}
        {!isLoading && !error && (
          <>
            {/* Search & Filter Toolbar — Polished Control Surface */}
            <div className="bg-white rounded-xl border border-[#D3DAE6] shadow-xs p-5 sm:p-6 mb-8 space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                {/* Search Input */}
                <div className="lg:col-span-5">
                  <ProgramSearch value={searchQuery} onChange={setSearchQuery} />
                </div>

                {/* Category Filter Pills */}
                <div className="lg:col-span-7 flex justify-start lg:justify-end">
                  <ProgramFilters
                    categories={CATEGORIES}
                    activeCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                  />
                </div>
              </div>

              {/* Results Summary & Clear Trigger */}
              <div className="pt-3.5 border-t border-[#E8E6E1] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm text-[#5F5A50]">
                <span>
                  Showing <strong className="text-[#1B2A4A] font-semibold">{filteredPrograms.length}</strong>{' '}
                  {filteredPrograms.length === 1 ? 'preview track' : 'preview tracks'}
                  {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
                  {searchQuery.trim() && ` matching "${searchQuery.trim()}"`}
                </span>

                {(searchQuery.trim() || selectedCategory !== 'All') && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-[#1B2A4A] hover:text-[#2F4368] font-medium inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] rounded px-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Reset Filters</span>
                  </button>
                )}
              </div>
            </div>

            {/* Content: Program Cards Grid OR Empty State */}
            {filteredPrograms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {filteredPrograms.map((program) => (
                  <ProgramCard
                    key={program.id}
                    program={program}
                    onPreviewClick={handleProgramPreviewClick}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-[#D3DAE6] shadow-xs p-10 sm:p-12 text-center max-w-md mx-auto">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#EEF1F6] text-[#1B2A4A] border border-[#D3DAE6] mb-4">
                  <SearchX className="w-6 h-6" aria-hidden="true" />
                </div>
                <h2 className="text-lg font-bold text-[#1B2A4A] mb-1.5">
                  No sample programs found
                </h2>
                <p className="text-sm text-[#5F5A50] mb-6 leading-relaxed">
                  No programs match your search criteria. Try modifying your keyword or reset the category
                  filter.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetFilters}
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </>
        )}
      </PageContainer>

      {/* Audited cohort outcomes — relocated here from the homepage */}
      <ProgramOutcomesSection />
    </div>
  );
};

export default ProgramsPage;
