const Filter = ({ searchValue, handleChange }) => {
  return (
    <div>
      find countries{" "}
      <input
        onChange={handleChange}
        name="country"
        type="search"
        value={searchValue}
      />
    </div>
  );
};

export default Filter;
