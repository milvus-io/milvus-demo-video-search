import React, { FC, createContext, ReactNode } from "react";
import axios from "axios";
import * as URL from "../utils/Endpoints";

const axiosInstance = axios.create();

export const queryContext = createContext<any>({});
const Provider = queryContext.Provider;

const QueryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const errorParser = (e: any) => {
    console.log(e);
  };
  const load = async (params: any) => {
    const url = URL.LOAD;
    return await axiosInstance.post(url, params).catch(errorParser);
  };
  const process = async (params: any) => {
    const url = URL.PROCESSING;
    return await axiosInstance.get(url, params).catch(errorParser);
  };
  const count = async (params: any) => {
    const url = URL.COUNT;
    return await axiosInstance.post(url, params).catch(errorParser);
  };

  const search = async (params: any) => {
    const url = `${URL.SEARCH}?${Math.ceil(Math.random()*10000).toString()}`;
    return await axiosInstance.post(url, params).catch(errorParser);
  };
  const clearAll = async () => {
    const url = URL.CLEAR_ALL;
    return await axiosInstance.post(url).catch(errorParser);
  };

  return (
    <Provider
      value={{
        load,
        process,
        count,
        search,
        clearAll
      }}
    >
      {children}
    </Provider>
  );
};

export default QueryProvider;
