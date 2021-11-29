// https://sandi-fajariadi.medium.com/detect-qr-code-from-an-image-using-javascript-ba30b0aa7d59
const player = document.getElementById("player");

const canvas_image = document.getElementById("canvas_image");
const context_image = canvas_image.getContext("2d");
const captureImageButton = document.getElementById("capture_image_button");

const captured_qrcode_image = document.getElementById("captured_qrcode_image");
const captured_qrcode_context = captured_qrcode_image.getContext("2d");

const qrReader = document.getElementById("qrReader");
const qrContent = document.getElementById("qrContent");
const qrContentFormat = document.getElementById("qrContentFormat");
const qrContentValue = document.getElementById("qrContentValue");
const qrContentDate = document.getElementById("qrContentDate");
const captured_qrcode = document.getElementById("captured_qrcode");
const constraints = {
  video: true,
};

capture_image_button.addEventListener("click", () => {
  // Draw the video frame to the canvas.
  context_image.drawImage(
    player,
    0,
    0,
    canvas_image.width,
    canvas_image.height
  );
});

function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  var date = new Date().toISOString();
  console.log(`Code matched = ${decodedText}`, decodedResult);
  var t = `BarCode Captured:
            Format: ${decodedResult.result.format.formatName}
            Value: ${decodedText}
            Time: ${date}`;
  qrContent.innerText = t;
  qrContentFormat.value = decodedResult.result.format.formatName;
  qrContentValue.value = decodedText;
  qrContentDate.value = date;
  captured_qrcode_context.drawImage(
    document.querySelector("#qrReader video"),
    0,
    0,
    captured_qrcode_image.width,
    captured_qrcode_image.height
  );
  {
    {
      /*  qrReader.hidden = true;
          html5QrcodeScanner.clear();  */
    }
  }
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  // console.warn(`Code scan error = ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner("qrReader", {
  fps: 100,
  qrbox: 100,
  experimentalFeatures: {
    useBarCodeDetectorIfSupported: true,
  },
  rememberLastUsedCamera: true,
});
html5QrcodeScanner.render(onScanSuccess, onScanFailure);

// Attach the video stream to the video element and autoplay.
navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  player.srcObject = stream;
});