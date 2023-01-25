import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Header = () => {
  <HeaderContainer>
    <Link to="/">
      <div>1</div>
    </Link>
    <Link to="/2">
      <div>2</div>
    </Link>
  </HeaderContainer>;
};

export default Header;

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  height: 60px;
`;
