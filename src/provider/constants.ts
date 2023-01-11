// export  const WS_URL = 'ws://localhost:8000/wss/v2';

// production url
let serverUrl = 'wss://saasai.xtravision.ai/wss/v2'; 
// tODO: create XTRA_ENV instead od ENV
if (process.env.REACT_APP_ENV && process.env.REACT_APP_ENV == 'development') {
    serverUrl = 'ws://localhost:8000/wss/v2';
}

export const WS_URL = serverUrl;
