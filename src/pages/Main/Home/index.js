import React, { useState, useContext } from "react";
import { LocaleContext } from "../../../context/localeContext";

const Home = ({ history }) => {
  const [test, setTest] = useState("test");
  const [locale, setLocale] = useContext(LocaleContext);

  console.log("render Home page");
  return (
    <div>
      Home Page
      {/* <LocaleContext.Consumer>
        {([locale, setLocale]) => {
          console.log("render locale consumer");
          return ( */}
      <div>
        <button type="button" onClick={() => setLocale("es")}>
          Change Locale
        </button>
        {locale}
      </div>
      {/* );
        }}
      </LocaleContext.Consumer> */}
      <button
        type="button"
        onClick={() => {
          history.push("/");
        }}>
        Got To Login Page
      </button>
      <div>{test}</div>
      <button
        type="button"
        onClick={() => {
          setTest("updated test");
        }}>
        rerender component
      </button>
    </div>
  );
};

export default Home;
