import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { queryContext } from '../contexts/QueryContext'
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Link } from 'react-router-dom'
import CircularProgress from "@material-ui/core/CircularProgress"
import FileDrop from 'react-file-drop';
import Logo from "../logo.svg";
import AddCircleIcon from "@material-ui/icons/AddCircle"
import SearchIcon from "@material-ui/icons/Search"
import DeleteIcon from "@material-ui/icons/Delete"
var GifPlayer = require('react-gif-player')

const Libarary = () => {
  const { queryLibrary, upload } = useContext(queryContext);
  const isMobile = !useMediaQuery("(min-width:1000px)");
  const useStyles = makeStyles({
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    icon: {
      paddingRight: '30px',
      color: '#000'
    },
    logo: {
      paddingLeft: '30px',
    },
    contentRoot: {
      flexGrow: 1,
      overflowX: "hidden",
      overflowY: "auto",
      padding: isMobile ? "10px" : "50px",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#FAFAFA"
    },
    uploaderContainer: {
      position: "absolute",
      width: "100%",
      height: "100%",
      left: "0",
      top: "0",
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 1000,
      background: 'transparent'
    },
    desc: {
      flexGrow: 1,
      textAlign: 'center',
      paddingTop: '35%',
    },
    customSearchIcon: {
      fontSize: '3.5rem',
    },
    selected: {
      border: 'solid 1px red'
    },
    delete: {
      color: '#fff',
      background: 'red',
      cursor: 'pointer'
    }
  });
  const classes = useStyles({});
  const [results, setResults] = useState([]);
  const [isShowSearchWrapper, setShowSearchWrapper] = useState(false);
  const [selectedID, setSelectedID] = useState('');
  const [uploading, setUploading] = useState({ loading: false, percent: 0 })

  const searchWrapper = useRef(null);
  const percent = useRef(0);

  const showUploader = useCallback((e) => {
    if (!isShowSearchWrapper) {
      setShowSearchWrapper(true);
    }
    const setClassList = (node) => {
      if (node) {
        const target = node || document.createElement('div');
        target.contains(e.target)
          ? target.classList.add('selected-wrapper')
          : target.classList.remove('selected-wrapper');
      }
    }
    setClassList(searchWrapper.current);
  }, [isShowSearchWrapper])

  const onMouseEnter = (id) => setSelectedID(id)
  const deleteGif = (id) => {
    setResults(results.filter(result => result.id !== id))
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
    const _upload = e => {
      const file = e.dataTransfer.files[0];
      console.log(e, file)
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        setUploading({ loading: true, percent: 0 })
        const interval = setInterval(() => {
          if (percent.current + 10 > 100) {
            clearInterval(interval)
            setUploading({ loading: false, percent: 0 });
            setShowSearchWrapper(false);
            percent.current = 0;
            setResults([{ id: Math.ceil(Math.random() * 100) + 1000, src: reader.result }, ...results])
          } else {
            percent.current = percent.current + 10;
            setUploading(uploading => { return { loading: true, percent: uploading.percent + 10 } })
          }
        }, 500)
      }, false);
      if (file) {
        reader.readAsDataURL(file);
      }


    }
    document.body.addEventListener('dragenter', showUploader)
    const Search = searchWrapper.current || document.createElement('div');
    Search.addEventListener('drop', _upload);
    return () => {
      document.body.removeEventListener('dragenter', showUploader)
      Search.removeEventListener('drop', _upload);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowSearchWrapper])
  return (
    <div className={classes.root}>
      <div className={classes.nav}>
        <img className={classes.logo} src={Logo} width="150px" alt="logo" />
        <h3>VIDEO LIBRARY</h3>
        <Link to='/'><div className={classes.icon} onClick={() => { }}>
          <SearchIcon />
        </div>
        </Link>
      </div>
      <div className={classes.contentRoot}>
        <div className='root-container'>
          {results.map((data) => {
            const isSelected = data.id === selectedID;
            return (
              <>
                <div className={`img-container ${isSelected ? classes.selected : ""}`} key={data.id} onMouseEnter={() => onMouseEnter(data.id)}>
                  <GifPlayer gif={data.src} autoplay />
                  {isSelected && <div style={{ position: 'absolute', top: 0, right: 0 }}><DeleteIcon classes={{ root: classes.delete }} onClick={() => deleteGif(data.id)} /></div>}
                </div>
              </>
            )
          })}
        </div>
      </div>
      {isShowSearchWrapper && (
        <div className={`${classes.uploaderContainer} uploader-container`}>
          <div className='uploader-wrapper' ref={searchWrapper}>
            <FileDrop onDrop={() => { }}>
              <div className={classes.desc}>
                {uploading.loading ? (
                  <>
                    <CircularProgress variant="static" value={uploading.percent} />
                    <p>{`uploaded ${uploading.percent}%`}</p>
                  </>)
                  : <><AddCircleIcon classes={{ root: classes.customSearchIcon }} />
                    <p>drop here to upload</p></>}

              </div>
            </FileDrop>
          </div>
        </div>
      )}
    </div>
  );
};

export default Libarary;
