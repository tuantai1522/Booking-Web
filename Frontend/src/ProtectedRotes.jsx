import { useNavigate } from "react-router-dom";
import { useGuest } from "./customHooks/useGuest/useGuest";

import styled from "styled-components";

import Spinner from "./ui/Spinner";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
`;

function ProtectedRotes({ children }) {
  const navigate = useNavigate();

  const { isFetching, user } = useGuest();

  useEffect(
    function () {
      if (!user?.isAuthenticated) navigate("/login");
    },
    [user, isFetching, navigate]
  );

  if (isFetching)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (user?.isAuthenticated) return children;
}

export default ProtectedRotes;
