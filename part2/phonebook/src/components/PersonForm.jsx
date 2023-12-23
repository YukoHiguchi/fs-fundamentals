function PersonForm({ handleAddPerson, handleChange, name, number }) {
  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name:{" "}
        <input type="text" name="name" onChange={handleChange} value={name} />
      </div>
      <div>
        number:{" "}
        <input
          type="tel"
          name="number"
          onChange={handleChange}
          value={number}
        />
      </div>
      <div>
        <button type="submit" disabled={!name || !number}>
          add
        </button>
      </div>
    </form>
  );
}

export default PersonForm;
