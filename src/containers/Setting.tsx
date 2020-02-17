import React, { useState } from "react";
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Consts
const images = [
  'https://lh3.googleusercontent.com/proxy/VokvQdHH9fR8COZUOrdnFPYIB63QiPXeR8Bo4leF1mPCDkWWCJF12mb6lH_m5ENPIditgcm8h_KQpwkaRupTkHawEEWo4QeSxb_ClinrH4YlxDUJcO4',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRGSpZe-XshtZ7V7d4XDaPX3tesALsvATRuANWm_u5SE_iU59C3',
  'https://img95.699pic.com/photo/50053/0716.jpg_wh300.jpg',

  // 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsQNVrDiy1hIUWpICIaziek6B8JlvXWLmWXdIPCIIu6UpZ0J3N',
  // 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwkc-7DUmV9xKxJ8K2w3MWZ96-vYfgrvf0-R6n3Kn2o5cNRpYS',
  // 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQeYoj5jxWBFDJ5mmz6JgJt2XiVDgdJG5jGZISjmh7lKzMr23mc',

  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSAjGs5INITjQag0tZllABICCMuvfNT2xFEPXeAcb2CrNpLh-yq',
  'https://up.enterdesk.com/edpic_360_360/90/0b/79/900b79210005e9d0216f2cffc9a4017c.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhPDRWlDb8TkK8ebwCSmyxojTDlKSK9_kqsZV5H9d3dqiMS2zi',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSfVQQtRw0p7MqTtmh6ZozJK257gpsebIeC3VEf-UDz4eQ2DCMa',
  'https://img95.699pic.com/photo/50078/8989.jpg_wh300.jpg',
  'https://lh3.googleusercontent.com/proxy/ZEf9YJTc13_8pmdnDzC26NF4VnGtcpRJpil-ng9ttepawZqU9xeTUtlCYlym1PpNRAzn_D1co0VVTYN9Kz-UAGilO5iqzrrOsBuA4eUwtcykwMln__NmKRm344w',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ZaqUxcBv22wpMn2b347FtrNT2MGWVAKvp20cafXVqvsRMsSi',
]

const Setting = (props: any) => {
  const isMobile = !useMediaQuery("(min-width:1000px)");
  const useStyles = makeStyles({
    setting: {
      position: "relative",
      minWidth: isMobile ? "auto" : "200px",
      padding: isMobile ? "20px" : "0 20px",
      borderWidth: "1px",
      color: "#E4E4E6",
      overflowY: "auto",
      backgroundColor: "#1F2023",
    },
    imageWrapper: {
      width: "100%",
      marginBottom: '5px',
      opacity: .5,
      borderRadius: '10px'
    },
    selectedImage: {
      border: 'solid 1px #e8e8f5',
      opacity: 1
    },
    topCover: {
      position: 'fixed',
      left: 0,
      top: `69.3px`,
      minWidth: '240px',
      height: '12%',
      pointerEvents: 'none',
      background: `linear-gradient( #1F2023,rgba(255,255,255,0))`,
    },
    bottomCover: {
      position: 'fixed',
      left: 0,
      bottom: `0`,
      minWidth: '240px',
      height: '12%',
      pointerEvents: 'none',
      background: `linear-gradient(rgba(255,255,255,0),#1F2023)`,

    },
  });
  const { setResults } = props;
  const [selectImag, setImage] = useState(images[Math.ceil(images.length / 2)]);
  const classes = useStyles({});

  const changeImg = (image: any) => {
    setImage(image)
    setResults([Math.random()])
  }
  return (
    <div className={classes.setting}>
      {images.map((image: any) => {
        const isSelected = image === selectImag;
        return (
          <div className={clsx(classes.imageWrapper, isSelected ? classes.selectedImage : "")} onClick={() => changeImg(image)}>
            <img style={{ width: '100%', borderRadius: '10px' }} src={image} alt="" />
          </div>
        )
      })}
      <div className={classes.topCover}></div>
      <div className={classes.bottomCover}></div>
    </div>
  );
};

export default Setting;
