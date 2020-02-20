import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { Flipper, Flipped } from "react-flip-toolkit";
import './style.css'
var GifPlayer = require('react-gif-player')
var shuffle = require('lodash.shuffle')


const Results = props => {
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

  useEffect(() => {
    // const interval = setInterval(() => {
    //   if (results.length) {
    //     const first = results[0];
    //     const rest = shuffle(results.slice(1, results.length));
    //     setResults([first, ...rest])
    //   }
    // }, 50000)
    // return () => {
    //   clearInterval(interval)
    // }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {/* <Flipper flipKey={Math.random()} staggerConfig={{
          default: {
            reverse: false,
            speed: .001
          },
        }}> */}
        <TransitionGroup>
          {results.map((data, index) => (
            <CSSTransition
              key={data.id}
              timeout={1000}
              in={!!results.length}
              unmountOnExit
              classNames="transition-image">
              {/* <Flipped key={data.id} flipId={data.id}> */}
              <div className={clsx(classes.imgWrapper, index === 0 ? 'best' : '')}>
                <GifPlayer gif={data.image} autoplay />
                <div className={classes.info}>
                  <h3>{data.key}</h3>
                  <p>{data.distance}</p>
                </div>
              </div>
              {/* </Flipped> */}
            </CSSTransition>
          ))}
        </TransitionGroup>
        {/* </Flipper> */}
      </div>
    </div>
  );
};

export default Results;
