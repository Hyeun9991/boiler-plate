import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions';
import { useNavigate } from 'react-router-dom';

export default function Auth(SpecificComponent, option, adminRoute = null) {
  /**
   * [option]
   * null: 아무나 출입이 가능한 페이지 / Ex) Lading Page, About Page
   * true: 로그인한 유저만 출입이 가능한 페이지 / Ex) Detail Page
   * false: 로그인한 유저는 출입이 불가능한 페이지 / Ex) Register Page, Login Page
   *
   * [adminRoute]
   * adminRoute = true: 관리자만 진입 가능한 페이지 / Ex) Admin Page
   */

  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        // console.log('hoc auth', response);

        // 로그인 하지 않은 상태, isAuth = false
        if (!response.payload.isAuth) {
          // 로그인 한 유저만 들어갈 수 있는 페이지에 접근했을 때, option = true
          if (option) {
            navigate('/login');
          }
        } else {
          // 로그인 한 상태, isAuth = true

          // isAdmin = false인 로그인 한 유저가 admin 페이지에 접근했을 때
          if (adminRoute && !response.payload.isAdmin) {
            navigate('/');
          } else {
            // 로그인 한 유저가 출입 불가능한 페이지에 접근했을 때
            if (!option) {
              navigate('/');
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
