import MainNav from "./MainNav";
import Logo from "./Logo";
import styled from "@emotion/styled";

const StyledLogo = styled.div`
  background-color: var(--color-grey-50);
`;
function Sidebar() {
  return (
    <>
      <StyledLogo>
        <Logo />
        <MainNav />
      </StyledLogo>
    </>
  );
}

export default Sidebar;
