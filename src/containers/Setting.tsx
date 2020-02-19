import React, { useState } from "react";
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DeleteIcon from "@material-ui/icons/Delete"


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
      position: "relative",
    },
    selectedImage: {
      border: '1px solid rgba(255,255,255,1)',
      opacity: 1
    },
    topCover: {
      position: 'fixed',
      left: 0,
      top: `50px`,
      minWidth: '290px',
      height: '15%',
      pointerEvents: 'none',
      background: `linear-gradient( #1F2023,rgba(255,255,255,0))`,
    },
    delete: {
      color: '#fff',
      background: 'red',
      cursor: 'pointer'
    }
  });
  const { searchParams, setSelectedImage, setSearchParams } = props;
  const { history, curr } = searchParams
  const classes = useStyles({});
  const [deleteID, setDeleteID] = useState('');

  const changeImg = (image: any) => {
    setSelectedImage(image)
  }
  const setDeleteGif = (src: string) => {
    setSearchParams({ ...searchParams, history: searchParams.history.filter((t: string) => t !== src) })
  }
  return (
    <div className={classes.setting}>
      {history.map((image: any, index: number) => {
        const isSelected = image === curr;
        const isDelete = deleteID === image
        return (
          <div key={index} className={clsx(classes.imageWrapper, isSelected ? classes.selectedImage : "")} onClick={() => changeImg(image)} onMouseEnter={() => setDeleteID(image)}>
            <img style={{ width: '100%' }} src={image} alt="" />
            {isDelete && <div style={{ position: 'absolute', top: 0, right: 0 }}><DeleteIcon classes={{ root: classes.delete }} onClick={() => setDeleteGif(image)} /></div>}
          </div>
        )
      })}
      <div className={classes.topCover}></div>
    </div>
  );
};

export default Setting;
