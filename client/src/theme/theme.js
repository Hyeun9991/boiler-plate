const calcRem = (size) => `${size / 16}rem`;

export const fontSizes = {
  xs: calcRem(12),
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  titleSize: calcRem(50),
};

export const lightTheme = {
  bg_main1: '#f8f9fa',
  bg_main2: '#ffffff',
  bg_main3: '#6606ad',
  bg_element1: '#f0f1f3',
  bg_element2: '#f8f9fa',
  bg_element3: '#ffffff',
  bg_element4: '#dee2e6',
  text1: '#212529',
  text2: '#495057',
  text3: '#868e96',
  text4: '#ACACAC',
  border1: '#343a40',
  border2: '#ADB5BD',
  border4: '#F1F3F5',
  border3: '#DEE2E6',
};

export const darkTheme = {
  bg_main1: '#121212',
  bg_main2: '#121212',
  bg_main3: '#6606ad',
  bg_element1: '#1E1E1E',
  bg_element2: '#292929',
  bg_element3: '#2E2E2E',
  bg_element4: '#252525',
  text1: '#ECECEC',
  text2: '#D9D9D9',
  text3: '#ACACAC',
  text4: '#595959',
  border1: '#E0E0E0',
  border2: '#A0A0A0',
  border3: '#4D4D4D',
  border4: '#2A2A2A',
};

export const theme = {
  lightTheme,
  darkTheme,
  fontSizes,
};
