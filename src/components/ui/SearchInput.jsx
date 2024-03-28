import { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import {InputField} from './InputField'

export  function SearchInput({ placeholder, query, onChange }) {
  const [searchQuery, setSearchQuery] = useState(query || "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onChange(searchQuery);
      }}
      className="relative w-full"
    >
      <div className="relative">
        <InputField
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => {
            const query = e.target.value;
            setSearchQuery(query);
            onChange(query);
          }}
        />
      </div>

      <button
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 text-xl text-text-tertiary transition-transform duration-300 ${
          searchQuery ? "scale-100" : "scale-0"
        }`}
        onClick={() => setSearchQuery("")}
      >
        <HiMiniXMark />
      </button>
    </form>
  );
}
