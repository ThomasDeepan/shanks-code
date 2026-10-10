import React from 'react';
import AdminPageShell from '../components/AdminPageShell';
import ResourceManager from '../components/ResourceManager';
import useAdminCollection from '../hooks/useAdminCollection';
import type { ProgramItem } from '@/features/programs/components/ProgramCard';
import type { FieldDef, FormValues } from '../components/ResourceForm';

/**
 * AdminProgramsPage — route `/admin/dashboard/programs`
 *
 * Manages the program catalog that `/programs` renders: add a program, edit its
 * description, duration, level and skills, or retire one. The public catalog and
 * its filters read these same records.
 */

const CATEGORY_OPTIONS = [
  { value: 'Full Stack & Software', label: 'Full Stack & Software' },
  { value: 'IoT & Embedded Systems', label: 'IoT & Embedded Systems' },
  { value: 'AI & Data Science', label: 'AI & Data Science' },
];

const FIELDS: FieldDef[] = [
  { name: 'title', label: 'Program title', required: true, placeholder: 'e.g., Full-Stack Software Engineering' },
  { name: 'category', label: 'Category', type: 'select', options: CATEGORY_OPTIONS, required: true, half: true },
  { name: 'level', label: 'Level', required: true, half: true, placeholder: 'e.g., Intermediate' },
  {
    name: 'duration',
    label: 'Duration',
    required: true,
    half: true,
    helperText: 'Shown on the public program card, e.g. "Estimated 24 Weeks".',
  },
  {
    name: 'eligibility',
    label: 'Eligibility',
    half: true,
    helperText: 'Optional entry requirement shown to prospective students.',
  },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  {
    name: 'skills',
    label: 'Core technologies',
    type: 'tags',
    required: true,
    helperText: 'Comma separated, e.g. "TypeScript, React, Node.js".',
  },
  { name: 'status', label: 'Status', type: 'select', half: true, options: [
    { value: 'active', label: 'Active — listed publicly' },
    { value: 'upcoming', label: 'Upcoming — not yet open' },
    { value: 'archived', label: 'Archived — hidden from the catalog' },
  ] },
];

interface ManagedProgram extends ProgramItem {
  eligibility?: string;
  status?: string;
}

export const AdminProgramsPage: React.FC = () => {
  const collection = useAdminCollection<ManagedProgram>('programs');

  return (
    <AdminPageShell
      title="Programs"
      description="Add, update or retire entries in the public program catalog. Changes are reflected on the Programs page and its filters."
    >
      <ResourceManager<ManagedProgram>
        title="Program catalog"
        description="Every program listed on /programs, with its duration, level and core technologies."
        addLabel="Add program"
        idPrefix="program"
        fields={FIELDS}
        items={collection.items}
        isLoading={collection.isLoading}
        error={collection.error}
        onReload={collection.reload}
        onCreate={collection.create}
        onUpdate={collection.update}
        onDelete={collection.remove}
        onRestoreSeed={collection.restoreSeed}
        titleOf={(item) => item.title}
        summaryOf={(item) => [
          { label: 'Category', value: item.category },
          { label: 'Duration', value: item.duration },
          { label: 'Level', value: item.level },
          ...(item.eligibility ? [{ label: 'Eligibility', value: item.eligibility }] : []),
        ]}
        badgeOf={(item) => ({
          label: item.status ?? 'active',
          variant: item.status === 'archived' ? 'default' : item.status === 'upcoming' ? 'warning' : 'good',
        })}
        toRecord={(values: FormValues) => ({
          title: values.title.trim(),
          category: values.category,
          level: values.level.trim(),
          duration: values.duration.trim(),
          eligibility: values.eligibility?.trim() || undefined,
          description: values.description.trim(),
          skills: values.skills
            .split(',')
            .map((skill) => skill.trim())
            .filter(Boolean),
          status: values.status || 'active',
        })}
        toFormValues={(item) => ({
          title: item.title,
          category: item.category,
          level: item.level,
          duration: item.duration,
          eligibility: item.eligibility ?? '',
          description: item.description,
          skills: item.skills.join(', '),
          status: item.status ?? 'active',
        })}
        emptyTitle="No programs in the catalog"
        emptyDescription="Add a program so it appears in the public catalog with its duration, level and technologies."
      />
    </AdminPageShell>
  );
};

export default AdminProgramsPage;
