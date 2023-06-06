import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ThemeToggle from './../ThemeToggle';
import { useTheme } from '../../context/themeProvider';

const Layout = ({ children }) => {
  const [ThemeMode, toggleTheme] = useTheme();

  return (
    <div>
      <Header />
      <ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
        DarkMode
      </ThemeToggle>
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
