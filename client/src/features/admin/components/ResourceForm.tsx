import React from 'react';
import { Save, X } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

/**
 * ResourceForm
 * Field-driven create/edit form used by the admin resource manager.
 *
 * Keeping the schema declarative lets Programs, Workshops, Announcements and
 * R&D projects share one implementation instead of four near-identical forms.
 */

export type FieldType = 'text' | 'textarea' | 'select' | 'tags';

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldDef {
  name: string;
  label: string;
  type?: FieldType;
  options?: FieldOption[];
  required?: boolean;
  helperText?: string;
  placeholder?: string;
  rows?: number;
  /** Half-width on desktop (paired fields sit side by side). */
  half?: boolean;
}

export type FormValues = Record<string, string>;

export interface ResourceFormProps {
  fields: FieldDef[];
  values: FormValues;
  errors: Record<string, string>;
  mode: 'create' | 'edit';
  isSaving: boolean;
  onChange: (name: string, value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  onCancel: () => void;
}

export const ResourceForm: React.FC<ResourceFormProps> = ({
  fields,
  values,
  errors,
  mode,
  isSaving,
  onChange,
  onSubmit,
  onCancel,
}) => (
  <form
    onSubmit={onSubmit}
    noValidate
    className="rounded-xl border border-[#D3DAE6] bg-white p-5 shadow-xs sm:p-6"
  >
    <div className="mb-5 flex items-center justify-between gap-3 border-b border-[#E8E6E1] pb-4">
      <h2 className="font-display text-base font-bold tracking-tight text-[#1B2A4A]">
        {mode === 'create' ? 'Add record' : 'Edit record'}
      </h2>
      <button
        type="button"
        onClick={onCancel}
        className="rounded-md p-1 text-[#5C6F97] transition-colors hover:bg-[#EEF1F6] hover:text-[#1B2A4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]"
        aria-label="Close form"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {fields.map((field) => {
        const fieldId = `admin-field-${field.name}`;
        const isHalf = Boolean(field.half);

        if (field.type === 'textarea') {
          return (
            <div key={field.name} className={isHalf ? 'sm:col-span-1' : 'sm:col-span-2'}>
              <label
                htmlFor={fieldId}
                className="mb-1.5 block text-sm font-medium text-[#1A1F2B]"
              >
                {field.label}
                {field.required && (
                  <span className="ml-1 text-[#B4552C]" aria-hidden="true">
                    *
                  </span>
                )}
              </label>
              <textarea
                id={fieldId}
                rows={field.rows ?? 3}
                required={field.required}
                value={values[field.name] ?? ''}
                placeholder={field.placeholder}
                aria-invalid={Boolean(errors[field.name])}
                onChange={(e) => onChange(field.name, e.target.value)}
                className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#1A1F2B] placeholder:text-[#5B6472]/60 focus:outline-none focus:ring-2 ${
                  errors[field.name]
                    ? 'border-[#F0C9B4] focus:border-[#B4552C] focus:ring-[#B4552C]/20'
                    : 'border-slate-300 focus:border-[#1B2A4A] focus:ring-[#1B2A4A]/20'
                }`}
              />
              {errors[field.name] ? (
                <p role="alert" className="mt-1.5 text-xs font-medium text-[#B4552C]">
                  {errors[field.name]}
                </p>
              ) : (
                field.helperText && (
                  <p className="mt-1.5 text-xs text-[#5B6472]">{field.helperText}</p>
                )
              )}
            </div>
          );
        }

        if (field.type === 'select') {
          return (
            <div key={field.name} className={isHalf ? 'sm:col-span-1' : 'sm:col-span-2'}>
              <label
                htmlFor={fieldId}
                className="mb-1.5 block text-sm font-medium text-[#1A1F2B]"
              >
                {field.label}
                {field.required && (
                  <span className="ml-1 text-[#B4552C]" aria-hidden="true">
                    *
                  </span>
                )}
              </label>
              <select
                id={fieldId}
                required={field.required}
                value={values[field.name] ?? ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-[#1A1F2B] focus:border-[#1B2A4A] focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/20"
              >
                {(field.options ?? []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {field.helperText && (
                <p className="mt-1.5 text-xs text-[#5B6472]">{field.helperText}</p>
              )}
            </div>
          );
        }

        return (
          <Input
            key={field.name}
            containerClassName={isHalf ? 'sm:col-span-1' : 'sm:col-span-2'}
            label={field.label}
            id={fieldId}
            required={field.required}
            helperText={field.helperText}
            error={errors[field.name]}
            placeholder={field.placeholder}
            value={values[field.name] ?? ''}
            disabled={isSaving}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
        );
      })}
    </div>

    <div className="mt-6 flex flex-col gap-2.5 border-t border-[#E8E6E1] pt-5 sm:flex-row sm:justify-end">
      <Button variant="outline" size="md" onClick={onCancel} disabled={isSaving}>
        Cancel
      </Button>
      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={isSaving}
        leftIcon={<Save className="h-4 w-4" aria-hidden="true" />}
      >
        {mode === 'create' ? 'Create record' : 'Save changes'}
      </Button>
    </div>
  </form>
);

export default ResourceForm;
