import React, { useState, useEffect, useContext, useRef } from "react";
import { queryContext } from '../contexts/QueryContext'
import AddIcon from "@material-ui/icons/Add"
import {genID} from '../utils/Helper'
import FileDrop from 'react-file-drop';
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import WarnningIcon from '@material-ui/icons/Warning'
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
    },
  });
  const { setResults } = props;
  const { search, setNavTitle, searchParams, setSearchParams } = useContext(queryContext)
  const classes = useStyles({});
  const [deleteID, setDeleteID] = useState('');
  const uploader = useRef(null);
  const changeImg = (curr: any) => {
    setSearchParams((searchParams: any) => ({ ...searchParams, curr }))
  }
  const delHistory = (id: string) => {
    const arr = searchParams.history.filter((t: any) => t.id !== id)
    setSearchParams((searchParams: any) => ({ ...searchParams, history: arr }))
  }
  const _search = async (imgSrc: string) => {
    setNavTitle('SEARCHING...');
    search(imgSrc).then((res: any) => {
      if (res && res.status === 200) {
        setNavTitle(`${res.data.Total} RESULTS`)
        setResults(res.data.Data)
      } else {
        setNavTitle(<div style={{ alignItems: 'center', display: 'flex', }}><WarnningIcon style={{ color: 'yellow', marginRight: '50px' }} /><span>SEARCH FAIL</span></div>)
      }
    })
  }

  useEffect(() => {
    if (searchParams.curr.file) {
      _search(searchParams.curr.file);
    }
    const _addSearchImg = (e: any) => {
      setNavTitle('UPLOADING...')
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        const { history } = searchParams;
        const newOne = { file, data: reader.result, id: genID() }
        history.splice(0, 0, newOne);
        setSearchParams({ history, curr: newOne });
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
      {searchParams.history.map((item: any, index: number) => {
        const isSelected = item.id === searchParams.curr.id;
        const isDelete = item.id === deleteID
        return (
          <div key={index} className={clsx(classes.imageWrapper, isSelected ? classes.selectedImage : "")} onClick={() => changeImg(item)} onMouseEnter={() => setDeleteID(item.id)} onMouseLeave={() => { item.id === deleteID && setDeleteID("") }}>
            <img style={{ width: '100%' }} src={item.data} alt="" />
            {isDelete && <div style={{ position: 'absolute', top: 0, right: 0 }}><DeleteIcon classes={{ root: classes.delete }} onClick={() => { delHistory(item.id); return false; }} /></div>}
          </div>
        )
      })}
    </div >
  );
};

export default Setting;
