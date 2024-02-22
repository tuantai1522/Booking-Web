import { Button, Grid } from "@mui/material";
import styled, { css } from "styled-components";

import { useSearchParams } from "react-router-dom";

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField = "filter", options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  if (searchParams.get(filterField) === null) {
    searchParams.set(filterField, options[0].value);
    setSearchParams(searchParams);
  }

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);

    //quay về trang 1

    if (searchParams.get("curPage") !== null) {
      searchParams.set("curPage", 1);
      setSearchParams(searchParams);
    }
  }

  return (
    <Grid gap="1rem" container alignItems="center">
      {options.map((option) => (
        <FilterButton
          active={searchParams.get(filterField) === option.value}
          onClick={() => handleClick(option.value)}
          variant="contained"
          key={option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </Grid>
  );
}

export default Filter;
