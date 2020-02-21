import React, { useContext } from "react";
// import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from "@material-ui/core/styles";
import { queryContext } from "../contexts/QueryContext";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Logo from "../logo-white.svg";
import SearchIcon from "@material-ui/icons/Search"
import SettingsIcon from "@material-ui/icons/Settings"
import Library from "../components/Library"
import Search from '../components/Search'
import { CSSTransition, SwitchTransition } from "react-transition-group"

const getTitle = (pageStatus: string) => {
  switch (pageStatus) {
    case 'upload-img':
      return 'UPLOADING...'
    case 'upload-img':
      return 'UPLOADING...'
    case 'search':
      return 'SEARCHING...'
    case 'show-search':
      return 'VIDEO SEARCH'
    case 'fail-search':
      return 'SEARCH FAIL'
    case 'upload-library':
      return 'UPLOADING...'
    case 'show-library':
      return '10000 VIDEOS IN LIBRARY'
    default:
      return 'VIDEO SEARCH'
  }
}
const RootContainer: React.FC = () => {
  const { page, pageStatus, setPage, setPageStatus } = useContext(queryContext)
  const isMobile = !useMediaQuery("(min-width:1000px)");
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      // backgroundColor: "#1F2023",
      height: '100vh',
      overflow: 'hidden',
      position: 'relative'
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#fff',
      backgroundColor: "#1F2023",
    },
    logo: {
      paddingLeft: '30px',
    },
    pageSwitcher: {
      marginRight: '30px',
      color: '#fff',
      backgroundColor: 'grey',
      borderRadius: '17px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer'
    },
    selectedWrapper: {
      borderRadius: '50%',
      color: '#000',
      backgroundColor: '#fff',
      padding: '5px'
    },
    noneSelectedWrapper: {
      backgroundColor: 'transparent',
      color: '#fff',
      padding: '5px'
    },
    content: {
      display: isMobile ? 'block' : "flex",
      flexGrow: 1,
      height: 'calc(100% - 50px)',
    }
  });
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <div className={classes.nav}>
        <img className={classes.logo} src={Logo} width="150px" alt="logo" />
        <h3>{getTitle(pageStatus)}</h3>
        <div className={classes.pageSwitcher} onClick={() => { setPage(page === 'search' ? 'library' : 'search'); setPageStatus(page === 'search' ? 'show-library' : 'show-search'); }}>
          <div className={page === 'search' ? classes.selectedWrapper : classes.noneSelectedWrapper}><SearchIcon /></div>
          <div className={page === 'library' ? classes.selectedWrapper : classes.noneSelectedWrapper}><SettingsIcon /></div>
        </div>
      </div>
      {/* <div className={classes.content}> */}
        <Fade in={page==='search'} >
          <Search />
        </Fade>
        {/* <Slide in={page !== 'search'} direction="right" mountOnEnter unmountOnExit>
          <Library />
        </Slide> */}
      {/* </div> */}
    </div>
  );
};

export default RootContainer;
