import {ReactNode, createContext, useContext, useState} from 'react';

type ThemeProviderProps = {
  children: ReactNode;
};

type ThemeContextValues = {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
};

const ThemeContext = createContext<ThemeContextValues>({
  theme: 'light',
  setTheme: () => null,
});

const ThemeProvider = ({children}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleSetTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  return useContext(ThemeContext);
};

export {ThemeProvider};
export default useTheme;
