import React, { useEffect } from "react";
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
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
      backgroundColor: "#28292E"
    },
  });
  const classes = useStyles({});
  const { results, setResults } = props;
  useEffect(() => {
    const interval = setInterval(() => {
      if (results.length) {
        const first = results[0];
        const rest = shuffle(results.slice(1, results.length));
        setResults([first, ...rest])
      }
    }, 50000)
    return () => {
      clearInterval(interval)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);
  return (
    <div className={classes.root}>
      <div className='root-container'>
        <Flipper flipKey={Math.random()} staggerConfig={{
          default: {
            reverse: false,
            speed: .001
          },
        }}>
          {results.map((data, index) => (
            <Flipped key={data.id} flipId={data.id}>
              <div className={clsx('img-container', index === 0 ? 'best' : '')}>
                <GifPlayer gif={data.image} autoplay />
                <div className='info'>
                  <h3>{data.key}</h3>
                  <p>{data.distance}</p>
                </div>
              </div>
            </Flipped>
          ))}
        </Flipper>
      </div>
    </div>
  );
};

export default Results;
