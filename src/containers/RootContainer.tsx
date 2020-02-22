import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { queryContext } from "../contexts/QueryContext";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Logo from "../logo-white.svg";
import SearchIcon from "@material-ui/icons/Search"
import SettingsIcon from "@material-ui/icons/Settings"
import Library from "../components/Library"
import Search from '../components/Search'
import { CSSTransition, SwitchTransition } from "react-transition-group"

const RootContainer: React.FC = () => {
  const { page, setPage, navTitle, setNavTitle } = useContext(queryContext)
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
      backgroundColor: "#1F2023",
      color: '#fff'
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
      backgroundColor: "#1F2023",
      height: 'calc(100% - 50px)',
      overflowY: 'auto'
    }
  });
  const classes = useStyles({});
  return (
    <div className={classes.root}>
      <div className={classes.nav}>
        <img className={classes.logo} src={Logo} width="150px" alt="logo" />
        <h3>{navTitle}</h3>
        <div className={classes.pageSwitcher} onClick={() => { setPage(page === 'search' ? 'library' : 'search'); page === 'search' && setNavTitle('VIDEO SEARCH'); }}>
          <div className={page === 'search' ? classes.selectedWrapper : classes.noneSelectedWrapper}><SearchIcon /></div>
          <div className={page === 'library' ? classes.selectedWrapper : classes.noneSelectedWrapper}><SettingsIcon /></div>
        </div>
      </div>
      <div className={classes.content}>
        <SwitchTransition mode='out-in'>
          <CSSTransition classNames='fade' timeout={500} key={page === 'search' ? "on" : "off"} >
            {page === 'search' ? <Search /> : <Library />}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};

export default RootContainer;
