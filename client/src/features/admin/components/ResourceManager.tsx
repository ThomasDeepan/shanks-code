import React, { useState } from 'react';
import { Pencil, Plus, Trash2, RotateCcw, type LucideIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import LoadingState from '@/components/common/LoadingState';
import Badge, { type BadgeVariant } from '@/components/ui/Badge';
import ResourceForm, { type FieldDef, type FormValues } from './ResourceForm';
import ConfirmDialog from './ConfirmDialog';

/**
 * ResourceManager
 * Reusable admin CRUD surface: list, create, edit and delete a collection of
 * records through a declarative field schema.
 *
 * Safety rules enforced here:
 *   - Create and edit are validated before being submitted.
 *   - Delete ALWAYS goes through `ConfirmDialog`, which names the record.
 *   - A failed write surfaces an explicit error and leaves the form open so the
 *     entry is not lost (no silent fallback).
 */

export interface ResourceSummary {
  label: string;
  value: string;
}

export interface ResourceManagerProps<T extends { id: string }> {
  title: string;
  description: string;
  addLabel: string;
  /** Prefix used when generating ids for new records. */
  idPrefix: string;
  fields: FieldDef[];
  items: T[];
  isLoading: boolean;
  error: string | null;
  onReload: () => void;
  /** Primary display value for a record. */
  titleOf: (item: T) => string;
  /** Optional metadata line under the title. */
  summaryOf?: (item: T) => ResourceSummary[];
  badgeOf?: (item: T) => { label: string; variant: BadgeVariant };
  /** Values → record (excluding generated id). */
  toRecord: (values: FormValues, existingId?: string) => Omit<T, 'id'> & { id?: string };
  /** Record → form values. */
  toFormValues: (item: T) => FormValues;
  onCreate: (item: T) => Promise<void>;
  onUpdate: (id: string, item: T) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  /** Restores the original seeded content (development convenience). */
  onRestoreSeed?: () => void;
  emptyTitle: string;
  emptyDescription: string;
  emptyIcon?: LucideIcon;}

export function ResourceManager<T extends { id: string }>({
  title,
  description,
  addLabel,
  idPrefix,
  fields,
  items,
  isLoading,
  error,
  onReload,
  titleOf,
  summaryOf,
  badgeOf,
  toRecord,
  toFormValues,
  onCreate,
  onUpdate,
  onDelete,
  onRestoreSeed,
  emptyTitle,
  emptyDescription,
  emptyIcon,
}: ResourceManagerProps<T>) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [values, setValues] = useState<FormValues>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const resetForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setValues({});
    setFormErrors({});
    setFormError(null);
  };

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => (prev[name] ? { ...prev, [name]: '' } : prev));
  };

  const openCreate = () => {
    setEditingId(null);
    setValues({});
    setFormErrors({});
    setFormError(null);
    setIsFormOpen(true);
  };

  const openEdit = (item: T) => {
    setEditingId(item.id);
    setValues(toFormValues(item));
    setFormErrors({});
    setFormError(null);
    setIsFormOpen(true);
  };

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const raw = (values[field.name] ?? '').trim();

      if (field.required && !raw) {
        nextErrors[field.name] = `${field.label} is required.`;
      } else if (field.type === 'tags' && raw && raw.split(',').filter(Boolean).length === 0) {
        nextErrors[field.name] = `${field.label} must contain at least one entry.`;
      }
    });

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);

    if (!validate()) return;

    setIsSaving(true);
    try {
      const base = toRecord(values, editingId ?? undefined);
      const record = { ...base, id: editingId ?? base.id ?? `${idPrefix}-${Date.now()}` } as T;

      if (editingId) {
        await onUpdate(editingId, record);
      } else {
        await onCreate(record);
      }

      resetForm();
    } catch (err: unknown) {
      setFormError(
        err instanceof Error ? err.message : 'The record could not be saved. Please try again.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;

    setIsDeleting(true);
    try {
      await onDelete(pendingDeleteId);
      setPendingDeleteId(null);
    } catch (err: unknown) {
      setFormError(
        err instanceof Error ? err.message : 'The record could not be deleted. Please try again.'
      );
      setPendingDeleteId(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const pendingDeleteItem = items.find((item) => item.id === pendingDeleteId);

  return (
    <div className="space-y-5">
      {/* Header + actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl space-y-1.5">
          <h2 className="font-display text-lg font-bold tracking-tight text-[#1B2A4A] sm:text-xl">
            {title}
          </h2>
          <p className="text-sm leading-relaxed text-[#5F5A50]">{description}</p>
        </div>

        <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
          {onRestoreSeed && (
            <Button
              variant="ghost"
              size="md"
              onClick={onRestoreSeed}
              leftIcon={<RotateCcw className="h-4 w-4" aria-hidden="true" />}
            >
              Restore original
            </Button>
          )}
          <Button
            variant="primary"
            size="md"
            onClick={openCreate}
            leftIcon={<Plus className="h-4 w-4 text-white" aria-hidden="true" />}
          >
            {addLabel}
          </Button>
        </div>
      </div>

      {/* Form (create / edit) */}
      {isFormOpen && (
        <ResourceForm
          fields={fields}
          values={values}
          errors={formErrors}
          mode={editingId ? 'edit' : 'create'}
          isSaving={isSaving}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      )}

      {formError && (
        <p role="alert" className="rounded-lg border border-[#F0C9B4] bg-[#FBEAE3] p-3.5 text-sm text-[#B4552C]">
          {formError}
        </p>
      )}

      {/* List states */}
      {isLoading && <LoadingState message={`Loading ${title.toLowerCase()}...`} minHeight="min-h-[200px]" />}

      {!isLoading && error && (
        <ErrorState title="Failed to load records" message={error} onRetry={onReload} />
      )}

      {!isLoading && !error && items.length === 0 && (
        <EmptyState
          icon={emptyIcon ?? Plus}
          title={emptyTitle}
          description={emptyDescription}
          actionText={addLabel}
          onAction={openCreate}
        />
      )}

      {!isLoading && !error && items.length > 0 && (
        <ul className="space-y-3">
          {items.map((item) => {
            const badge = badgeOf?.(item);
            const summary = summaryOf?.(item) ?? [];

            return (
              <li
                key={item.id}
                className="flex flex-col gap-3 rounded-xl border border-[#D3DAE6] bg-white p-4 shadow-2xs sm:flex-row sm:items-start sm:justify-between sm:gap-5 sm:p-5"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[15px] font-bold leading-snug tracking-tight text-[#1B2A4A]">
                      {titleOf(item)}
                    </h3>
                    {badge && (
                      <Badge variant={badge.variant} size="sm">
                        {badge.label}
                      </Badge>
                    )}
                  </div>

                  {summary.length > 0 && (
                    <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                      {summary.map((entry) => (
                        <div key={entry.label} className="flex items-center gap-1.5">
                          <dt className="font-mono text-[10px] uppercase tracking-wider text-[#5C6F97]">
                            {entry.label}
                          </dt>
                          <dd className="text-xs font-medium text-[#2E2A24]">{entry.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(item)}
                    leftIcon={<Pencil className="h-3.5 w-3.5" aria-hidden="true" />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setPendingDeleteId(item.id)}
                    leftIcon={<Trash2 className="h-3.5 w-3.5" aria-hidden="true" />}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <ConfirmDialog
        open={pendingDeleteId !== null}
        title="Delete this record?"
        message="This removes the record permanently. It will no longer appear on the public website."
        subject={pendingDeleteItem ? titleOf(pendingDeleteItem) : undefined}
        isWorking={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}

export default ResourceManager;
