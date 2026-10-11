import { createContext, useContext, useMemo, useState } from "react";
import en from "../locales/en";
import ro from "../locales/ro";

const LanguageContext = createContext(null);

const dictionaries = {
  en,
  ro,
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem("shopflow_language") || "en";
  });

  const setLanguage = (newLanguage) => {
    if (!dictionaries[newLanguage]) return;

    setLanguageState(newLanguage);
    localStorage.setItem("shopflow_language", newLanguage);
  };

  const t = (key) => {
    const value = key.split(".").reduce((current, part) => {
      return current?.[part];
    }, dictionaries[language]);

    return value ?? key;
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}