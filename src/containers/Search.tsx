import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { queryContext } from "../contexts/QueryContext";
import Setting from "../containers/Setting";
import Results from "../components/Results";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Logo from "../logo-white.svg";
import SearchIcon from "@material-ui/icons/Search"
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import FileDrop from 'react-file-drop';
import { Link } from 'react-router-dom'
import './Search.css'

const Images = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRGSpZe-XshtZ7V7d4XDaPX3tesALsvATRuANWm_u5SE_iU59C3',
  'https://img95.699pic.com/photo/50053/0716.jpg_wh300.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsQNVrDiy1hIUWpICIaziek6B8JlvXWLmWXdIPCIIu6UpZ0J3N',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwkc-7DUmV9xKxJ8K2w3MWZ96-vYfgrvf0-R6n3Kn2o5cNRpYS',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQeYoj5jxWBFDJ5mmz6JgJt2XiVDgdJG5jGZISjmh7lKzMr23mc',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSAjGs5INITjQag0tZllABICCMuvfNT2xFEPXeAcb2CrNpLh-yq',
  'https://up.enterdesk.com/edpic_360_360/90/0b/79/900b79210005e9d0216f2cffc9a4017c.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhPDRWlDb8TkK8ebwCSmyxojTDlKSK9_kqsZV5H9d3dqiMS2zi',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSfVQQtRw0p7MqTtmh6ZozJK257gpsebIeC3VEf-UDz4eQ2DCMa',
  'https://img95.699pic.com/photo/50078/8989.jpg_wh300.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ZaqUxcBv22wpMn2b347FtrNT2MGWVAKvp20cafXVqvsRMsSi',
]
const SearchPage: React.FC = () => {
  const { search } = useContext(queryContext)
  const [searchParams, setSearchParams]: any = useState({
    history: Images,
    curr: Images[0]
  })

  const [results, setResults]: any = useState([]);
  const [isShowSearchWrapper, setShowSearchWrapper] = useState(false);

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
      color: '#fff'
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
      height: 'calc(100% - 50px)',
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
    customIcon: {
      fontSize: '3.5rem',
    },
    delete: {
      color: '#fff',
      background: 'red',
      cursor: 'pointer'
    }
  });

  const classes = useStyles({});
  const searchWrapper = useRef(null);

  const _search = async (imgSrc: string) => {
    search(imgSrc).then((res: any) => {
      if (res.status === 200) {
        setResults(res.data)
      }
    })
  }

  const showUploader = useCallback((e: any) => {
    if (!isShowSearchWrapper) {
      setShowSearchWrapper(true);
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
  }, [isShowSearchWrapper])

  useEffect(() => {
    const _addSearchParam = (e: any) => {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        const { history, curr } = searchParams;
        const index = history.indexOf(curr);
        history.splice(index + 1, 0, reader.result)
        setSearchParams({ history, curr: reader.result });
        setShowSearchWrapper(false);
      }, false);
      if (file) {
        reader.readAsDataURL(file);
      }
    }
    document.body.addEventListener('dragenter', showUploader)
    const Search = searchWrapper.current || document.createElement('div');
    Search.addEventListener('drop', _addSearchParam);
    return () => {
      document.body.removeEventListener('dragenter', showUploader)
      Search.removeEventListener('drop', _addSearchParam);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowSearchWrapper])

  useEffect(() => {
    _search(searchParams.curr);
    // eslint-disable-next-line
  }, [searchParams.curr])
  return (
    <div className={classes.root}>
      <div className={classes.nav}>
        <img className={classes.logo} src={Logo} width="150px" alt="logo" />
        <h3>VIDEO SEARCH</h3>
        <Link to='/library'><div className={classes.icon} onClick={() => { }}>
          <VideoLibraryIcon />
        </div>
        </Link>
      </div>
      <div className={classes.content}>
        <Setting searchParams={searchParams} setSelectedImage={(curr: string) => setSearchParams({ ...searchParams, curr })} setSearchParams={setSearchParams} />
        <Results results={results} setResults={setResults} />
        {isShowSearchWrapper && (
          <div className={`${classes.uploaderContainer} uploader-container`}>
            <div className='uploader-wrapper' ref={searchWrapper}>
              <FileDrop onDrop={() => { }}>
                <div className={classes.desc}>
                  <SearchIcon classes={{ root: classes.customIcon }} />
                  <p>drop here to search !</p>
                </div>
              </FileDrop>
            </div>
          </div>
        )}
      </div>
      <div className="bottom-cover"></div>
    </div>
  );
};

export default SearchPage;
