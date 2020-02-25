declare global {
  interface Window {
    _env_: any;
  }
}
let endpoint = '';
// let endpoint = 'http://localhost:9001'
// let endpoint = `http://192.168.1.10:5000`
if (window._env_ && window._env_.API_URL) {
  endpoint = window._env_.API_URL;
}

export const VIDEO = `/v1/video`;
export const SEARCH = `/v1/search`
export const QUERY_STATUS = `/v1/status`

