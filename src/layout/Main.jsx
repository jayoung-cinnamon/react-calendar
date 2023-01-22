import React from "react";
import styled from "styled-components";
import Calendar from "../component/Calendar";

const Main = () => {
  return (
    <MainContainer>
      <Calendar />
    </MainContainer>
  );
};

export default Main;
const MainContainer = styled.div`
  /* min-width: 1024px; */
  padding: 50px;
`;
