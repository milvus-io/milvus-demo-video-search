import React, { useState, useEffect, useRef } from "react";
import SettingsIcon from "@material-ui/icons/Settings"
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import './style.css'
import Masonry from 'react-masonry-component';

var GifPlayer = require('react-gif-player')

const masonryOptions = {
  transitionDuration: 500
};
const Results = props => {
  const { results } = props;
  const [renderResults, setResults] = useState([])
  const isMobile = !useMediaQuery("(min-width:1000px)");
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      overflowX: "hidden",
      overflowY: "auto",
      padding: isMobile ? "10px" : "20px",
      display: "flex",
      flexDirection: results.length ? "column" : "row",
      color: '#fff'
    },
    container: {
      width: '100%',
      position: 'relative',
    },
    imgWrapper: {
      width: '19.5%',
      minHeight: '40px',
      display: 'block',
      position: 'relative',
      opacity: 0.75,
      border: 'solid 1px transparent',
    },
    info: {
      position: 'absolute',
      left: 0,
      top: 0,
      background: 'transparent',
      zIndex: 10,
      padding: '10px',
      color: '#fff',
      textShadow: `black 0.1em 0.1em 0.2em`
    }
  });
  const indexRef = useRef(0)
  const classes = useStyles({});
  const _loadNewImages = () => {
    if (indexRef.current < results.length && indexRef.current % 5 === 0) {
      setResults(results.slice(indexRef.current + 5))
    }
  }

  useEffect(() => {
    indexRef.current = 0;
    _loadNewImages();
  }, [results])
  return (
    <div className={classes.root}>
      {renderResults.length === 0
        ? (
          <div style={{
            fontFamily: `Roboto-Regular,Roboto`,
            fontWeight: 400,
            color: `rgba(250,250,250,1)`
          }}>
            <p style={{ marginBottom: '20px' }}>To search, drop an image or video file.</p>
            <div style={{
              display: `flex`,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <p>Click</p>&nbsp;
              <SettingsIcon />&nbsp;
              <p>to see all videos in the library</p>
            </div>
          </div>
        )
        : (
          <div className={classes.container}>
            <Masonry
              className={''} // default ''
              elementType={'div'} // default 'div'
              options={masonryOptions} // default {}
              disableImagesLoaded={false} // default false
              updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              imagesLoadedOptions={{}} // default {}
            >
              {renderResults.map((data, index) => {
                return (
                  <div className={clsx(classes.imgWrapper, index === 0 ? 'best' : '')} key={data.name}>
                    <GifPlayer gif={data.data} autoplay onLoad={() => { indexRef.current += 1; _loadNewImages() }} />
                    <div className={classes.info}>
                      <p>{(data.distance || 1.001).toFixed(5)}</p>
                    </div>
                  </div>
                )
              })}
            </Masonry>
          </div>
        )
      }
    </div>
  );
};

export default Results;
