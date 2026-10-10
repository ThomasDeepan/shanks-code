import React from 'react';
import { Megaphone } from 'lucide-react';
import AdminPageShell from '../components/AdminPageShell';
import ResourceManager from '../components/ResourceManager';
import useAdminCollection from '../hooks/useAdminCollection';
import type { Announcement } from '../types';
import type { FieldDef, FormValues } from '../components/ResourceForm';

/**
 * AdminAnnouncementsPage — route `/admin/dashboard/announcements`
 *
 * Create, edit and publish/unpublish announcements. The collection starts empty
 * because no announcements have been published on the site yet — no sample
 * content is invented.
 */

const FIELDS: FieldDef[] = [
  { name: 'title', label: 'Title', required: true },
  { name: 'date', label: 'Publish date', required: true, half: true, helperText: 'Format YYYY-MM-DD.' },
  {
    name: 'audience',
    label: 'Audience',
    type: 'select',
    half: true,
    options: [
      { value: 'students', label: 'Students' },
      { value: 'colleges', label: 'Colleges & institutions' },
      { value: 'public', label: 'Public website' },
    ],
  },
  { name: 'body', label: 'Message', type: 'textarea', required: true, rows: 4 },
  {
    name: 'published',
    label: 'Visibility',
    type: 'select',
    half: true,
    options: [
      { value: 'false', label: 'Draft — hidden' },
      { value: 'true', label: 'Published — visible' },
    ],
  },
];

export const AdminAnnouncementsPage: React.FC = () => {
  const collection = useAdminCollection<Announcement>('announcements');

  return (
    <AdminPageShell
      title="Announcements"
      description="Publish notices for students, colleges or the public website. Drafts stay hidden until published."
    >
      <ResourceManager<Announcement>
        title="Announcements"
        description="Nothing is published until you set the announcement to Published."
        addLabel="New announcement"
        idPrefix="announcement"
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
          { label: 'Audience', value: item.audience },
          { label: 'Date', value: item.date },
        ]}
        badgeOf={(item) => ({
          label: item.published ? 'Published' : 'Draft',
          variant: item.published ? 'good' : 'default',
        })}
        toRecord={(values: FormValues) => ({
          title: values.title.trim(),
          body: values.body.trim(),
          date: values.date.trim(),
          audience: (values.audience as Announcement['audience']) || 'students',
          published: values.published === 'true',
        })}
        toFormValues={(item) => ({
          title: item.title,
          body: item.body,
          date: item.date,
          audience: item.audience,
          published: String(item.published),
        })}
        emptyTitle="No announcements yet"
        emptyDescription="Create an announcement to publish a notice. Nothing has been announced on the site so far, so this list starts empty."
        emptyIcon={Megaphone}
      />
    </AdminPageShell>
  );
};

export default AdminAnnouncementsPage;
