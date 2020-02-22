import React, { useState, useEffect, useContext, useRef } from "react";
import { queryContext } from '../contexts/QueryContext'
import AddIcon from "@material-ui/icons/Add"
import FileDrop from 'react-file-drop';
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DeleteIcon from "@material-ui/icons/Delete"
import './Setting.css'

const Setting = (props: any) => {
  const isMobile = !useMediaQuery("(min-width:1000px)");
  const useStyles = makeStyles({
    setting: {
      position: "relative",
      minWidth: isMobile ? "auto" : "20%",
      maxWidth: isMobile ? "auto" : "20%",
      padding: isMobile ? "20px" : "20px 20px 0 20px",
      borderWidth: "1px",
      color: "#E4E4E6",
      overflowY: "auto",
      backgroundColor: "#1F2023",
    },
    addWrapper: {
      width: "100%",
      marginBottom: '5px',
      height: '15vh',
      background: 'rgba(255,255,255,0.1)',
      border: '2px solid rgba(176,176,185,1)',
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    imageWrapper: {
      maxWidth: "100%",
      marginBottom: '5px',
      opacity: .3,
      position: "relative",
    },
    selectedImage: {
      border: '1px solid rgba(255,255,255,1)',
      opacity: 1
    },
    delete: {
      color: '#fff',
      background: 'red',
      cursor: 'pointer'
    },
    dragEnter: {
      border: '2px solid rgba(63, 156, 209, 1) !important',
      color: 'rgba(63, 156, 209, 1) !important',
    }
  });
  const { setResults } = props;
  const { search, setPageStatus, searchParams, setSearchParams } = useContext(queryContext)
  const classes = useStyles({});
  const [deleteID, setDeleteID] = useState('');
  const uploader = useRef(null);
  const fileContainer = useRef("");
  const changeImg = (curr: string) => {
    setSearchParams({ ...searchParams, curr })
  }
  const setDeleteingGif = (src: string) => {
    setSearchParams({ ...searchParams, history: searchParams.history.filter((t: string) => t !== src) })
  }
  const _search = async (imgSrc: string) => {
    setPageStatus('search');
    search(imgSrc).then((res: any) => {
      // TODO: && res.data === ok
      // console.log(res);
      if (res && res.status === 200) {
        setPageStatus('show-search')
        setResults(res.data)
      } else {
        setPageStatus('fail-search')
      }
    })
  }

  useEffect(() => {
    if (searchParams.curr) {
      _search(fileContainer.current);
    }
    const _addSearchImg = (e: any) => {
      setPageStatus('upload-img')
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        const { history } = searchParams;
        history.splice(0, 0, reader.result)
        fileContainer.current = file;
        setSearchParams({ history, curr: reader.result });
      }, false);
      if (file) {
        reader.readAsDataURL(file);
      }
    }
    const Uploader = uploader.current || document.createElement('div');
    const onDragEnter = () => { Uploader.classList.add('drag-enter') };
    const onDragLeave = () => { Uploader.classList.remove('drag-enter'); }
    Uploader.addEventListener('dragenter', onDragEnter)
    Uploader.addEventListener('dragleave', onDragLeave)
    Uploader.addEventListener('drop', _addSearchImg);
    return () => {
      Uploader.removeEventListener('dragenter', onDragEnter)
      Uploader.removeEventListener('dragleave', onDragLeave)
      Uploader.removeEventListener('drop', _addSearchImg);
    }
    // eslint-disable-next-line
  }, [searchParams.curr])
  return (
    <div className={classes.setting}>
      <FileDrop>
        <div className={classes.addWrapper} ref={uploader}>
          <AddIcon />
        </div>
      </FileDrop>
      {searchParams.history.map((image: any, index: number) => {
        const isSelected = image === searchParams.curr;
        const isDelete = image === deleteID
        return (
          <div key={index} className={clsx(classes.imageWrapper, isSelected ? classes.selectedImage : "")} onClick={() => changeImg(image)} onMouseEnter={() => setDeleteID(image)} onMouseLeave={() => { image === deleteID && setDeleteID("") }}>
            <img style={{ width: '100%' }} src={image} alt="" />
            {isDelete && <div style={{ position: 'absolute', top: 0, right: 0 }}><DeleteIcon classes={{ root: classes.delete }} onClick={() => setDeleteingGif(image)} /></div>}
          </div>
        )
      })}
    </div >
  );
};

export default Setting;
