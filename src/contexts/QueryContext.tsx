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
const QueryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const classes = useStyles();
  const [status, setStatus]: any = useState({ isShow: false });

  const showNote = (content: string) => {
    setStatus({ isShow: true, content });
  };

  const hideNote = () => setStatus({ isShow: false });
  const errorParser = (e: any) => {
    console.log(e);
  };
  const search = async (params: any) => {
    const url = URL.SEARCH;
    var bodyFormData = new FormData()
    bodyFormData.set('file', params.file);
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


  return (
    <Provider
      value={{
        upload,
        process,
        queryStatus,
        search,
        showNote,
        hideNote,
        status
      }}
    >
      {children}
      <Snackbar
        classes={{ root: classes.root }}
        open={status.isShow}
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
            <span>{status.content || ""}</span>
          </div>
        }
      ></Snackbar>
    </Provider>
  );
};

export default QueryProvider;
