import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Flipper, Flipped } from "react-flip-toolkit";
import './style.css'
var GifPlayer = require('react-gif-player')
var shuffle = require('lodash.shuffle')
const genTestsRes = n => {
  const res = [];
  const images = [
    'https://pic.qqtn.com/up/2018-4/15238659447558805.gif',
    'https://hbimg.huabanimg.com/2a5381d828167b5c6e01b9ea7fa0b8ae2b84cc9b134b2-mMbXfh',
    'https://img.soogif.com/Kf8ElnjrIjEGNRBVYZ190SnPxhvJ9ZxF.gif',
    'https://img.soogif.com/',
    'https://hbimg.huabanimg.com/0a6e8fc9323a7f0ca061661ae14eb9ae8cff43c250fa-7khbpd',
    'https://img.soogif.com/dGSnM4ZKc0txTURKBBdGih6jdVlivrbc.gif',
    'https://uploadfile.huiyi8.com/2015/0613/20150613111341496.gif',
    'https://inews.gtimg.com/newsapp_match/0/3864668285/0',
    'https://spider.ws.126.net/875b83ad851dd6c1bcc71f01cdb95838.gif',

    'https://img95.699pic.com/photo/40114/6520.gif_wh860.gif',
    'https://img95.699pic.com/photo/40109/0951.gif_wh860.gif',
    'https://img95.699pic.com/photo/40102/0353.gif_wh860.gif',
    'https://hbimg.huabanimg.com/776843e2355b594490a39bdf37b73271e513325d1233f2-2f1vKk'

    // 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsQNVrDiy1hIUWpICIaziek6B8JlvXWLmWXdIPCIIu6UpZ0J3N',
    // 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwkc-7DUmV9xKxJ8K2w3MWZ96-vYfgrvf0-R6n3Kn2o5cNRpYS',
    // 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQeYoj5jxWBFDJ5mmz6JgJt2XiVDgdJG5jGZISjmh7lKzMr23mc',
  ]
  const distance = 100;
  for (let i = 0; i < n; i++) {
    res.push(
      {
        "distance": (distance - (i + 1)) / 100,
        "id": `${1581500222911524000}_${i}`,
        "image": images[i % images.length],
        key: i + 1
      }
    )
  }
  return res;
}

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
  const { results } = props;
  // const { results = [] } = props;
  const [testRes, setTestRes] = useState(genTestsRes(100))

  useEffect(() => {
    // setTimeout(() => {
    const first = testRes[0];
    const rest = shuffle(testRes.slice(1, testRes.length));
    setTestRes([first, ...rest])
    // }, 1000)
    const interval = setInterval(() => {
      const first = testRes[0];
      const rest = shuffle(testRes.slice(1, testRes.length));
      setTestRes([first, ...rest])
    }, 3000)
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
          {testRes.map((data, index) => (
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
