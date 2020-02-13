import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carousel, { Modal, ModalGateway } from "react-images";
import ResultHeader from "./ResultHeader";
import Result from "./Result";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const TITLE = `Search Results`
const SearchResults = props => {
  const isMobile = !useMediaQuery("(min-width:1000px)");
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      overflowX: "hidden",
      overflowY: "auto",
      padding: isMobile ? "10px" : "80px 60px",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#28292E"
    },
    title: {
      margin: "20px 0px 10px",
      fontSize: "20px",
      color: "#F5F5F5"
    },
    subTitle: {
      fontSize: "15px",
      color: "#F1F1F1",
      marginBottom: "１0px !important"
    }
  });
  const classes = useStyles({});
  const { results = [] } = props;
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const _openLightbox = useCallback(index => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const _closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  // const testsRes = [
  //   {
  //     "distance": 0,
  //     "id": 1581500222911524000,
  //     "imgUrl": "http://localhost:9000/tmp/2ff8896f-32cf-42b3-b515-1e48a4e43d2c/output11.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=minioadmin%2F20200212%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200212T095250Z&X-Amz-Expires=460800&X-Amz-SignedHeaders=host&X-Amz-Signature=734c947e3c306c795701fcdfde05a6da127040cff7cc04c16121b391887839b7",
  //     "path": "/test1",
  //     "time": 11,
  //     "video": "dt.flv"
  //   }
  // ]

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <h3 className={classes.title}>{TITLE}</h3>
      </div>
      {!isMobile && (
        <ResultHeader
          title={"Picture"}
          id={"ID"}
          distance={"Distance"}
          path={'Path'}
          time={'Time'}
          video={'Video'}
          style={{ backgroundColor: "#000" }}
        />
      )}
      {results.length === 0 && <div></div>}
      <>
        {results.map((data, index) => {
          return (
            <Result
              {...data}
              key={index}
              onClick={() => _openLightbox(index)}
              style={{ backgroundColor: index % 2 ? "#323338" : "#28292e" }}
            />
          );
        })}
      </>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={_closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={results.map(_r => { return { src: `data:image/png;base64, ${_r.image}` } })}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};

export default SearchResults;
