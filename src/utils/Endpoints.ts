declare global {
  interface Window {
    _env_: any;
  }
}
let endpoint = `http://localhost:9001`;
// let endpoint = `http://192.168.1.10:5000`
if (window._env_ && window._env_.API_URL) {
  endpoint = window._env_.API_URL;
}

export const UPLOAD = `${endpoint}/v1/insert`;
export const SEARCH = `${endpoint}/v1/search`
export const QUERY_STATUS = `${endpoint}/v1/status`
export const QUERY_LIBRARY = `${endpoint}/v1/library`