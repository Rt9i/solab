const mainURL = "https://solab-server.onrender.com"
// fetch('url' , params)


export const getAllUsers = async () => {
    const route = '/getAllUsers';
    return await appFetch(route);
  };
  
  const appFetch = async (route, method, body) => {
    const url = mainURL + route;
  
    const params = {
      'Content-Type': 'application/json',
    };
  
    if (body) {
      const bodyStr = JSON.stringify(body);
      params.body = bodyStr;
    }
  
    params.method = method || 'GET';
  
    return await fetch(url, params)
      .then(res => {
        const statuse = res.status;
        return res.json();
      })
      .then(resJson => resJson)
      .catch(e => console.log('fetch error: ', e));
  };