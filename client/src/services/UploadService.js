import axios from "axios"

let baseOptions = {
  // `url` is the server URL that will be used for the request
  url: '/upload',

  // `method` is the request method to be used when making the request
  method: 'post', // default

  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: 'http://localhost:8000',

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000, // default is `0` (no timeout)

  // `responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
  //   browser only: 'blob'
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses (Node.js only)
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

}

const axios_instance = axios.create(baseOptions)

export default {
  async uploadImages() {
    let res = await axios_instance.get("/events");
    return res.data;
  },
  async getEventSingle(eventId, accessToken) {
    let res = await axios_instance.get("/events/" + eventId, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return res.data;
  }
}