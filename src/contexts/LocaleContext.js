import { createContext, useContext, useState } from "react";

const LocaleContext = createContext();

export function LocaleProvider({ defValue, children }) {
  const [locale, setLocale] = useState(defValue);
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const { locale } = useContext(LocaleContext);
  return locale;
}

export function useSetLocale() {
  const { setLocale } = useContext(LocaleContext);
  return setLocale;
}

export default LocaleContext;
