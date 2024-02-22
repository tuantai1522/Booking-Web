import { Button, Grid, Typography } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useSearchParams } from "react-router-dom";

import { DEFAULT_PAGE_SIZE } from "../utils/config.js";

function Pagination({ filterField = "curPage", totalPages, totalRows }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const curPage = searchParams.get(filterField)
    ? parseInt(searchParams.get(filterField))
    : 1;

  const from = (curPage - 1) * DEFAULT_PAGE_SIZE + 1;
  const to = Math.min(curPage * DEFAULT_PAGE_SIZE, totalRows);

  const handlePreviousPage = () => {
    const prev = curPage === 1 ? curPage : curPage - 1;

    searchParams.set(filterField, prev);
    setSearchParams(searchParams);
  };

  const handleNextPage = () => {
    const next = curPage === totalPages ? curPage : curPage + 1;

    searchParams.set(filterField, next);
    setSearchParams(searchParams);
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        <Typography
          variant="h6"
          component="body1"
        >{`Showing ${from} to ${to} of ${totalRows} results`}</Typography>
      </Grid>
      <Grid container gap="2rem" justifyContent="flex-end" item xs={6}>
        <Button
          disabled={curPage === 1}
          onClick={handlePreviousPage}
          variant="contained"
        >
          <ArrowBackIosIcon />
          Previous
        </Button>
        <Button
          disabled={curPage === totalPages}
          onClick={handleNextPage}
          variant="contained"
        >
          Next
          <ArrowForwardIosIcon />
        </Button>
      </Grid>
    </Grid>
  );
}

export default Pagination;
