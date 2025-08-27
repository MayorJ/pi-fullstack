
const API = {
  get: async (path)=> (await fetch('/api'+path)).json(),
  post: async (path, body, token)=> {
    const opts = { method: 'POST', body };
    if(token) opts.headers = { Authorization: 'Bearer ' + token };
    const res = await fetch('/api'+path, opts); return res.json();
  },
  del: async (path, token)=> (await fetch('/api'+path, { method:'DELETE', headers: token?{ Authorization: 'Bearer '+token }:{}})).json(),
  put: async (path, body, token)=> {
    const opts = { method:'PUT', body };
    if(token) opts.headers = { Authorization: 'Bearer ' + token };
    const res = await fetch('/api'+path, opts); return res.json();
  }
};
