import Person from "./Person";

const Persons = ({ persons, searchValue, handleDelete }) => {
  const lowerCaseValue = searchValue?.toLowerCase();

  return persons
    .filter((person) => person.name.toLowerCase().indexOf(lowerCaseValue) >= 0)
    .map((person) => (
      <Person key={person.name} person={person} handleDelete={handleDelete} />
    ));
};

export default Persons;
