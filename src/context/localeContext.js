import React, { createContext, useState } from "react";

export const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const localeState = useState("en");

  return <LocaleContext.Provider value={localeState}>{children}</LocaleContext.Provider>;
};
