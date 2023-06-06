import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/themeProvider';
import { GlobalStyle } from './theme/GlobalStyle';
import Auth from './hoc/auth';
import Landing from './components/views/Landing/Landing';
import Login from './components/views/RegisterLogin/Login';
import Register from './components/views/RegisterLogin/Register';

function App() {
  /**
   * client>src>hoc>auth.js
   *
   * [option]
   * null: 아무나 출입이 가능한 페이지 / Ex) Lading Page, About Page
   * true: 로그인한 유저만 출입이 가능한 페이지 / Ex) Detail Page
   * false: 로그인한 유저는 출입이 불가능한 페이지 / Ex) Register Page, Login Page
   *
   * [adminRoute]
   * adminRoute = true: 관리자만 진입 가능한 페이지 / Ex) Admin Page
   * const AuthenticAdminPage = Auth(Admin, null, true);
   */
  const AuthenticLandingPage = Auth(Landing, null);
  const AuthenticLoginPage = Auth(Login, false);
  const AuthenticRegisterPage = Auth(Register, false);

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<AuthenticLandingPage />} />
        <Route path="/login" element={<AuthenticLoginPage />} />
        <Route path="/register" element={<AuthenticRegisterPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
