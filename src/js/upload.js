import { Web3Storage } from "web3.storage";
import { v4 as uuid } from "uuid";
import {
  showMessage,
  showLink,
  jsonFile,
  getSavedToken,
  makeGatewayURL,
} from "./helpers.js";

////////////////////////////////
////// Image upload & listing
////////////////////////////////

// #region dataURLtoFile

/**
 * convert dataurl to file
 * @ param {string} dataurl - dataurl address
 * @ param {string} file name - file name
 */
export async function dataURLtoFile(dataUrl, fileName) {
  var arr = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}

// #endregion dataURLtoFile

// #region storeImage

// We use this to identify our uploads in the client.list response.
const namePrefix = "ImageGallery";
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
export async function storeImage() {
  const imageDataUrl = document.getElementById("canvas_image").toDataURL();
  const type = document.getElementById("qrContentFormat").value;
  const value = document.getElementById("qrContentValue").value;
  const previous_owner = "";
  const new_owner = document.getElementById("newOwner").value;
  const iso_date = document.getElementById("qrContentDate").value;

  // The name for our upload includes a prefix we can use to identify our files later
  const uploadName = [namePrefix, "img-name-" + uuid()].join("|");

  // We store some metadata about the image alongside the image file.
  // The metadata includes the file path, which we can use to generate
  // a URL to the full image.
  const metadataFile = jsonFile("metadata.json", {
    type: type,
    value: value,
    timestamp: iso_date,
    previous_owner: previous_owner,
    new_owner: new_owner,
  });

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE5NjE5Qjg5Qzg5ODA0ZmZBNmIyQUE5RjQyZDk4OTMxNENjMGMxMzMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mzc2MzI4MDM2NjcsIm5hbWUiOiJjb2xsZWN0b3J4X3Rva2VuIn0.OQWrIlW-HeUxb_K0uRuPRLaEwymzVa7uwoqR0MjFyh8";
  const web3storage = new Web3Storage({ token });
  showMessage(`> 🤖 calculating content ID for ${uploadName}`);

  var imageFile = await dataURLtoFile(imageDataUrl, uuid());

  const cid = await web3storage.put([imageFile, metadataFile], {
    // the name is viewable at https://web3.storage/files and is included in the status and list API responses
    name: uploadName,

    // onRootCidReady will be called as soon as we've calculated the Content ID locally, before uploading
    onRootCidReady: (localCid) => {
      showMessage(`> 🔑 locally calculated Content ID: ${localCid} `);
      showMessage("> 📡 sending files to web3.storage ");
    },

    // onStoredChunk is called after each chunk of data is uploaded
    onStoredChunk: (bytes) =>
      showMessage(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`),
  });

  const metadataGatewayURL = makeGatewayURL(cid, "metadata.json");
  const imageGatewayURL = makeGatewayURL(cid, uploadName);
  const imageURI = `ipfs://${cid}/${uploadName}`;
  const metadataURI = `ipfs://${cid}/metadata.json`;
  return { cid, metadataGatewayURL, imageGatewayURL, imageURI, metadataURI };
}

//#endregion storeImage

//#region listImageMetadata
/**
 * Get metadata objects for each image stored in the gallery.
 *
 * @returns {AsyncIterator<ImageMetadata>} an async iterator that will yield an ImageMetadata object for each stored image.
 */
export async function* listImageMetadata() {
  const token = getSavedToken();
  if (!token) {
    console.error("No API token for Web3.Storage found.");
    return;
  }

  const web3storage = new Web3Storage({ token });
  for await (const upload of web3storage.list()) {
    if (!upload.name || !upload.name.startsWith(namePrefix)) {
      continue;
    }

    try {
      const metadata = await getImageMetadata(upload.cid);
      yield metadata;
    } catch (e) {
      console.error("error getting image metadata:", e);
      continue;
    }
  }
}
//#endregion listImageMetadata

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
export async function getImageMetadata(cid) {
  const url = makeGatewayURL(cid, "metadata.json");
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `error fetching image metadata: [${res.status}] ${res.statusText}`
    );
  }
  const metadata = await res.json();
  const gatewayURL = makeGatewayURL(cid, metadata.path);
  const uri = `ipfs://${cid}/${metadata.path}`;
  return { ...metadata, cid, gatewayURL, uri };
}
//#endregion getImageMetadata

//#region validateToken
/**
 * Checks if the given API token is valid by issuing a request.
 * @param {string} token
 * @returns {Promise<boolean>} resolves to true if the token is valid, false if invalid.
 */
export async function validateToken(token) {
  console.log("validating token", token);
  const web3storage = new Web3Storage({ token });

  try {
    for await (const _ of web3storage.list({ maxResults: 1 })) {
      // any non-error response means the token is legit
      break;
    }
    return true;
  } catch (e) {
    // only return false for auth-related errors
    if (e.message.includes("401") || e.message.includes("403")) {
      console.log("invalid token", e.message);
      return false;
    }
    // propagate non-auth errors
    throw e;
  }
}
// #endregion validateToken

const send_value_button = document.getElementById("send_value_button");

send_value_button.addEventListener("click", storeImage);
