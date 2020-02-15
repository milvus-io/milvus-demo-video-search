import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import QueryProvider from "./contexts/QueryContext";
import Setting from "./containers/Setting";
import Results from "./components/Results";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Logo from "./Logo.svg";


const App: React.FC = () => {
  const [results, setResults]: any = useState([]);
  const [loading, setLoading]: any = useState(false);

  const isMobile = !useMediaQuery("(min-width:1000px)");

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "#1F2023",
      height: '100vh',
      overflow: 'hidden',
    },
    logo: {
      paddingLeft: '30px'
    },
    content: {
      display: isMobile ? 'block' : "flex",
      flexGrow: 1,
      height: 'calc(100% - 69.3px)',
    }
  });

  const classes = useStyles({});

  return (
    <QueryProvider>
      <div className={classes.root}>
        <div>
          <img className={classes.logo} src={Logo} width="150px" alt="logo" />
        </div>
        <div className={classes.content}>
          <Setting setResults={setResults} loading={loading} setLoading={setLoading} />
          <Results results={results} />
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
      </div>
    </QueryProvider>
  );
};

export default App;
