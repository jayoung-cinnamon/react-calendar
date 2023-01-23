import React from "react";
import Header from "./Header/Header";
import styled from "styled-components";
const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <MainPageContainer>{children}</MainPageContainer>
    </LayoutContainer>
  );
};

export default Layout;
const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  border: 1px solid red;
  .test {
    border: 1px solid red;
  }
`;
const MainPageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
