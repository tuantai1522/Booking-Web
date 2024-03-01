import { Button, Grid, Typography } from "@mui/material";

import { useGuest } from "../context/GuestContext.jsx";

import { useLogout } from "../customHooks/useLogout/useLogout.js";

import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

import { toast } from "react-toastify";
import styled from "styled-components";
import DarkMode from "./DarkMode.jsx";

const StyledHeader = styled.div`
  background-color: var(--color-grey-50);
`;

function Header() {
  const { user } = useGuest();

  const { isFetching: isLoggingOut, logout } = useLogout();

  const { guest } = user;

  const { fullName } = guest;

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      // If success, reset all values in form
      const response = await logout();

      // Display toast
      if (response && +response.EC === 0) {
        toast.success(response.EM);
      } else {
        toast.error(response.EM);
      }
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  return (
    <>
      <StyledHeader>
        <Grid
          container
          alignItems="center"
          justifyContent="flex-end"
          style={{ padding: "2rem" }}
        >
          <Typography variant="h4" component="h4">
            {fullName}
          </Typography>
          <Button>
            <PersonIcon style={{ fontSize: "2.5rem" }} />
          </Button>
          <DarkMode />

          <Button disabled={isLoggingOut} onClick={handleLogout}>
            <LogoutIcon style={{ fontSize: "2.5rem" }} />
          </Button>
        </Grid>
      </StyledHeader>
    </>
  );
}

export default Header;
