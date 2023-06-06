import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fontSizes } from '../../../theme/theme';

const Footer = () => {
  return (
    <FooterContainer>
      <Menu>
        <LogoWrap>
          <Link to={'/'}>boiler plate</Link>
        </LogoWrap>

        <MenuContainer>
          <MenuItem>
            <a>github</a>
          </MenuItem>
          <MenuItem>
            <a>email</a>
          </MenuItem>
        </MenuContainer>
      </Menu>
    </FooterContainer>
  );
};

const FooterContainer = styled.header`
  background-color: ${({ theme }) => theme.bg_main1};
  color: ${({ theme }) => theme.text1};
  width: 100%;
  height: 120px;

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    height: 70px;
  }
`;

const Menu = styled.nav`
  /* background-color: skyblue; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  padding: 1rem;
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

const MenuContainer = styled.ul`
  display: flex;
  gap: 2.5rem;

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    gap: 1.5rem;
  }
`;

const MenuItem = styled.li`
  list-style: none;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text3};
    font-size: ${fontSizes.small};
    text-transform: uppercase;
    transition-duration: 0.2s;
    transition: 0.22s ease-in-out;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.text1};
      text-decoration: underline;
    }
  }
`;

export default Footer;
