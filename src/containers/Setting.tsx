import React, { useState, useEffect, useContext, useRef } from "react";
import { queryContext } from '../contexts/QueryContext'
import AddIcon from "@material-ui/icons/Add"
import FileDrop from 'react-file-drop';
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DeleteIcon from "@material-ui/icons/Delete"

// const Images = [
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRGSpZe-XshtZ7V7d4XDaPX3tesALsvATRuANWm_u5SE_iU59C3',
//   'https://img95.699pic.com/photo/50053/0716.jpg_wh300.jpg',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsQNVrDiy1hIUWpICIaziek6B8JlvXWLmWXdIPCIIu6UpZ0J3N',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwkc-7DUmV9xKxJ8K2w3MWZ96-vYfgrvf0-R6n3Kn2o5cNRpYS',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQeYoj5jxWBFDJ5mmz6JgJt2XiVDgdJG5jGZISjmh7lKzMr23mc',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSAjGs5INITjQag0tZllABICCMuvfNT2xFEPXeAcb2CrNpLh-yq',
//   'https://up.enterdesk.com/edpic_360_360/90/0b/79/900b79210005e9d0216f2cffc9a4017c.jpg',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhPDRWlDb8TkK8ebwCSmyxojTDlKSK9_kqsZV5H9d3dqiMS2zi',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSfVQQtRw0p7MqTtmh6ZozJK257gpsebIeC3VEf-UDz4eQ2DCMa',
//   'https://img95.699pic.com/photo/50078/8989.jpg_wh300.jpg',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8ZaqUxcBv22wpMn2b347FtrNT2MGWVAKvp20cafXVqvsRMsSi',
// ]

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
      _search(searchParams.curr);
    }
    const _addSearchImg = (e: any) => {
      setPageStatus('upload-img')
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        const { history } = searchParams;
        history.splice(0, 0, reader.result)
        setSearchParams({ history, curr: reader.result });
      }, false);
      if (file) {
        reader.readAsDataURL(file);
      }
    }
    const onDragEnter = () => { Uploader.classList.add(classes.dragEnter) };
    const onDragLeave = () => Uploader.classList.remove(classes.dragEnter);
    const Uploader = uploader.current || document.createElement('div');
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
