import axios from "axios";
import HttpHelper from './HttpHelper';

class HttpRequestHandler {
  constructor() {
    this.httpHelper = new HttpHelper();
    // this.headers = this.httpHelper.getHeader()
    this.headers = { headers : {} };

  }


  async GET(url, success, error) {
    try {
      const response = await axios.get(url, this.headers);
      if (success) {
        success(await response);
      }
    } catch (err) {
      if (error) {
        error(await err.response);
      }
    }
  }

  async POST(url, params, success, error, headers = {}) { 
    try {
      const config = {
        headers : headers
      };
      const response = await axios.post(url, params, config);
      if (success) {
        success(await response);
      }
    } catch (err) {
      if (error) {
        error(await err.response);
      }
    }
  }

  async ALL(urls, token, success, error) {
    try {
      var requests = []
      for( let i=0; i<urls.length; i++) {
        requests.push(axios.get(urls[i], this.httpHelper.getHeader(token)));
      }
      await axios.all(requests).then(axios.spread((...responses) => {
        success(responses);
      }))
    } catch (err) {
      if (error) {
        error(await err.response);
      }
    }
  }

  async MIXED_REQUEST(urls, params, token, success, error) {
    try {
      var requests = []
      for( let i=0; i<urls.length; i++) {
        if (params[i].type === 'get') {
          requests.push(axios.get(urls[i], this.httpHelper.getHeader(token)));
        }
        else if (params[i].type === 'post') {
          requests.push(axios.post(urls[i], params[i].params, this.httpHelper.getHeader(token)));
        }
      }
      await axios.all(requests).then(axios.spread((...responses) => {
        success(responses);
      }))
    } catch (err) {
      if (error) {
        error(await err.response);
      }
    }
  }

  async UPLOAD_ALL(urls, token, bodyParams, success, error) {
    try {
      var requests = []
      for( let i=0; i<urls.length; i++) {
        requests.push(axios.post(urls[i], bodyParams[i], this.httpHelper.getMultiPartHeader(token)));
      }
      await axios.all(requests).then(axios.spread((...responses) => {
        success(responses);
      }))
    } catch (err) {
      console.log(err);
      if (error) {
        error(await err.response);
      }
    }
  }

  async DOWNLOAD(url, token, params, success, error) {
    try {
      const response = await axios.post(url, params, this.httpHelper.getDownloadHeader(token));
      if (success) {
        success(await response);
      }
    } catch (err) {
      if (error) {
        error(await err.response);
      }
    }
  }

  async UPLOAD(url, token, data, success, error) {
    try {
      const response = await axios.post(url, data, this.httpHelper.getMultiPartHeader(token));
      if (success) {
        success(await response);
      }
    } catch (err) {
      if (error) {
        error(await err.response);
      }
    }
  }

  async PUT(url, params, success, error) {
    try {
      const response = await axios.put(url, params, this.headers);
      if (success) {
        success(await response);
      }
    } catch (err) {
      if (error) {
        error(await err.response);
      }
    }
  }

   async POST_METHOD(url, params, success, error) {
    try {
      const response = await axios.post(url, params, this.headers);
      if (success) {
        success(await response);
      }
    } catch (err) {
      if (error) {
        error(await err.response);
      }
    }
  }

    async PATCH(url, params, success, error) {
    try {
      const response = await axios.patch(url, params, this.headers);
      if (success) {
        success(await response);
      }
    } catch (err) {
      if (error) {
        error(await err.response);
      }
    }
  }

  

  async DELETE(url, token, params, success, error) {
    try {
      const config = this.httpHelper.getHeader(token);
      if(params) {
        config.data = {
          userId: params.userId,
          teamId: params.teamId
        };
      }
      const response = await axios.delete(url, config);
      if (success) {
        success(await response);
      }
    } catch (err) {
      if (error) {
        error(await err.response);
      }
    }
  }
}

export default HttpRequestHandler;
