import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import QueryProvider from "./contexts/QueryContext";
import Setting from "./containers/Setting";
import SearchResults from "./components/VideoResults";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const App: React.FC = () => {
  const [results, setResults]: any = useState([]);
  const [loading, setLoading]: any = useState(false);

  const isMobile = !useMediaQuery("(min-width:1000px)");

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      background: "#1F2023",
      display: isMobile ? "block" : "flex",
      overflow: isMobile ? "auto" : "hidden"
    }
  });

  const classes = useStyles({});

  return (
    <QueryProvider>
      <div className={classes.root}>
        <Setting setResults={setResults} loading={loading} setLoading={setLoading} />
        <SearchResults results={results} />
        {loading && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              left: "0",
              top: "0",
              backgroundColor: "#000",
              opacity: 0.5
            }}
          ></div>
        )}
      </div>
    </QueryProvider>
  );
};

export default App;
