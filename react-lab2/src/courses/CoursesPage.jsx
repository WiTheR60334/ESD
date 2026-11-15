import { AddCourseForm } from "./AddCourseForm.jsx";
import { CoursesView } from "./CoursesView.jsx";
import { useCourses } from "./useCourses.js";

export function CoursesPage() {
  const { courses, status, error, addCourse } = useCourses();

  return (
    <section>
      <h1>Courses</h1>

      <CoursesView
        courses={courses}
        status={status}
        error={error}
      />

      <AddCourseForm onAdd={addCourse} />
    </section>
  );
}