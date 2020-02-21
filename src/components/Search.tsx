import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Setting from "../containers/Setting";
import Results from "./Results";
const SearchPage: React.FC = () => {
  const isMobile = !useMediaQuery("(min-width:1000px)");

  const [results, setResults]: any = useState([]);
  return (
    <>
      <Setting setResults={setResults} />
      <Results results={results} setResults={setResults} />
    </>
  );
};

export default SearchPage;
