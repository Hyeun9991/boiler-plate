import React from 'react';
import styled from 'styled-components';
import { MdSunny, MdDarkMode } from 'react-icons/md';
import { fontSizes } from '../theme/theme';

const ThemeToggle = ({ toggle, mode }) => {
  return (
    <ToggleWrapper onClick={toggle}>
      {mode === 'dark' ? (
        <MdDarkMode className="icon" />
      ) : (
        <MdSunny className="icon" />
      )}
    </ToggleWrapper>
  );
};

const ToggleWrapper = styled.button`
  position: fixed;
  z-index: 999999;
  bottom: 4%;
  right: 3%;

  background-color: ${({ theme }) => theme.bg_main3};
  font-size: ${fontSizes.small};
  color: ${({ theme }) => theme.text3};

  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.06), 0 2px 32px 0 rgba(0, 0, 0, 0.16);
  transition-duration: 0.2s;
  transition: 0.22s ease-in-out;
  cursor: pointer;

  .icon {
    color: #fff;
    font-size: ${fontSizes.lg};
  }

  &:hover {
    scale: 1.1;
  }
`;

export default ThemeToggle;
