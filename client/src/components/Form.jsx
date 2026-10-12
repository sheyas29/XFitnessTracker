import { useEffect, useState } from 'react';
import * as z from 'zod';

const schema = z.object({
  date: z.string().min(1, 'Date is required'),
  caloriesIntake: z.coerce.number().min(0, 'Cannot be negative'),
  caloriesBurned: z.coerce.number().min(0, 'Cannot be negative'),
  description: z.string().max(200, 'Max 200 characters'),
});

const inputBase =
  'w-full rounded-xl border bg-[#0E1318] px-4 py-3 text-[15px] font-medium text-[#F2F5F9] placeholder:text-[#6B7788] outline-none transition-colors [color-scheme:dark]';

function Field({ id, label, error, accent = '#4ADE9C', children }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-sm font-bold text-[#C5CEDA]"
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: accent }}
          aria-hidden="true"
        />
        {label}
      </label>
      {children}
      <p
        id={`${id}-error`}
        className="min-h-[1.25rem] text-[13px] font-semibold text-[#FF8A8A]"
      >
        {error?.[0]}
      </p>
    </div>
  );
}

// initialValues: the entry being edited ({} when adding)
function Form({ isOpen, setIsOpen, onSubmit, addMode, initialValues = {} }) {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, setIsOpen]);

  // start every open with a clean slate (no leftover errors)
  useEffect(() => {
    if (isOpen) setErrors({});
  }, [isOpen]);

  if (!isOpen) return null;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) setIsOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.target));

    const result = schema.safeParse(raw);

    if (!result.success) {
      setErrors(z.flattenError(result.error).fieldErrors);
      return;
    }

    setErrors({});
    onSubmit(result.data);
    setIsOpen(false);
  }

  const ring = (err, focus) =>
    `${inputBase} ${err ? 'border-[#FF8A8A]' : 'border-[#263243]'} ${focus}`;

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-data-title"
        className="w-full max-w-md rounded-[26px] border border-[#263243] bg-[#171E27] p-7 text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              id="add-data-title"
              className="text-2xl font-extrabold tracking-tight"
            >
              {addMode ? 'Add data' : 'Edit data'}
            </h2>
            <p className="mt-1 text-sm font-medium text-[#9AA7B8]">
              {addMode
                ? 'Log what you ate and burned today.'
                : 'Update the details of this entry.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2E3B4D] bg-[#1F2833] text-[#C5CEDA] transition-colors hover:bg-[#283443] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ADE9C]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <Field id="date" label="Date" error={errors.date}>
          <input
            id="date"
            type="date"
            name="date"
            defaultValue={initialValues.date}
            aria-invalid={!!errors.date}
            aria-describedby="date-error"
            className={ring(errors.date, 'focus:border-[#4ADE9C]')}
          />
        </Field>

        <div className="grid gap-x-4 sm:grid-cols-2">
          <Field
            id="caloriesIntake"
            label="Calories in"
            accent="#FFB547"
            error={errors.caloriesIntake}
          >
            <input
              id="caloriesIntake"
              type="number"
              name="caloriesIntake"
              placeholder="Enter Today's Calorie Intake"
              defaultValue={initialValues.caloriesIntake}
              aria-invalid={!!errors.caloriesIntake}
              aria-describedby="caloriesIntake-error"
              className={ring(errors.caloriesIntake, 'focus:border-[#FFB547]')}
            />
          </Field>

          <Field
            id="caloriesBurned"
            label="Calories burnt"
            accent="#4ADE9C"
            error={errors.caloriesBurned}
          >
            <input
              id="caloriesBurned"
              type="number"
              name="caloriesBurned"
              placeholder="Enter Today's Calorie Burned"
              defaultValue={initialValues.caloriesBurned}
              aria-invalid={!!errors.caloriesBurned}
              aria-describedby="caloriesBurned-error"
              className={ring(errors.caloriesBurned, 'focus:border-[#4ADE9C]')}
            />
          </Field>
        </div>

        <Field
          id="description"
          label="Description"
          accent="#8794A6"
          error={errors.description}
        >
          <input
            id="description"
            type="text"
            name="description"
            placeholder="Enter a short description"
            defaultValue={initialValues.description}
            aria-invalid={!!errors.description}
            aria-describedby="description-error"
            className={ring(errors.description, 'focus:border-[#4ADE9C]')}
          />
        </Field>

        <div className="mt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="h-12 rounded-full px-5 text-[15px] font-bold text-[#C5CEDA] transition-colors hover:bg-[#1F2833] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ADE9C]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex h-12 items-center rounded-full bg-[#4ADE9C] px-7 text-[15px] font-extrabold text-[#07140E] shadow-[0_8px_24px_-8px_rgba(74,222,156,0.55)] transition hover:-translate-y-0.5 hover:bg-[#6AE9B0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4ADE9C] active:scale-95"
          >
            {addMode ? 'Submit' : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
