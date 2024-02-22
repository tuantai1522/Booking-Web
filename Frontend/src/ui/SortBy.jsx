import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { useSearchParams } from "react-router-dom";

function SortBy({ filterField = "sort", options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(e) {
    const value = e.target.value;

    searchParams.set(filterField, value);
    setSearchParams(searchParams);

    //quay về trang 1

    if (searchParams.get("curPage") !== null) {
      searchParams.set("curPage", 1);
      setSearchParams(searchParams);
    }
  }

  return (
    <div>
      <TextField
        style={{ width: "30rem" }}
        select
        label="Select"
        defaultValue={options[0].value}
        onChange={handleClick}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

export default SortBy;
