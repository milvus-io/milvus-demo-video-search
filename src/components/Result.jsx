import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const _parseNum = num => {
  return num < 10 ? `0${num}` : num
}
const _parseTime = (time) => {
  const hour = Math.floor(time / 3600);
  const min = Math.floor((time - hour * 3600) / 60);
  const seconds = time % 60
  return `${_parseNum(hour)}:${_parseNum(min)}:${_parseNum(seconds)}`
}
const Result = props => {
  const isMobile = !useMediaQuery("(min-width:1000px)");
  const { distance, id, image, path, time, video, style, onClick } = props;
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
      marginRight: "20px",
      cursor: "pointer"
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
      display: isMobile ? 'block' : "flex",
      justifyContent: "start",
      alignItems: "center",
      fontSize: isMobile ? "auto" : "1vw",
      color: "#fff"
    },
    distance: {
      wordWrap: "break-word",
      wordBreak: "break-all",
      width: isMobile ? "20%" : "30%",
      marginBottom: isMobile ? '10px' : '0px',
      marginRight: isMobile ? '0px' : '20px'

    },
    icon: {
      position: "absolute",
      bottom: "10px",
      right: "10px"
    }
  });
  const classes = useStyles({});
  const src = `data:image/png;base64, ${image}`
  return (
    <div className={classes.container}>
      <div className={classes.structure}>
        <img src={src} className={classes.child} alt="" onClick={onClick} />
        <ZoomInIcon className={classes.icon} />
      </div>
      <div className={classes.label}>
        <p className={classes.distance}><b>{distance}</b></p>
        <p className={classes.distance}>{id}</p>
        <p className={classes.distance}>{video}</p>
        <p className={classes.distance}>{_parseTime(time)}</p>
        <p className={classes.distance}>{path}</p>
      </div>
    </div>
  );
};

export default Result;
