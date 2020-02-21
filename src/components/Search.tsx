import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Setting from "../containers/Setting";
import Results from "./Results";
const SearchPage: React.FC = () => {
  const isMobile = !useMediaQuery("(min-width:1000px)");
  const classes = makeStyles({
    content: {
      display: isMobile ? 'block' : "flex",
      flexGrow: 1,
      height: 'calc(100% - 50px)',
    }
  })();
  const [results, setResults]: any = useState([]);
  return (
    <div className={classes.content}>
      <Setting setResults={setResults} />
      <Results results={results} setResults={setResults} />
    </div>
  );
};

export default SearchPage;
