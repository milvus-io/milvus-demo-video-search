import React from "react";
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";


const Setting = (props: any) => {
  const isMobile = !useMediaQuery("(min-width:1000px)");
  const useStyles = makeStyles({
    setting: {
      position: "relative",
      minWidth: isMobile ? "auto" : "250px",
      padding: isMobile ? "20px" : "0 20px",
      borderWidth: "1px",
      color: "#E4E4E6",
      overflowY: "auto",
      backgroundColor: "#1F2023",
    },
    imageWrapper: {
      width: "100%",
      marginBottom: '5px',
      opacity: .3,
    },
    selectedImage: {
      border: '1px solid rgba(255,255,255,1)',
      opacity: 1
    },
    topCover: {
      position: 'fixed',
      left: 0,
      top: `66px`,
      minWidth: '290px',
      height: '15%',
      pointerEvents: 'none',
      background: `linear-gradient( #1F2023,rgba(255,255,255,0))`,
    },
  });
  const { searchParams, setSelectedImage } = props;
  const { history, curr } = searchParams
  const classes = useStyles({});

  const changeImg = (image: any) => {
    setSelectedImage(image)
  }
  return (
    <div className={classes.setting}>
      {history.map((image: any, index: number) => {
        const isSelected = image === curr;
        return (
          <div key={index} className={clsx(classes.imageWrapper, isSelected ? classes.selectedImage : "")} onClick={() => changeImg(image)}>
            <img style={{ width: '100%' }} src={image} alt="" />
          </div>
        )
      })}
      <div className={classes.topCover}></div>
    </div>
  );
};

export default Setting;
