# Audit — React Lab 2

Part of what you submit. Fill in sections 0–4 **before** you ask the AI to change anything:
deciding what's wrong is your job, not the AI's. The sheet you audit against is "The Shape
of a Good React Slice" — section 08 of the lab doc.

Point at code as `file:line`, e.g. `CoursesPage.jsx:14`.


## 0. What came back

| File provided in the implementation guide | What's in it (components, hooks) | Lines in the provided snippet (verify locally) |
| --- | --- | --- |
| `src/courses/CoursesView.jsx` | `formatSeats` helper and `CoursesView`; renders loading, error, empty and populated states; maps courses using `course.id` | approx. 1–39 |
| `src/courses/useCourses.js` | `useCourses`; three state values (`courses`, `status`, `error`), initial GET effect with ignore cleanup, `addCourse` POST and immutable sorted insertion | approx. 1–44 |
| `src/courses/AddCourseForm.jsx` | `AddCourseForm`; form state, submitting state, add-error state, six controlled fields, `onAdd`, numeric conversion, field-level accessible errors | approx. 1–175 |
| `src/courses/CoursesPage.jsx` | `CoursesPage`; calls `useCourses` once and wires `CoursesView` and `AddCourseForm` | approx. 1–22 |

- **Does it run?** Not verified in the local project yet. The implementation is designed to load the list, add a valid course in code order, show the 409 duplicate message, and show validation errors under their fields. Confirm all four behaviours in the browser before marking them as passed.
- **Requests in the Network tab:** Expected in the development build with the app's `StrictMode`: **2 initial GET requests** on page load (the first effect is cleaned up/ignored); **0 additional GET requests per add**. Each add makes a POST. Confirm this in DevTools → Network. In production, the initial effect should run once.
- **`npm test` before any fix:** The handout's untouched starter baseline is **8 test files failed / 1 passed; 54 tests failed / 8 passed**. The actual count after the first AI-generated draft has not been provided, so record that result from the run you did immediately after generating that draft.
- **Which test files fail?** Not provided for the first generated draft. Copy the actual failing filenames from Vitest output; do not guess them.

## 1. Part A — walk the allowed list

The rows below assess the **target implementation in the guide**, not an unseen first draft. Replace the approximate references with exact line numbers from your local files.

| Element (the sheet, Part A) | Where it is in the code (`file:line`, or "missing") | Right place? If not, where should it be? |
| --- | --- | --- |
| One View component that only renders | `src/courses/CoursesView.jsx` — `CoursesView` (approx. lines 15–39) | Yes. It receives `courses`, `status`, and `error` as props and returns JSX only. |
| Fetch + logic in a separate hook or module | `src/courses/useCourses.js` — `useCourses` (approx. lines 4–44) | Yes. GET and POST logic live in the hook, not in the View or form. |
| `useState` for the course list, at the right level | `src/courses/useCourses.js` (approx. line 5) | Yes. The View displays the list and adding changes it, so the hook called by the page owns it. |
| `useState` for the form's inputs, at the right level | `src/courses/AddCourseForm.jsx` (approx. line 15) | Yes. Only the form needs the six half-typed values. |
| `useEffect` — for the initial fetch only (with a cleanup) | `src/courses/useCourses.js` (approx. lines 9–28) | Yes. It loads the initial list and returns cleanup that sets the ignore flag. |
| Props down, callbacks up (the form raises "add this course") | `src/courses/CoursesPage.jsx` passes `onAdd={addCourse}`; `AddCourseForm.jsx` calls `onAdd` | Yes. The page/hook owns the action; the form raises it through a callback. |
| `.map` to render the list, with a stable `key` | `src/courses/CoursesView.jsx` (approx. lines 29–37) | Yes. Uses `course.id`, not the array index. |
| Loading / error / empty states, from one `status` | `src/courses/useCourses.js` and `CoursesView.jsx` | Yes. `status` uses `"loading"`, `"ready"`, and `"error"`; the View distinguishes an empty ready list using `courses.length`. |

## 2. Part B — scan for "not yet"

The provided target code does not intentionally use any of the prohibited/unintroduced items below. Verify the actual AI-generated and final files with the search command before completing the table.

Run from `react-lab2`:

```bash
grep -rnE "useMemo|useCallback|useReducer|useRef|useContext|createContext|axios|@tanstack|swr|fetch\\(" src/courses
```

| Not yet | Found? (`file:line`) | What it does in *this* slice | Cut, or keep — and why |
| --- | --- | --- | --- |
| `useMemo` | Not in the provided target code; verify locally | Memoises a computed value between renders. No expensive computation here requires it. | Cut if present; compute ordinary values during render. |
| `useCallback` | Not in the provided target code; verify locally | Memoises a function reference. No measured render/performance problem requires it here. | Cut if present; use ordinary functions. |
| `useReducer` | Not in the provided target code; verify locally | Manages state through a reducer and dispatched actions. This slice has a straightforward initial load and add. | Cut if present; `useState` is enough. |
| `useRef` | Not in the provided target code; verify locally | Holds a mutable value across renders or references a DOM element. The required slice does not need either. | Cut if present unless the actual contract demonstrates a required job. |
| Context (`createContext`, `useContext`) | Not in the provided target code; verify locally | Shares values without passing props through each level. The page has only two direct children. | Cut if present; props are sufficient. |
| A data-fetching library, or `axios`, or raw `fetch` instead of `apiFetch` | Not in the provided target code; verify locally | A library or raw `fetch` would bypass/hide the supplied `apiFetch` client behaviour. | Use only `apiFetch` from `src/api/client.js`. |
| TypeScript (types, interfaces, `.ts`/`.tsx`) | Not in the provided target code; verify locally | Adds static type syntax; the lab files are JavaScript/JSX. | Use `.js` / `.jsx`. |
| Anything else nobody taught you (name it) | None identified in the provided target code; verify locally | Check for extra state, unrequested validation, success alerts, delete controls, or components with no distinct responsibility. | Remove anything that has no concrete job in this feature. |

## 3. The rule — every hook and every component split

These rows describe the intended final Courses slice from the implementation guide. Update each line reference with `nl -ba` after copying the code into the project.

| Hook call or component (`file:line`) | What earns it here? (one sentence) | Keep / cut / move (to where) |
| --- | --- | --- |
| `useState` — `src/courses/useCourses.js` (approx. line 5) | Stores the course list shared by the list View and the add operation. | Keep in `useCourses`. |
| `useState` — `src/courses/useCourses.js` (approx. line 6) | Stores whether the initial list request is loading, ready, or failed. | Keep in `useCourses`. |
| `useState` — `src/courses/useCourses.js` (approx. line 7) | Stores the initial list-load error message for the View. | Keep in `useCourses`. |
| `useEffect` — `src/courses/useCourses.js` (approx. line 9) | Loads the course list when the page first appears and ignores a response after cleanup. | Keep in `useCourses`; it owns the server interaction. |
| `useCourses()` — `src/courses/CoursesPage.jsx` (approx. line 5) | Gives the page one shared course state and the action used by the form. | Keep; call once in `CoursesPage`. |
| `useState` — `src/courses/AddCourseForm.jsx` (approx. line 15) | Owns the six field values while the user is typing. | Keep in `AddCourseForm`; do not lift the values into the page. |
| `useState` — `src/courses/AddCourseForm.jsx` (approx. line 16) | Tracks whether a POST is in progress so the submit button can be disabled. | Keep in `AddCourseForm`. |
| `useState` — `src/courses/AddCourseForm.jsx` (approx. line 17) | Holds the last add error so the form can show its message and field errors. | Keep in `AddCourseForm`. |
| `CoursesView` — `src/courses/CoursesView.jsx` (approx. line 15) | Renders the course list and its loading, error, and empty states from props. | Keep as the single presentational View. |
| `AddCourseForm` — `src/courses/AddCourseForm.jsx` (approx. line 13) | Owns its controlled fields and raises the add action using `onAdd`. | Keep; it must not call the API directly. |
| `CoursesPage` — `src/courses/CoursesPage.jsx` (approx. line 4) | Calls the hook once and passes data/callbacks to the two child components. | Keep as the wiring component. |

## 4. Decisions — before any fix prompt

For the **target code in the guide**, the architecture already follows the intended seam. If your actual first AI draft differs, edit these bullets to describe the specific changes you decided before sending a fix prompt.

- I will **cut**:
  - Any `useMemo`, `useCallback`, `useReducer`, `useRef`, Context, data-fetching library, axios, or TypeScript that appears without a requirement in this feature.
  - Any stored `courseCount` or separate sorted-list state; `courses.length` is derived and the list is sorted when updated.
  - Any direct `fetch` call outside the provided `apiFetch` client.
  - Any unnecessary browser-side validation or unrequested success/delete UI.

- I will **move** (from → to):
  - Initial `GET /api/courses` and `POST /api/courses` logic → `src/courses/useCourses.js`.
  - Shared course-list state → `useCourses`, called once by `CoursesPage`.
  - Six input values, submitting state, and last add error → `AddCourseForm`.
  - List rendering and loading/error/empty display → `CoursesView`, with props only.

- I will **add** (missing from the AI's version):
  - One `status` string (`"loading"`, `"ready"`, `"error"`) instead of separate loading/error booleans.
  - An effect cleanup/ignore flag checked in both the success and failure handlers.
  - Immutable insertion of the POST's returned Course into a new array sorted by `code`; no second GET after an add.
  - `Number(...)` for credits/capacity and `null` for an empty description.
  - Field errors directly below their own inputs, with `aria-invalid` and `aria-describedby`, plus a `role="alert"` for the general message.
  - Stable `key={course.id}` on list items.

- Other smells I found:
  - Do not mutate the existing course list with `push` or in-place `sort`.
  - Do not swallow POST errors in `useCourses`; let the `ApiError` reach the form.
  - Do not clear the form after a failed request.
  - Do not refetch the list after a successful POST; use the returned `201` body.
  - Do not store data that can be derived from `courses`.

---

## 5. Strip check (section 14 of the doc)

The provided target implementation contains none of the listed "not yet" tools. Confirm against your actual files using the search command in §2. If it also finds none, keep this statement and update the test/browser result after you run them:

> The target implementation used none of the "not yet" items. The constraints to use only `useState` and `useEffect`, avoid Context and data-fetching libraries, and use the provided `apiFetch` client kept the code within the taught feature scope.

| Removed | `npm test` after | The app after (loads / adds / shows errors) |
| --- | --- | --- |
| No "not yet" item found in the provided target code (verify local scan) | Not run in this conversation — run locally and record result | Not browser-verified in this conversation — run the list/add/duplicate/invalid-input checks |

## 6. Before / after

This comparison is based on the intended final implementation supplied in the guide. Fill the "Before" column from your actual first AI-generated version; those facts cannot be inferred from the target code.

|  | Before (the AI's first version) | After (target implementation from the guide) |
| --- | --- | --- |
| Files and components | Not captured in this conversation; record actual first draft paths/components | Four files: `CoursesView`, `useCourses`, `AddCourseForm`, `CoursesPage` |
| `useState` calls (and where) | Count from actual first draft | 3 in `useCourses`; 3 in `AddCourseForm` |
| `useEffect` calls | Count from actual first draft | 1 in `useCourses` for initial GET |
| "Not yet" items | Scan actual first draft and record | None in the provided target code |
| Requests: on load / per add | Record actual Network tab observations | Development StrictMode: 2 initial GET attempts (first response ignored); 0 GET per add, 1 POST per add |
| `npm test` | Record actual first-draft result | Not run here; expected target is 9 test files and 62 tests passing |

## 7. Two sentences

- One thing the AI got right that I might not have thought of: **The `apiFetch` client owns the token and HTTP error handling, so components and hooks can use a single API function and let its `ApiError` reach the form.**
- One thing I will never accept from an AI without checking again: **That a page which works in the browser is necessarily structured correctly; I will inspect state ownership, effect cleanup, immutable updates, request counts, accessible field errors, and whether the code uses only the tools allowed for the feature.**
