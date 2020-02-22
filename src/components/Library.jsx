import React, { useState, useEffect, useContext, useRef } from 'react';
import FlipMove from 'react-flip-move';
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
// TODO: upload not work when upload once
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
      columnCount: 6,
      columnGap: '3px',
      position: 'relative',
    },
    imgWrapper: {
      width: '100%',
      display: 'block',
      position: 'relative',
      border: 'solid 1px transparent',
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
  });
  const classes = useStyles({});
  const uploader = useRef(null);
  const uploaderID = useRef(null);
  const ImgUploading = useRef("")

  const onMouseOver = (id) => setSelectedID(id)
  const onMouseLeave = (id) => selectedID === id && setSelectedID("")
  const deleteGif = (id) => {
    setResults(results.filter(result => result.id !== id))
    // TODO: delete query
  }

  useEffect(() => {
    const query = async () => {
      queryLibrary().then(res => {
        if (res.status === 200) {
          const newDatas = res.data;
          setResults(newDatas)
        }
      })
    }
    query()
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    const _finishUpload = () => {
      setPageStatus('show-library');
      ImgUploading.current = '';
      setLoadingPercent(0)
      setResults([{ id: uploaderID.current, src: ImgUploading.current }, ...results])
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
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        ImgUploading.current = reader.result;
        setPageStatus('upload-library');
        upload(reader.result).then(res => {
          // TODO: && res.data === ok
          if (res && res.status === 200) {
            const id = res.data + Math.random().toString();
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
    const _onMouseEnter = e => {
      Uploader.classList.add('drag-enter')
      return true;
    }
    const _onMouseLeave = e => { Uploader.classList.remove('drag-enter'); return true }
    Uploader.addEventListener('drop', _upload);
    Uploader.addEventListener('dragenter', _onMouseEnter);
    Uploader.addEventListener('dragleave', _onMouseLeave);
    return () => {
      Uploader.removeEventListener('drop', _upload);
      Uploader.removeEventListener('dragenter', _onMouseEnter);
      Uploader.removeEventListener('dragleave', _onMouseLeave);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, setResults])

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {
          pageStatus === 'upload-library'
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
        <FlipMove duration={500}>
          {results.map((data) => {
            const isSelected = data.id === selectedID;
            return (
              <div className={`${classes.imgWrapper} ${isSelected ? classes.selected : ""}`}
                key={data.id} onMouseOver={() => { onMouseOver(data.id); return true; }} onMouseLeave={() => { onMouseLeave(data.id); return true }}>
                <GifPlayer gif={data.src} autoplay />
                {isSelected && <div style={{ position: 'absolute', top: 0, right: 0 }}><DeleteIcon classes={{ root: classes.delete }} onClick={() => deleteGif(data.id)} /></div>}
              </div>
            )
          })}
        </FlipMove>
      </div>
    </div>)
};

export default Libarary;
