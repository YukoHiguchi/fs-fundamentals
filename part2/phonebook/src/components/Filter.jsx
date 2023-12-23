const Filter = ({ searchValue, handleChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        type="search"
        name="search"
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
