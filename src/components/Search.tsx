import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Setting from "../containers/Setting";
import Results from "./Results";
const SearchPage: React.FC = () => {
  const classes = makeStyles({
    root: {
      flexGrow: 1,
      display: "flex",
    }
  })()
  const [results, setResults]: any = useState([]);
  return (
    <div className={classes.root}>
      <Setting setResults={setResults} />
      <Results results={results} setResults={setResults} />
    </div>
  );
};

export default SearchPage;
