import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { fontSizes } from '../../../../theme/theme';

const RightMenu = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.data.success) {
        window.localStorage.removeItem('userId');
        navigate('/login');
      } else {
        alert('로그아웃 하는데 실패 했습니다.');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <RightMenuContainer>
        <MenuItem>
          <NavLink to="/login">Login</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/register" className="signup-btn">
            Sign up
          </NavLink>
        </MenuItem>
      </RightMenuContainer>
    );
  } else {
    return (
      <RightMenuContainer>
        <MenuItem>
          {user.userData && (
            <UserName className="user-name">{user.userData.name}</UserName>
          )}
        </MenuItem>
        <MenuItem>
          <NavLink to="#" onClick={logoutHandler} className="logout-btn">
            Logout
          </NavLink>
        </MenuItem>
      </RightMenuContainer>
    );
  }
};

const RightMenuContainer = styled.ul`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    gap: 0;

    .user-name {
      margin-right: 1.5rem;
    }
  }
`;

const MenuItem = styled.li`
  list-style: none;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text1};
    font-size: ${fontSizes.small};
    font-weight: 500;
    text-transform: uppercase;
    transition-duration: 0.2s;
    transition: 0.22s ease-in-out;

    &:hover {
      color: #6606ad;
    }
  }

  /* .signup-btn {
    background: linear-gradient(
        ${({ theme }) => theme.bg_element2},
        ${({ theme }) => theme.bg_element2}
      ),
      linear-gradient(
        to top right,
        #6606ad,
        ${({ theme }) => theme.bg_element2},
        ${({ theme }) => theme.bg_element2},
        ${({ theme }) => theme.bg_element2},
        #6606ad
      );
    border-color: transparent;
    background-origin: border-box;
    background-clip: content-box, border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.1rem solid transparent;
    color: ${({ theme }) => theme.text1};
    font-size: ${fontSizes.xs};
    width: 130px;
    height: 50px;
    border-radius: 9999px;
    transition-duration: 0.2s;
    transition: 0.22s ease-in-out;

    &:hover {
      border-color: #6606ad;
      background: ${({ theme }) => theme.bg_main1};
      color: ${({ theme }) => theme.text1};
    }
  } */
  .signup-btn {
    background-color: ${({ theme }) => theme.bg_main3};
    text-transform: uppercase;
    border-radius: 999px;
    font-weight: 500;
    font-size: ${fontSizes.xs};
    padding: 1rem 2.5rem;
    color: #fff;
    transition-duration: 0.2s;
    transition: 0.22s ease-in-out;
    box-shadow: 0 81.5873px 65.2699px rgba(102, 6, 173, 0.14),
      0 34.0852px 27.2682px rgba(102, 6, 173, 0.1),
      0 18.2236px 14.5789px rgb(102 6 173/8%),
      0 10.216px 8.1728px rgb(102 6 173/7%),
      0 5.42564px 4.34051px rgb(102 6 173/6%),
      0 2.25773px 1.80619px rgb(102 6 173/4%);
    cursor: pointer;

    &:hover {
      background-color: #6606ad;
      opacity: 0.7;
      box-shadow: none;
      color: #fff;
    }
  }
  .logout-btn {
    color: ${({ theme }) => theme.text4};
  }

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    .signup-btn {
      display: none;
    }
  }
`;

const UserName = styled.p`
  color: ${({ theme }) => theme.text1};
  font-size: ${fontSizes.small};
  font-weight: 600;
`;

export default RightMenu;
