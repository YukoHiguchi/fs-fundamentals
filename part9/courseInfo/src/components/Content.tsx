import { CoursePart } from '../types';
/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

function DetailContent({ course }: { course: CoursePart }) {
  switch (course.kind) {
    case 'basic':
      return (
        <p>
          <i>{course.description}</i>
        </p>
      );
    case 'group':
      return <p>project exercises {course.groupProjectCount}</p>;
    case 'background':
      return (
        <p>
          <i>{course.description}</i>
          <br />
          submit to {course.backgroundMaterial}
        </p>
      );
    case 'special':
      return (
        <p>
          <i>{course.description}</i>
          <br />
          required skills: {course.requirements.join(', ')}
        </p>
      );
    default:
      assertNever(course);
  }
}

function Content({ courseParts }: { courseParts: CoursePart[] }) {
  return courseParts.map((coursePart) => (
    <div key={coursePart.name}>
      <b>
        {coursePart.name} {coursePart.exerciseCount}
      </b>
      <DetailContent course={coursePart} />
    </div>
  ));
}

export default Content;
