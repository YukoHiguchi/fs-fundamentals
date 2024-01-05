import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    personService.getAll().then((returnedPerson) => {
      setPersons(returnedPerson);
    });
  }, []);

  const clearForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setNewName(value);
    } else if (name === "number") {
      setNewNumber(value);
    } else if (name === "search") {
      setSearchValue(value);
    }
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const person = persons.find((person) => person.name === newName);
    if (person) {
      const changedPerson = { ...person, number: newNumber };
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson))
            );
            setIsSuccess(true);
            setMessage(`Updated ${returnedPerson.name}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.log(error.response.data.error);
            setIsSuccess(false);
            setMessage(error.response.data.error);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    } else {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setIsSuccess(true);
          setMessage(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setIsSuccess(false);
          setMessage(error.response.data.error);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
    clearForm();
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .delete(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch(() => {
          setIsSuccess(false);
          setMessage(
            `Information ${person.name} has already been deleted from server`
          );
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification isSuccess={isSuccess} message={message} />
      <Filter searchValue={searchValue} handleChange={handleChange} />

      <h3>Add a new</h3>

      <PersonForm
        handleAddPerson={handleAddPerson}
        handleChange={handleChange}
        name={newName}
        number={newNumber}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        searchValue={searchValue}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
