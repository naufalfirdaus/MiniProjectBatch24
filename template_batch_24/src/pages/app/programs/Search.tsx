import React from "react";

const Search = (props: any) => {
    const { label, value, onClick = () => {}, onChange = () => {} } = props;
  return (
    <div>
      <label htmlFor="search">{label}</label>
      <input
        type="text"
        name="search"
        onChange={onChange}
        value={value}
        className="mx-5"
      />
      <button
        type="submit"
        onClick={onClick}
        className="p-2 bg-slate-700 text-white"
      >
        {label}
      </button>
    </div>
  );
};

export default Search;
