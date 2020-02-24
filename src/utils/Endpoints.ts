declare global {
  interface Window {
    _env_: any;
  }
}
let endpoint = '';
// let endpoint = `http://192.168.1.10:5000`
if (window._env_ && window._env_.API_URL) {
  endpoint = window._env_.API_URL;
}

export const VIDEO = `${endpoint}/v1/video`;
export const SEARCH = `${endpoint}/v1/search`
export const QUERY_STATUS = `${endpoint}/v1/status`