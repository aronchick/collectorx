function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _awaitAsyncGenerator(value) { return new _AwaitValue(value); }

function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

function _AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; var wrappedAwait = value instanceof _AwaitValue; Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) { if (wrappedAwait) { resume(key === "return" ? "return" : "next", arg); return; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen["return"] !== "function") { this["return"] = undefined; } }

_AsyncGenerator.prototype[typeof Symbol === "function" && Symbol.asyncIterator || "@@asyncIterator"] = function () { return this; };

_AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

_AsyncGenerator.prototype["throw"] = function (arg) { return this._invoke("throw", arg); };

_AsyncGenerator.prototype["return"] = function (arg) { return this._invoke("return", arg); };

function _AwaitValue(value) { this.wrapped = value; }

function _asyncIterator(iterable) { var method, async, sync, retry = 2; if (typeof Symbol !== "undefined") { async = Symbol.asyncIterator; sync = Symbol.iterator; } while (retry--) { if (async && (method = iterable[async]) != null) { return method.call(iterable); } if (sync && (method = iterable[sync]) != null) { return new AsyncFromSyncIterator(method.call(iterable)); } async = "@@asyncIterator"; sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

function AsyncFromSyncIterator(s) { AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s; this.n = s.next; }; AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, "return": function _return(value) { var ret = this.s["return"]; if (ret === undefined) { return Promise.resolve({ value: value, done: true }); } return AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, "throw": function _throw(value) { var thr = this.s["return"]; if (thr === undefined) return Promise.reject(value); return AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }; function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) { return Promise.reject(new TypeError(r + " is not an object.")); } var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return new AsyncFromSyncIterator(s); }

import { Web3Storage } from "web3.storage";
import { showMessage, showLink, jsonFile, getSavedToken, makeGatewayURL } from "./helpers.js"; ////////////////////////////////
////// Image upload & listing
////////////////////////////////
// #region dataURLtoFile

/**
 * convert dataurl to file
 * @ param {string} dataurl - dataurl address
 * @ param {string} file name - file name
 */

export function dataURLtoFile(_x, _x2) {
  return _dataURLtoFile.apply(this, arguments);
} // #endregion dataURLtoFile
// #region storeImage
// We use this to identify our uploads in the client.list response.

function _dataURLtoFile() {
  _dataURLtoFile = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dataUrl, fileName) {
    var arr, mime, bstr, n, u8arr;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            arr = dataUrl.split(","), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);

            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }

            return _context2.abrupt("return", new File([u8arr], fileName, {
              type: mime
            }));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _dataURLtoFile.apply(this, arguments);
}

var namePrefix = "ImageGallery";
/**
 * Stores an image file on Web3.Storage, along with a small metadata.json that includes a caption & filename.
 * @param {File} imageFile a File object containing image data
 * @param {string} caption a string that describes the image
 *
 * @typedef StoreImageResult
 * @property {string} cid the Content ID for an directory containing the image and metadata
 * @property {string} imageURI an ipfs:// URI for the image file
 * @property {string} metadataURI an ipfs:// URI for the metadata file
 * @property {string} imageGatewayURL an HTTP gateway URL for the image
 * @property {string} metadataGatewayURL an HTTP gateway URL for the metadata file
 *
 * @returns {Promise<StoreImageResult>} an object containing links to the uploaded content
 */

export function storeImage() {
  return _storeImage.apply(this, arguments);
} //#endregion storeImage
//#region listImageMetadata

/**
 * Get metadata objects for each image stored in the gallery.
 *
 * @returns {AsyncIterator<ImageMetadata>} an async iterator that will yield an ImageMetadata object for each stored image.
 */

function _storeImage() {
  _storeImage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var imageDataUrl, type, value, previous_owner, new_owner, iso_date, uploadName, metadataFile, token, web3storage, cid, metadataGatewayURL, imageGatewayURL, imageURI, metadataURI;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            imageDataUrl = document.getElementById("canvas_image").toDataURL();
            type = document.getElementById("qrContentFormat").value;
            value = document.getElementById("qrContentValue").value;
            previous_owner = "";
            new_owner = document.getElementById("newOwner").value;
            iso_date = document.getElementById("qrContentDate").value; // The name for our upload includes a prefix we can use to identify our files later

            uploadName = [namePrefix, caption].join("|"); // We store some metadata about the image alongside the image file.
            // The metadata includes the file path, which we can use to generate
            // a URL to the full image.

            metadataFile = jsonFile("metadata.json", {
              type: type,
              value: value,
              timestamp: iso_date,
              previous_owner: previous_owner,
              new_owner: new_owner
            });
            token = process.env.web3_token;
            web3storage = new Web3Storage({
              token: token
            });
            showMessage("> \uD83E\uDD16 calculating content ID for ".concat(imageFile.name));
            imageFile = dataURLtoFile(dataUrl, uuidv4());
            _context3.next = 14;
            return web3storage.put([imageFile, metadataFile], {
              // the name is viewable at https://web3.storage/files and is included in the status and list API responses
              name: uploadName,
              // onRootCidReady will be called as soon as we've calculated the Content ID locally, before uploading
              onRootCidReady: function onRootCidReady(localCid) {
                showMessage("> \uD83D\uDD11 locally calculated Content ID: ".concat(localCid, " "));
                showMessage("> 📡 sending files to web3.storage ");
              },
              // onStoredChunk is called after each chunk of data is uploaded
              onStoredChunk: function onStoredChunk(bytes) {
                return showMessage("> \uD83D\uDEF0 sent ".concat(bytes.toLocaleString(), " bytes to web3.storage"));
              }
            });

          case 14:
            cid = _context3.sent;
            metadataGatewayURL = makeGatewayURL(cid, "metadata.json");
            imageGatewayURL = makeGatewayURL(cid, imageFile.name);
            imageURI = "ipfs://".concat(cid, "/").concat(imageFile.name);
            metadataURI = "ipfs://".concat(cid, "/metadata.json");
            return _context3.abrupt("return", {
              cid: cid,
              metadataGatewayURL: metadataGatewayURL,
              imageGatewayURL: imageGatewayURL,
              imageURI: imageURI,
              metadataURI: metadataURI
            });

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _storeImage.apply(this, arguments);
}

export function listImageMetadata() {
  return _listImageMetadata.apply(this, arguments);
} //#endregion listImageMetadata
//#region getImageMetadata

/**
 * Fetches the metadata JSON from an image upload.
 * @param {string} cid the CID for the IPFS directory containing the metadata & image
 *
 * @typedef {object} ImageMetadata
 * @property {string} cid the root cid of the IPFS directory containing the image & metadata
 * @property {string} path the path within the IPFS directory to the image file
 * @property {string} caption a user-provided caption for the image
 * @property {string} gatewayURL an IPFS gateway url for the image
 * @property {string} uri an IPFS uri for the image
 *
 * @returns {Promise<ImageMetadata>} a promise that resolves to a metadata object for the image
 */

function _listImageMetadata() {
  _listImageMetadata = _wrapAsyncGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var token, web3storage, _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, upload, metadata;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = getSavedToken();

            if (token) {
              _context.next = 4;
              break;
            }

            console.error("No API token for Web3.Storage found.");
            return _context.abrupt("return");

          case 4:
            web3storage = new Web3Storage({
              token: token
            });
            _iteratorAbruptCompletion = false;
            _didIteratorError = false;
            _context.prev = 7;
            _iterator = _asyncIterator(web3storage.list());

          case 9:
            _context.next = 11;
            return _awaitAsyncGenerator(_iterator.next());

          case 11:
            if (!(_iteratorAbruptCompletion = !(_step = _context.sent).done)) {
              _context.next = 30;
              break;
            }

            upload = _step.value;

            if (!(!upload.name || !upload.name.startsWith(namePrefix))) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("continue", 27);

          case 15:
            _context.prev = 15;
            _context.next = 18;
            return _awaitAsyncGenerator(getImageMetadata(upload.cid));

          case 18:
            metadata = _context.sent;
            _context.next = 21;
            return metadata;

          case 21:
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](15);
            console.error("error getting image metadata:", _context.t0);
            return _context.abrupt("continue", 27);

          case 27:
            _iteratorAbruptCompletion = false;
            _context.next = 9;
            break;

          case 30:
            _context.next = 36;
            break;

          case 32:
            _context.prev = 32;
            _context.t1 = _context["catch"](7);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 36:
            _context.prev = 36;
            _context.prev = 37;

            if (!(_iteratorAbruptCompletion && _iterator["return"] != null)) {
              _context.next = 41;
              break;
            }

            _context.next = 41;
            return _awaitAsyncGenerator(_iterator["return"]());

          case 41:
            _context.prev = 41;

            if (!_didIteratorError) {
              _context.next = 44;
              break;
            }

            throw _iteratorError;

          case 44:
            return _context.finish(41);

          case 45:
            return _context.finish(36);

          case 46:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 32, 36, 46], [15, 23], [37,, 41, 45]]);
  }));
  return _listImageMetadata.apply(this, arguments);
}

export function getImageMetadata(_x3) {
  return _getImageMetadata.apply(this, arguments);
} //#endregion getImageMetadata
//#region validateToken

/**
 * Checks if the given API token is valid by issuing a request.
 * @param {string} token
 * @returns {Promise<boolean>} resolves to true if the token is valid, false if invalid.
 */

function _getImageMetadata() {
  _getImageMetadata = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(cid) {
    var url, res, metadata, gatewayURL, uri;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            url = makeGatewayURL(cid, "metadata.json");
            _context4.next = 3;
            return fetch(url);

          case 3:
            res = _context4.sent;

            if (res.ok) {
              _context4.next = 6;
              break;
            }

            throw new Error("error fetching image metadata: [".concat(res.status, "] ").concat(res.statusText));

          case 6:
            _context4.next = 8;
            return res.json();

          case 8:
            metadata = _context4.sent;
            gatewayURL = makeGatewayURL(cid, metadata.path);
            uri = "ipfs://".concat(cid, "/").concat(metadata.path);
            return _context4.abrupt("return", _objectSpread(_objectSpread({}, metadata), {}, {
              cid: cid,
              gatewayURL: gatewayURL,
              uri: uri
            }));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getImageMetadata.apply(this, arguments);
}

export function validateToken(_x4) {
  return _validateToken.apply(this, arguments);
} // #endregion validateToken

function _validateToken() {
  _validateToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(token) {
    var web3storage, _iteratorAbruptCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log("validating token", token);
            web3storage = new Web3Storage({
              token: token
            });
            _context5.prev = 2;
            _iteratorAbruptCompletion2 = false;
            _didIteratorError2 = false;
            _context5.prev = 5;
            _iterator2 = _asyncIterator(web3storage.list({
              maxResults: 1
            }));

          case 7:
            _context5.next = 9;
            return _iterator2.next();

          case 9:
            if (!(_iteratorAbruptCompletion2 = !(_step2 = _context5.sent).done)) {
              _context5.next = 15;
              break;
            }

            _ = _step2.value;
            return _context5.abrupt("break", 15);

          case 12:
            _iteratorAbruptCompletion2 = false;
            _context5.next = 7;
            break;

          case 15:
            _context5.next = 21;
            break;

          case 17:
            _context5.prev = 17;
            _context5.t0 = _context5["catch"](5);
            _didIteratorError2 = true;
            _iteratorError2 = _context5.t0;

          case 21:
            _context5.prev = 21;
            _context5.prev = 22;

            if (!(_iteratorAbruptCompletion2 && _iterator2["return"] != null)) {
              _context5.next = 26;
              break;
            }

            _context5.next = 26;
            return _iterator2["return"]();

          case 26:
            _context5.prev = 26;

            if (!_didIteratorError2) {
              _context5.next = 29;
              break;
            }

            throw _iteratorError2;

          case 29:
            return _context5.finish(26);

          case 30:
            return _context5.finish(21);

          case 31:
            return _context5.abrupt("return", true);

          case 34:
            _context5.prev = 34;
            _context5.t1 = _context5["catch"](2);

            if (!(_context5.t1.message.includes("401") || _context5.t1.message.includes("403"))) {
              _context5.next = 39;
              break;
            }

            console.log("invalid token", _context5.t1.message);
            return _context5.abrupt("return", false);

          case 39:
            throw _context5.t1;

          case 40:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 34], [5, 17, 21, 31], [22,, 26, 30]]);
  }));
  return _validateToken.apply(this, arguments);
}

var send_value_button = document.getElementById("send_value_button");
send_value_button.addEventListener("click", storeImage);