import { Outlet } from "react-router-dom";

import Grid from "@mui/material/Grid";

import Header from "../ui/Header.jsx";
import Sidebar from "../ui/Sidebar.jsx";
import GlobalStyles from "../styles/GlobalStyles.jsx";
import styled from "styled-components";

import "react-toastify/dist/ReactToastify.css";

const Main = styled.main`
  background-color: var(--color-grey-50);
  height: 100vh;
  padding: 3rem;
  overflow: scroll;
`;

function AppLayout() {
  return (
    <>
      <GlobalStyles />
      <Grid container spacing={2} sx={{ height: "100vh" }}>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={9} style={{ paddingLeft: "0rem" }}>
          <Grid container>
            <Grid item xs={12}>
              <Header />
            </Grid>
            <Grid item xs={12}>
              <Main>
                <Outlet />
              </Main>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default AppLayout;
