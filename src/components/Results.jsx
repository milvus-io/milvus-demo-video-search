import React, { useEffect, useRef, useContext } from "react";
import SettingsIcon from "@material-ui/icons/Settings"
import { queryContext } from '../contexts/QueryContext'
import FlipMove from 'react-flip-move';
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import './style.css'
var GifPlayer = require('react-gif-player')
var shuffle = require('lodash.shuffle')

const Results = props => {
  const { searchParams } = useContext(queryContext)
  const { results, setResults } = props;
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
      columnCount: 5,
      columnGap: '3px',
      position: 'relative',
    },
    imgWrapper: {
      width: '100%',
      display: 'block',
      position: 'relative',
      marginBottom: '3px',
      opacity: 0.75
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
  const classes = useStyles({});

  const isSearchChange = useRef(true);
  useEffect(() => {
    let timeout;
    if (isSearchChange.current) {
      isSearchChange.current = false;
      timeout = setTimeout(() => {
        setResults(shuffle(results));
      }, 1500)
    }
    return () => {
      clearTimeout(timeout);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  useEffect(() => {
    isSearchChange.current = true;
  }, [searchParams.curr])
  return (
    <div className={classes.root}>
      {results.length === 0
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
            <FlipMove duration={500}>
              {results.map((data, index) => {
                return (
                  <div className={clsx(classes.imgWrapper, index === 0 ? 'best' : '')} key={data.name}>
                    <GifPlayer gif={data.data} autoplay />
                    <div className={classes.info}>
                      <p>{data.distance.toFixed(5)}</p>
                    </div>
                  </div>
                )
              })}
            </FlipMove>
            {results.length < 5 && (
              <>
                {new Array(6 - results.length).fill(1).map((i, index) => {
                  return <div key={`key${index}`} className={classes.imgWrapper} style={{ visibility: 'hidden', height: '300px' }}></div>
                })}
              </>
            )}
          </div>
        )
      }
    </div>
  );
};

export default Results;
