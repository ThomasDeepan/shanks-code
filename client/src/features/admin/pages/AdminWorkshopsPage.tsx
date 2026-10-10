import React from 'react';
import { Wrench } from 'lucide-react';
import AdminPageShell from '../components/AdminPageShell';
import ResourceManager from '../components/ResourceManager';
import useAdminCollection from '../hooks/useAdminCollection';
import type { Workshop } from '@/features/workshops/types';
import type { FieldDef, FormValues } from '../components/ResourceForm';

/**
 * AdminWorkshopsPage — route `/admin/dashboard/workshops`
 *
 * Manages the workshop records rendered by `/workshops` and the homepage
 * preview: institution, location, audience, summary, focus tags, date, status
 * and an optional image.
 *
 * "Restore original" returns the collection to the verified seed content
 * (UCEV Villupuram, polytechnic Vellore, MAM and Saveetha Engineering College).
 */

const AUDIENCE_OPTIONS = [
  { value: 'Engineering Colleges', label: 'Engineering Colleges' },
  { value: 'Polytechnic Colleges', label: 'Polytechnic Colleges' },
  { value: 'Academic Institutions', label: 'Academic Institutions' },
  { value: 'Students', label: 'Students' },
  { value: 'Technical Communities', label: 'Technical Communities' },
];

const FIELDS: FieldDef[] = [
  { name: 'title', label: 'Workshop title', required: true, placeholder: 'e.g., Sponsored Technical Workshop' },
  { name: 'institution', label: 'Institution', required: true, half: true, placeholder: 'e.g., MAM Engineering College' },
  { name: 'location', label: 'Location', required: true, half: true, placeholder: 'e.g., Villupuram, Tamil Nadu' },
  { name: 'code', label: 'Reference code', half: true, placeholder: 'e.g., WS-05' },
  { name: 'audience', label: 'Audience', type: 'select', options: AUDIENCE_OPTIONS, required: true, half: true },
  { name: 'date', label: 'Date', half: true, helperText: 'Optional, format YYYY-MM-DD.' },
  { name: 'status', label: 'Status', type: 'select', half: true, options: [
    { value: 'completed', label: 'Completed' },
    { value: 'scheduled', label: 'Scheduled' },
  ] },
  { name: 'summary', label: 'Summary', type: 'textarea', required: true },
  {
    name: 'focus',
    label: 'Focus areas',
    type: 'tags',
    required: true,
    helperText: 'Comma separated, e.g. "Embedded Systems, Live Demos".',
  },
  {
    name: 'image',
    label: 'Image path',
    half: true,
    helperText: 'Optional. Leave empty to use the typographic card header.',
  },
  { name: 'imageAlt', label: 'Image alt text', half: true, helperText: 'Describe the photograph for accessibility.' },
];

export const AdminWorkshopsPage: React.FC = () => {
  const collection = useAdminCollection<Workshop>('workshops');

  return (
    <AdminPageShell
      title="Workshops"
      description="Manage the technical workshop sessions shown on /workshops and the homepage preview."
    >
      <ResourceManager<Workshop>
        title="Workshop sessions"
        description="Institution, location, audience and summary for every workshop Shank's Code has run."
        addLabel="Add workshop"
        idPrefix="ws"
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
          { label: 'Institution', value: item.institution },
          { label: 'Location', value: item.location },
          { label: 'Audience', value: item.audience },
          ...(item.date ? [{ label: 'Date', value: item.date }] : []),
        ]}
        badgeOf={(item) => ({
          label: item.status,
          variant: item.status === 'scheduled' ? 'warning' : 'good',
        })}
        toRecord={(values: FormValues) => ({
          code: values.code?.trim() || 'WS',
          title: values.title.trim(),
          institution: values.institution.trim(),
          location: values.location.trim(),
          audience: values.audience as Workshop['audience'],
          summary: values.summary.trim(),
          focus: values.focus
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean),
          status: (values.status as Workshop['status']) || 'completed',
          date: values.date?.trim() || undefined,
          image: values.image?.trim() || undefined,
          imageAlt: values.imageAlt?.trim() || undefined,
        })}
        toFormValues={(item) => ({
          title: item.title,
          code: item.code,
          institution: item.institution,
          location: item.location,
          audience: item.audience,
          date: item.date ?? '',
          status: item.status,
          summary: item.summary,
          focus: item.focus.join(', '),
          image: item.image ?? '',
          imageAlt: item.imageAlt ?? '',
        })}
        emptyTitle="No workshops published"
        emptyDescription="Add a workshop session so it appears on the public Workshops page."
        emptyIcon={Wrench}
      />
    </AdminPageShell>
  );
};

export default AdminWorkshopsPage;
