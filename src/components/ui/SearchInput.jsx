import { useState } from "react";
import { InputField } from "./InputField";

export function SearchInput({
  placeholder,
  query,
  onChange,
  className,

  ...props
}) {
  const [searchQuery, setSearchQuery] = useState(query || "");

  return (
    <InputField
      placeholder={placeholder}
      value={searchQuery}
      onChange={(e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onChange(query);
      }}
      type="search"
      className={className}
      {...props}
    />
  );
}
