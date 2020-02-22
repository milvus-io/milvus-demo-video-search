import React, { FC, createContext, ReactNode, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import Snackbar from "@material-ui/core/Snackbar";
import * as URL from "../utils/Endpoints";

const axiosInstance = axios.create();
export const queryContext = createContext<any>({});
const Provider = queryContext.Provider;

const useStyles = makeStyles({
  root: {
    marginTop: "20%"
  },
  color: {
    color: "red",
    marginRight: "10px"
  }
});

// const isMock = false;
const QueryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const classes = useStyles();
  // current page : search | library
  const [page, setPage] = useState<string>('search');
  // const [page, setPage] = useState<string>('library');
  // page status : upload-img | search | show-search | upload-library| show-library | fail-library
  const [pageStatus, setPageStatus] = useState<string>('show-search');
  // note status 
  const [noteStatus, setNoteStatus] = useState<any>({ show: false, content: '' })
  // searchParams
  const [searchParams, setSearchParams]: any = useState({
    history: [
      'https://miro.medium.com/max/940/1*1VZUa3mn3569l3ePzq3piA.gif'
    ],
    curr: ''
  })
  const showNote = (content: string) => {
    setNoteStatus({ show: true, content });
  };

  const hideNote = () => setNoteStatus({ show: false, content: '' });

  const errorParser = (e: any) => {
    console.log(e);
  };
  const search = async (params: any) => {
    const url = URL.SEARCH;
    const bodyFormData = new FormData()
    bodyFormData.set('file', params);
    bodyFormData.set('Num', '30');
    return await axiosInstance.post(url, bodyFormData).catch(errorParser);
  };
  const upload = async (params: any) => {
    const url = URL.UPLOAD;
    return await axiosInstance.post(url, params).catch(errorParser);
  }
  const queryStatus = async (params: any) => {
    const url = URL.QUERY_STATUS;
    var bodyFormData = new FormData()
    bodyFormData.set('id', params.id);
    return await axiosInstance.post(url, bodyFormData).catch(errorParser);
  }
  const queryLibrary = async (params: any) => {
    const url = URL.QUERY_LIBRARY;
    params = {
      "Reverse": true,
      "PageNum": 3,
      "PerPageCount": 2
    }
    return await axiosInstance.get(url, params).catch(errorParser);
  }

  return (
    <Provider
      value={{
        // querys
        search,
        upload,
        queryStatus,
        queryLibrary,
        // notes
        showNote,
        hideNote,
        // pages
        page, setPage,
        pageStatus, setPageStatus,
        noteStatus,
        setNoteStatus,

        searchParams,
        setSearchParams,
      }}
    >
      {children}
      <Snackbar
        classes={{ root: classes.root }}
        open={noteStatus.show}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        autoHideDuration={6000}
        onClose={() => hideNote()}
        message={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "red"
            }}
          >
            <ErrorIcon classes={{ root: classes.color }} />
            <span>{noteStatus.content || ""}</span>
          </div>
        }
      ></Snackbar>
    </Provider>
  );
};

export default QueryProvider;
