import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';
import { fontSizes } from '../../../theme/theme';
import { useTheme } from '../../../context/themeProvider';
import ThemeToggle from '../../ThemeToggle';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ThemeMode, toggleTheme] = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let body = {
      email: data.email,
      password: data.password,
    };

    // login
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        window.localStorage.setItem('userId', response.payload.userId);
        navigate('/');
      } else {
        alert('로그인에 실패했습니다.');
      }
    });
  };

  return (
    <Container>
      <ThemeToggle toggle={toggleTheme} mode={ThemeMode} />
      <HeaderContainer>
        <LogoWrap>
          <Link to="/">boiler plate</Link>
        </LogoWrap>
      </HeaderContainer>
      <LoginFormContainer>
        <Title>Sign in</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputWrap>
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              {...register('email', {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.email && (
              <ErrorText>This email field is required</ErrorText>
            )}
          </InputWrap>

          <InputWrap>
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password && errors.password.type === 'required' && (
              <ErrorText>This field is required</ErrorText>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <ErrorText>Password must have at least 6 characters</ErrorText>
            )}
          </InputWrap>

          <SubmitButton>Sign in</SubmitButton>
        </Form>
        <SignUpWrap>
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </SignUpWrap>
      </LoginFormContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    circle at right bottom,
    #6606ad60,
    ${({ theme }) => theme.bg_main1} 30%
  );
`;
const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  padding: 0 5%;

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    height: 70px;
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
const LoginFormContainer = styled.div`
  background: ${({ theme }) => theme.bg_element1};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
  height: auto;
  padding: 32px;
  border-radius: 0.75rem;
  margin: 1rem;
`;
const Title = styled.h1`
  font-size: ${fontSizes.xxl};
  font-weight: 500;
  color: ${({ theme }) => theme.text1};
  margin-bottom: 3rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;
const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  label {
    display: none;
  }

  input {
    background: ${({ theme }) => theme.bg_element2};
    outline: none;
    border: none;
    transition: 0.3s all ease-in-out;
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.text1};
    border-radius: 0.75rem;
    border: 0.1rem solid transparent;
    padding: 0.75rem 1rem;
    transition-duration: 0.2s;
    transition: 0.22s ease-in-out;

    &:focus {
      border-color: #6606ad;
    }

    &::placeholder {
      color: ${({ theme }) => theme.text4};
    }
  }
`;
const ErrorText = styled.p`
  color: #ff0060;
  margin: 0;
  margin-left: 0.3rem;
  font-size: 12px;
  font-weight: 400;
`;
const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.bg_main3};
  margin-top: 1rem;
  text-transform: uppercase;
  border-radius: 999px;
  font-weight: 500;
  font-size: 12px;
  padding-bottom: 16px;
  padding-top: 16px;
  transition-duration: 0.2s;
  transition: 0.22s ease-in-out;
  width: 100%;
  border: none;
  color: #efefef;
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
  }
`;
const SignUpWrap = styled.div`
  margin-top: 1rem;

  p {
    color: #8b8b8b;
    font-size: 12px;
    font-weight: 400;
    display: flex;
    gap: 0.5rem;
  }

  a {
    color: #6606ad;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Login;
