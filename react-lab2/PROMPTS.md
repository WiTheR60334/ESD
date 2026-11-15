# Prompt Log — React Lab 2

**Name and Roll Number:** Romir Bedekar [MT2026082]  
**AI Tool and Plan:** ChatGPT — Go

## Prompt 1 — Analyse the handout and prepare an implementation guide

**Objective:** Understand the complete React Lab 2 requirements and organise the implementation into manageable stages.

**Reconstructed prompt:**

```text
Analyse the React Lab 2 handout thoroughly and create a structured
Markdown implementation guide.

Cover all required sections in the original handout order. Explain
the purpose of each task, the files involved, the expected component
architecture, API requirements, and relevant testing procedures.

Include the required Git workflow, with logical checkpoints for
committing completed sections. Also document the final testing and
submission requirements.

Keep the guide aligned with the provided lab handout and avoid
introducing unnecessary dependencies or changes to the starter
project's existing infrastructure.
```

**What came back:**

A structured Markdown guide explaining the lab requirements, implementation sequence, API contract, component architecture, testing strategy, Git checkpoints, and submission procedure.

**Evaluation:**

The guide provided a useful implementation roadmap, but it needed more complete code examples to support implementation directly.

---

## Prompt 2 — Develop a code-first, step-by-step implementation guide

**Objective:** Expand the initial guide into a practical implementation reference with complete code and incremental commits.

**Reconstructed prompt:**

```text
Revise the React Lab 2 implementation guide into a detailed,
code-first tutorial.

For every required file:
1. Explain its responsibility.
2. Provide the complete implementation.
3. Explain important React concepts and design decisions.
4. Ensure that component interfaces and API calls follow the
   supplied CONTRACT.md.
5. Include appropriate error handling and loading states.

Cover the search functionality and course-management functionality
in the order specified by the lab handout.

Use the existing apiFetch utility for API communication. Keep
data-fetching logic inside custom hooks, maintain immutable state
updates, and implement accessible form validation.

After each logical milestone, provide:
- The relevant targeted test command.
- A short manual verification checklist.
- A meaningful Git commit message and command.

Finish with the complete test command, browser verification steps,
and instructions for preparing the submission ZIP.

Do not assume that the implementation passes the tests without
actual test output.
```

**What came back:**

A revised Markdown guide containing implementations for:

- `src/search/SearchResults.jsx`
- `src/search/useCourseSearch.js`
- `src/search/CourseSearch.jsx`
- Optional `src/search/useDebounced.js`
- `src/courses/CoursesView.jsx`
- `src/courses/useCourses.js`
- `src/courses/AddCourseForm.jsx`
- `src/courses/CoursesPage.jsx`

It also included targeted Vitest commands, incremental Git commits, manual browser checks, and the final 62-test target.

**Implementation decisions retained:**

- Separation of search UI and data-fetching logic.
- Four-file Courses architecture.
- Use of `apiFetch` for API communication.
- Loading, error, empty, and success states.
- Ignore-flag cleanup for asynchronous requests.
- Immutable and sorted course insertion.
- Numeric conversion for form values.
- Empty description converted to `null`.
- Accessible field-level validation errors.

**Verification status:**

The generated code was treated as a reference implementation. It still needs to be checked against the local `CONTRACT.md` and verified using the actual project test suite. No local test results are claimed here.

---

## Additional prompts

If other AI prompts were used during actual implementation or debugging, add them here in chronological order. Do not include reconstructed examples as actual prompts.

---

## Reflection

**How many prompts did the guide-development process involve?**

Two main requests were used to develop and refine the implementation guide. This count does not include any separate prompts used during actual coding or debugging.

**Which request would you improve?**

The initial request could have been more specific by identifying the required files, requesting complete implementations, specifying the contract requirements, and asking for incremental testing and Git commits from the beginning.

**What was the most useful outcome?**

The guide established a modular architecture, kept API communication behind the provided utility, separated presentation from data-fetching logic, and organised implementation into testable milestones.