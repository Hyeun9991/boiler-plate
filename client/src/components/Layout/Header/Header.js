import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import RightMenu from './Sections/RightMenu';
import { fontSizes } from '../../../theme/theme';

const Header = () => {
  return (
    <HeaderContainer>
      <Menu>
        <LeftSection>
          <LogoWrap>
            <Link to={'/'}>boiler plate</Link>
          </LogoWrap>
        </LeftSection>

        <RightSection>
          <RightMenu />
        </RightSection>
      </Menu>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.bg_main1};
  width: 100%;
  height: 120px;

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    height: 70px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const RightSection = styled.div``;

const Menu = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  padding: 1rem;

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    width: 95%;
  }
`;

const LogoWrap = styled.h1`
  text-transform: uppercase;
  font-size: ${fontSizes.lg};
  font-weight: 600;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text1};
  }

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    font-size: ${fontSizes.base};
  }
`;
export default Header;
