import React, { useState, useEffect, useContext, useRef } from 'react';
import { queryContext } from '../contexts/QueryContext'
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FileDrop from 'react-file-drop';
import AddIcon from "@material-ui/icons/Add"
import DeleteIcon from "@material-ui/icons/Delete"
var GifPlayer = require('react-gif-player')

const _calPercent = ({ percent, stage }) => {
  return stage === 'predict' ? percent / 2 : 50 + percent / 2
}
const Libarary = () => {
  const { queryLibrary, pageStatus, setPageStatus, upload, queryStatus } = useContext(queryContext);
  const isMobile = !useMediaQuery("(min-width:1000px)");
  const [results, setResults] = useState([]);
  const [selectedID, setSelectedID] = useState('');
  const [loadingPercent, setLoadingPercent] = useState(0)

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
    },
    cover: {
      position: 'absolute',
      top: 0, right: 0, width: `${100 - loadingPercent}%`, height: '100%',
      backgroundColor: 'rgba(16, 16, 16, 0.5)',
    },
    percent: {
      position: 'absolute',
      bottom: '5px', right: '5px',
    },
    selected: {
      border: 'solid 1px red'
    },
    delete: {
      color: '#fff',
      background: 'red',
      cursor: 'pointer'
    },
    addWrapper: {
      width: "100%",
      marginBottom: '3px',
      height: '15vh',
      background: 'rgba(255,255,255,0.1)',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: '1px solid rgba(176,176,185,1)',
      color: '#fff',
    },
    dragEnter: {
      border: '2px solid rgba(63, 156, 209, 1) !important',
      color: 'rgba(63, 156, 209, 1) !important',
    }
  });
  const classes = useStyles({});
  const uploader = useRef(null);
  const uploaderID = useRef(null);
  const ImgUploading = useRef("")

  const onMouseEnter = (id) => setSelectedID(id)
  const onMouseLeave = (id) => selectedID === id && setSelectedID("")
  const deleteGif = (id) => {
    setResults(results.filter(result => result.id !== id))
    // TODO: delete query
  }
  useEffect(() => {
    const query = async () => {
      queryLibrary().then(res => {
        if (res.status === 200) {
          setResults(res.data);
        }
      })
    }
    query()
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    console.log('bind again', results.length)
    const _finishUpload = () => {
      setResults([{ id: uploaderID.current, src: ImgUploading.current }, ...results])
      setPageStatus('show-library');
      ImgUploading.current = '';
      setLoadingPercent(0)
    }
    const _keepProcess = async id => {
      queryStatus(id).then(res => {
        if (res && res.status === 200) {
          const percent = _calPercent(res.data);
          setLoadingPercent(percent);
          percent === 100
            ? _finishUpload()
            : (function () { setLoadingPercent(percent); _keepProcess(id) }())
        } else {
          setPageStatus('fail-library')
        }
      })
    }
    const _upload = e => {
      console.log('xxx droped')
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        ImgUploading.current = reader.result;
        setPageStatus('upload-library');
        upload(reader.result).then(res => {
          // TODO: && res.data === ok
          if (res && res.status === 200) {
            const id = res.data;
            uploaderID.current = id;
            _keepProcess(id);
          } else {
            setPageStatus('fail-library')
          }
        })
      }, false);
      if (file) {
        reader.readAsDataURL(file);
      }
    }
    const Uploader = uploader.current || document.createElement('div');
    const onMouseEnter = e => {
      // console.log('xxxx', Uploader)
      Uploader.classList.add(classes.dragEnter)
      // console.log(Uploader.classList);
      return true;
    }
    const onMouseLeave = e => { Uploader.classList.remove(classes.dragEnter); return true }

    Uploader.addEventListener('drop', _upload);
    document.body.addEventListener('dragenter', onMouseEnter);
    document.body.addEventListener('dragleave', onMouseLeave);

    return () => {
      Uploader.removeEventListener('drop', _upload);
      document.body.removeEventListener('dragenter', onMouseEnter);
      document.body.removeEventListener('dragleave', onMouseLeave);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results])

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {pageStatus === 'upload-library'
          ? (
            <div className={classes.imgWrapper} >
              <GifPlayer gif={ImgUploading.current} autoplay />
              {loadingPercent < 100 && (
                <>
                  <div className={classes.cover} />
                  <div className={classes.percent}>{`${loadingPercent}%`}</div>
                </>
              )}
            </div>
          ) : (
            <FileDrop>
              <div className={classes.addWrapper} ref={uploader}>
                <AddIcon />
              </div>
            </FileDrop>
          )
        }
        {results.map((data) => {
          const isSelected = data.id === selectedID;
          return (
            <div className={`${classes.imgWrapper} ${isSelected ? classes.selected : ""}`} key={data.id} onMouseEnter={() => { onMouseEnter(data.id); return true; }} onMouseLeave={() => { onMouseLeave(data.id); return true }}>
              <GifPlayer gif={data.src} autoplay />
              {isSelected && <div style={{ position: 'absolute', top: 0, right: 0 }}><DeleteIcon classes={{ root: classes.delete }} onClick={() => deleteGif(data.id)} /></div>}
            </div>
          )
        })}
      </div>
    </div>)
};

export default Libarary;
