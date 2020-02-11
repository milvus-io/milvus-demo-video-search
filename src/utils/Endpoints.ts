declare global {
  interface Window {
    _env_: any;
  }
}
let endpoint = `http://192.168.1.85:5000`;
if (window._env_ && window._env_.API_URL) {
  endpoint = window._env_.API_URL;
}

export const UPLOAD = `${endpoint}/api/insert`;
export const SEARCH = `${endpoint}/api/search`
export const QUERY_STATUS = `${endpoint}/api/status`