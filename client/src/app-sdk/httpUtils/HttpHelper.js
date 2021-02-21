class HttpHelper {

  getHeader = () => {
    let headers = {
      'x-portal-key': localStorage.getItem('x-portal-key') ? localStorage.getItem('x-portal-key') : null,
      'content-type': "application/json"
    };
    let config = {
      headers: headers
    };
    return config;
  };

}

export default HttpHelper;
