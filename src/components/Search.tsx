import React, { useState } from "react";
import Setting from "../containers/Setting";
import Results from "./Results";
const SearchPage: React.FC = () => {
  const [results, setResults]: any = useState([]);
  return (
    <>
      <Setting setResults={setResults}  />
      <Results results={results} setResults={setResults} />
    </>
  );
};

export default SearchPage;
