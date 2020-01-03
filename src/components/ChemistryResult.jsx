import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const Result = props => {
  const { src, Molecular, Distance, style } = props;
  const useStyles = makeStyles({
    container: {
      width: "100%",
      display: "flex",
      alignItems: "start",
      marginBottom: "15px",
      ...style
    },
    structure: {
      position: "relative",
      flex: "0 0 21%",
      paddingTop: "20%",
      border: "solid 1px #60606F",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "50px",
      marginRight: "20px"
    },
    child: {
      width: "100%",
      maxHeight: "100%",
      position: "absolute",
      top: `0`,
      bottom: `0`,
      margin: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#60606F",
      fontSize: "8vw"
    },
    label: {
      flexGrow: "1",
      height: "100%",
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      fontSize: "1vw",
      color: "#fff"
    },
    formula: {
      width: "70%"
    },
    distance: {
      width: "30%"
    }
  });
  const classes = useStyles({});
  return (
    <div className={classes.container}>
      <div className={classes.structure}>
        <img src={src} className={classes.child} alt="" />
      </div>
      <div className={classes.label}>
        <p className={classes.formula}>{Molecular}</p>
        <p className={classes.distance}>{Distance}</p>
      </div>
    </div>
  );
};

export default Result;
