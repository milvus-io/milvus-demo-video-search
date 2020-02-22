import React, { useEffect, useRef, useContext } from "react";
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
  const isMobile = !useMediaQuery("(min-width:1000px)");
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      overflowX: "hidden",
      overflowY: "auto",
      padding: isMobile ? "10px" : "20px",
      display: "flex",
      flexDirection: "column",
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
    }
  });
  const classes = useStyles({});
  const { results, setResults } = props;

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
      </div>
    </div>
  );
};

export default Results;
