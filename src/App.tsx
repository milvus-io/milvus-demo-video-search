import React, { useState, useEffect, useRef, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import QueryProvider from "./contexts/QueryContext";
import Setting from "./containers/Setting";
import Results from "./components/Results";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Logo from "./Logo.svg";
import SearchIcon from "@material-ui/icons/Search"
import CircularProgress from '@material-ui/core/CircularProgress';
import AddCirclesIcon from "@material-ui/icons/AddCircle"
import { FaQuestionCircle, FaCheck } from "react-icons/fa";
import FileDrop from 'react-file-drop';
// import axios from 'axios'
import './App.css'

const Images = [
  'https://lh3.googleusercontent.com/proxy/VokvQdHH9fR8COZUOrdnFPYIB63QiPXeR8Bo4leF1mPCDkWWCJF12mb6lH_m5ENPIditgcm8h_KQpwkaRupTkHawEEWo4QeSxb_ClinrH4YlxDUJcO4',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRGSpZe-XshtZ7V7d4XDaPX3tesALsvATRuANWm_u5SE_iU59C3',
  'https://img95.699pic.com/photo/50053/0716.jpg_wh300.jpg',

  // 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsQNVrDiy1hIUWpICIaziek6B8JlvXWLmWXdIPCIIu6UpZ0J3N',
  // 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwkc-7DUmV9xKxJ8K2w3MWZ96-vYfgrvf0-R6n3Kn2o5cNRpYS',
  // 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQeYoj5jxWBFDJ5mmz6JgJt2XiVDgdJG5jGZISjmh7lKzMr23mc',

  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSAjGs5INITjQag0tZllABICCMuvfNT2xFEPXeAcb2CrNpLh-yq',
  'https://up.enterdesk.com/edpic_360_360/90/0b/79/900b79210005e9d0216f2cffc9a4017c.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhPDRWlDb8TkK8ebwCSmyxojTDlKSK9_kqsZV5H9d3dqiMS2zi',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSfVQQtRw0p7MqTtmh6ZozJK257gpsebIeC3VEf-UDz4eQ2DCMa',
  'https://img95.699pic.com/photo/50078/8989.jpg_wh300.jpg',
  'https://lh3.googleusercontent.com/proxy/ZEf9YJTc13_8pmdnDzC26NF4VnGtcpRJpil-ng9ttepawZqU9xeTUtlCYlym1PpNRAzn_D1co0VVTYN9Kz-UAGilO5iqzrrOsBuA4eUwtcykwMln__NmKRm344w',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ZaqUxcBv22wpMn2b347FtrNT2MGWVAKvp20cafXVqvsRMsSi',
]
const App: React.FC = () => {
  const [showQuestion, setQuestion] = useState(true)

  const [images, setImages]: any = useState(Images)
  const [selectImag, setImage] = useState(images[Math.ceil(images.length / 2)]);
  const [results, setResults]: any = useState([]);
  const [isShowUpLoader, setShowUpLoader] = useState(false);
  const [uploading, setIsUpLoading]: any = useState({
    loading: false,
    percent: 0
  });

  const isMobile = !useMediaQuery("(min-width:1000px)");
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "#1F2023",
      height: '100vh',
      overflow: 'hidden',
      position: 'relative'
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    icon: {
      paddingRight: '30px',
      color: '#fff'
    },
    logo: {
      paddingLeft: '30px',
    },
    content: {
      display: isMobile ? 'block' : "flex",
      flexGrow: 1,
      height: 'calc(100% - 69.3px)',
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
      color: '#000'
    },
    customIcon: {
      fontSize: '3.5rem',
    }
  });

  const classes = useStyles({});
  const searchWrapper = useRef(null);
  const uploadWrapper = useRef(null);
  const percent = useRef(0);

  const onMouseEnter = (e: any) => setQuestion(false);
  const onMouseLeave = (e: any) => setQuestion(true)
  const showUploader = useCallback((e: any) => {
    if (!isShowUpLoader) {
      setShowUpLoader(true);
    }
    const setClassList = (node: any) => {
      if (node) {
        const target = node || document.createElement('div');
        target.contains(e.target)
          ? target.classList.add('selected-wrapper')
          : target.classList.remove('selected-wrapper');
      }
    }
    setClassList(searchWrapper.current);
    setClassList(uploadWrapper.current);
  }, [isShowUpLoader])

  useEffect(() => {
    const search = (e: any) => {
      var file = e.dataTransfer.files[0]
      const reader = new FileReader();
      reader.addEventListener("loadstart", (e: any) => {
        setShowUpLoader(false);
      })
      reader.addEventListener("progress", (e: any) => {
        const { loaded, total } = e;
        console.log(loaded / total);
      })
      reader.addEventListener("load", function () {
        const index = images.indexOf(selectImag);
        images.splice(index + 1, 0, reader.result)
        setImages(images)
        setImage(reader.result)
        setResults([Math.random()])
      }, false);
      if (file) {
        reader.readAsDataURL(file);
      }
    }

    const upload = (e: any) => {
      var file = e.dataTransfer.files[0]
      var form = new FormData();
      form.append(file.name, file);
      setIsUpLoading({ loading: true, percent: 0 })
      const interval = setInterval(() => {
        percent.current >= 100
          ? (function () { setShowUpLoader(false); clearInterval(interval); setIsUpLoading({ loading: false, percent: 0 }); percent.current = 0;})()
          : setIsUpLoading((uploading: any) => { percent.current = uploading.percent + 10; return { loading: true, percent: uploading.percent + 10 } })
      }, 500)
    }
    document.body.addEventListener('dragenter', showUploader)
    const Search = searchWrapper.current || document.createElement('div');
    Search.addEventListener('drop', search);
    const Upload = uploadWrapper.current || document.createElement('div');
    Upload.addEventListener('drop', upload)
    return () => {
      document.body.removeEventListener('dragenter', showUploader)
      Search.removeEventListener('drop', search);
      Upload.removeEventListener('drop', upload)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowUpLoader, uploading.loading])

  return (
    <QueryProvider>
      <div className={classes.root}>
        <div className={classes.nav}>
          <img className={classes.logo} src={Logo} width="150px" alt="logo" />
          <div className={classes.icon} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>{showQuestion ? <FaQuestionCircle /> : <span><span>{`drag & drop an image or a video to upload | `}</span><a style={{ color: '#fff', marginRight: '10px' }} target='_blank' rel="noopener noreferrer" href="https://milvus.io">{`need help ?`}</a><FaCheck /></span>}</div>
        </div>
        <div className={classes.content}>
          <Setting images={images} setResults={setResults} selectImag={selectImag} setImage={setImage} />
          <Results results={results} />
          {isShowUpLoader && (
            <div className={`${classes.uploaderContainer} uploader-container`}>
              <div className='uploader-wrapper' ref={searchWrapper}>
                <FileDrop onDrop={() => { }}>
                  <div className={classes.desc}>
                    <SearchIcon classes={{ root: classes.customIcon }} />
                    <p>drop here to search !</p>
                  </div>
                </FileDrop>
              </div>
              <div className='uploader-wrapper' ref={uploadWrapper}>
                {<FileDrop onDrop={() => { }}>
                  <div className={classes.desc}>
                    {uploading.loading
                      ? <>
                        <CircularProgress color='inherit' variant="static" value={uploading.percent} />
                        <p>uploading...</p>
                      </>
                      : <>
                        <AddCirclesIcon classes={{ root: classes.customIcon }} />
                        <p>add to the library</p></>}
                  </div>
                </FileDrop>
                }

              </div>
            </div>
          )}
        </div>
        <div className="bottom-cover"></div>
      </div>
    </QueryProvider >
  );
};

export default App;
