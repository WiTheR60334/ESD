import { useState } from "react";

const EMPTY_FORM = {
  code: "",
  title: "",
  department: "",
  credits: "",
  capacity: "",
  description: "",
};

export function AddCourseForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fieldErrors = error?.fieldErrors ?? {};

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      await onAdd({
        ...form,
        credits: Number(form.credits),
        capacity: Number(form.capacity),
        description: form.description === "" ? null : form.description,
      });

      setForm({ ...EMPTY_FORM });
    } catch (err) {
      setError(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="course-code">Code</label>
        <input
          id="course-code"
          name="code"
          type="text"
          value={form.code}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.code)}
          aria-describedby={fieldErrors.code ? "course-code-error" : undefined}
        />
        {fieldErrors.code && (
          <p id="course-code-error">{fieldErrors.code}</p>
        )}
      </div>

      <div>
        <label htmlFor="course-title">Title</label>
        <input
          id="course-title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.title)}
          aria-describedby={fieldErrors.title ? "course-title-error" : undefined}
        />
        {fieldErrors.title && (
          <p id="course-title-error">{fieldErrors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="course-department">Department</label>
        <input
          id="course-department"
          name="department"
          type="text"
          value={form.department}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.department)}
          aria-describedby={
            fieldErrors.department ? "course-department-error" : undefined
          }
        />
        {fieldErrors.department && (
          <p id="course-department-error">{fieldErrors.department}</p>
        )}
      </div>

      <div>
        <label htmlFor="course-credits">Credits</label>
        <input
          id="course-credits"
          name="credits"
          type="number"
          value={form.credits}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.credits)}
          aria-describedby={
            fieldErrors.credits ? "course-credits-error" : undefined
          }
        />
        {fieldErrors.credits && (
          <p id="course-credits-error">{fieldErrors.credits}</p>
        )}
      </div>

      <div>
        <label htmlFor="course-capacity">Capacity</label>
        <input
          id="course-capacity"
          name="capacity"
          type="number"
          value={form.capacity}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.capacity)}
          aria-describedby={
            fieldErrors.capacity ? "course-capacity-error" : undefined
          }
        />
        {fieldErrors.capacity && (
          <p id="course-capacity-error">{fieldErrors.capacity}</p>
        )}
      </div>

      <div>
        <label htmlFor="course-description">Description</label>
        <textarea
          id="course-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.description)}
          aria-describedby={
            fieldErrors.description ? "course-description-error" : undefined
          }
        />
        {fieldErrors.description && (
          <p id="course-description-error">{fieldErrors.description}</p>
        )}
      </div>

      {error?.message && <p role="alert">{error.message}</p>}

      <button type="submit" disabled={submitting}>
        Add course
      </button>
    </form>
  );
}