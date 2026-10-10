import React from 'react';
import { FlaskConical } from 'lucide-react';
import AdminPageShell from '../components/AdminPageShell';
import ResourceManager from '../components/ResourceManager';
import useAdminCollection from '../hooks/useAdminCollection';
import type { RndProject } from '../types';
import type { FieldDef, FormValues } from '../components/ResourceForm';

/**
 * AdminResearchPage — route `/admin/dashboard/research`
 *
 * Maintains applied R&D project records: title, research area, summary, current
 * stage and any publication or patent reference.
 *
 * The collection starts empty — the public `/rnd` page documents the division's
 * focus areas and workflow, and no individual project records are published yet.
 */

const STAGE_OPTIONS = [
  { value: 'scoping', label: 'Scoping' },
  { value: 'research', label: 'Research' },
  { value: 'development', label: 'Development' },
  { value: 'validation', label: 'Validation' },
  { value: 'deployed', label: 'Deployed' },
];

const FIELDS: FieldDef[] = [
  { name: 'title', label: 'Project title', required: true },
  {
    name: 'area',
    label: 'Research area',
    required: true,
    half: true,
    helperText: 'e.g., AI & Machine Learning, Embedded Systems & Robotics.',
  },
  {
    name: 'stage',
    label: 'Stage',
    type: 'select',
    options: STAGE_OPTIONS,
    required: true,
    half: true,
  },
  { name: 'summary', label: 'Summary', type: 'textarea', required: true },
  {
    name: 'reference',
    label: 'Publication / patent reference',
    helperText: 'Optional. Only add a reference that actually exists.',
  },
];

export const AdminResearchPage: React.FC = () => {
  const collection = useAdminCollection<RndProject>('rndProjects');

  return (
    <AdminPageShell
      title="R&D Projects"
      description="Maintain the applied research projects behind the /rnd page, including their current stage in the five-stage workflow."
    >
      <ResourceManager<RndProject>
        title="Research projects"
        description="Project records are shown on the R&D page once entered. Nothing is generated automatically."
        addLabel="Add project"
        idPrefix="rnd"
        fields={FIELDS}
        items={collection.items}
        isLoading={collection.isLoading}
        error={collection.error}
        onReload={collection.reload}
        onCreate={collection.create}
        onUpdate={collection.update}
        onDelete={collection.remove}
        titleOf={(item) => item.title}
        summaryOf={(item) => [
          { label: 'Area', value: item.area },
          ...(item.reference ? [{ label: 'Reference', value: item.reference }] : []),
        ]}
        badgeOf={(item) => ({
          label: item.stage,
          variant: item.stage === 'deployed' ? 'good' : 'info',
        })}
        toRecord={(values: FormValues) => ({
          title: values.title.trim(),
          area: values.area.trim(),
          summary: values.summary.trim(),
          stage: (values.stage as RndProject['stage']) || 'scoping',
          reference: values.reference?.trim() || undefined,
        })}
        toFormValues={(item) => ({
          title: item.title,
          area: item.area,
          summary: item.summary,
          stage: item.stage,
          reference: item.reference ?? '',
        })}
        emptyTitle="No R&D project records"
        emptyDescription="Add a project to record its area, current stage and any real publication or patent reference."
        emptyIcon={FlaskConical}
      />
    </AdminPageShell>
  );
};

export default AdminResearchPage;
