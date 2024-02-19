import {
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CabinIcon from "@mui/icons-material/Cabin";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

import { NavLink } from "react-router-dom";

import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-blue-700);
    background-color: var(--color-grey-200);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <>
      <List>
        <StyledNavLink component={NavLink} to="/">
          <ListItemAvatar>
            <Avatar>
              <HomeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <Typography sx={{ fontSize: "2rem" }}>Home</Typography>
          </ListItemText>
        </StyledNavLink>
        <StyledNavLink component={NavLink} to="/bookings">
          <ListItemAvatar>
            <Avatar>
              <ScheduleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <Typography sx={{ fontSize: "2rem" }}>Bookings</Typography>
          </ListItemText>
        </StyledNavLink>
        <StyledNavLink component={NavLink} to="/rooms">
          <ListItemAvatar>
            <Avatar>
              <CabinIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <Typography sx={{ fontSize: "2rem" }}>Rooms</Typography>
          </ListItemText>
        </StyledNavLink>
        <StyledNavLink component={NavLink} to="/users">
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <Typography sx={{ fontSize: "2rem" }}>Users</Typography>
          </ListItemText>
        </StyledNavLink>
        <StyledNavLink component={NavLink} to="/settings">
          <ListItemAvatar>
            <Avatar>
              <SettingsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            <Typography sx={{ fontSize: "2rem" }}>Settings</Typography>
          </ListItemText>
        </StyledNavLink>
      </List>
    </>
  );
}

export default MainNav;
