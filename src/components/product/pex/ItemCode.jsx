import { useEffect, useRef, useState } from "react";

const ItemCode = ({ options, label, id, selectedVal, handleChange }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option.itemCode);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return "";
  };

  const filter = () => {
    return options?.filter(
      (option) =>
        option?.itemCode?.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
    <div className="dropdown">
      <div className="control ">
        <div className="selected-value ">
          <input
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            placeholder="Item Code"
            autoComplete="off"
            required
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange(e.target.value);
            }}
            onClick={toggle}
          />
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
      </div>

      <div className={`options ${isOpen ? "open" : ""}`}>
        {filter(options)?.map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`option }`}
              key={index}
            >
              {option.itemCode}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemCode;
