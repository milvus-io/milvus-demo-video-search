declare global {
  interface Window {
    _env_: any;
  }
}
let endpoint = `http://139.198.21.118:18222`;
if (window._env_ && window._env_.API_URL) {
  endpoint = window._env_.API_URL;
}

export const UPLOAD = `${endpoint}/v1/insert`;
export const SEARCH = `${endpoint}/v1/search`
export const QUERY_STATUS = `${endpoint}/v1/status`