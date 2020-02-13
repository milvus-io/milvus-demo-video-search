import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const _parseNum = num => {
  return num < 10 ? `0${num}` : num
}
const _parseTime = (time) => {
  const hour = Math.floor(time / 3600);
  const min = Math.floor((time - hour * 3600) / 60);
  const seconds = time % 60
  return `${_parseNum(hour)}:${_parseNum(min)}:${_parseNum(seconds)}`
}
const ResultHeader = props => {
  const { title, id, distance, path, time, video, style } = props;
  const useStyles = makeStyles({
    container: {
      width: "100%",
      display: "flex",
      alignItems: "start",
      ...style
    },
    id: {
      position: "relative",
      flex: "0 0 21%",
      paddingTop: "4%",
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
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
      justifyContent: "start",
      paddingLeft: '10px',
      alignItems: "center",
      color: "#fff",
      fontSize: "1vw",
    },
    label: {
      flexGrow: "1",
      height: "100%",
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      fontSize: "1vw",
      color: "#fff",
    },
    formula: {
      width: "70%",
      textAlign: "left"
    },
    distance: {
      textAlign: "left",
      wordWrap: "break-word",
      wordBreak: "break-all",
      width: "30%",
      marginRight: "20px"
    }
  });
  const classes = useStyles({});
  return (
    <div className={classes.container}>
      <div className={classes.id}>
        <p className={classes.child}>{title}</p>
      </div>
      <div className={classes.label}>
        <p className={classes.distance}>{distance}</p>
        <p className={classes.distance}>{id}</p>
        <p className={classes.distance}>{video}</p>
        <p className={classes.distance}>{_parseTime(time)}</p>
        <p className={classes.distance}>{path}</p>
      </div>
    </div>
  );
};

export default ResultHeader;
