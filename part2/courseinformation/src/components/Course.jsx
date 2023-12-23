import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  const { name, parts } = course;

  const total = parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={total} />
    </div>
  );
};
export default Course;
