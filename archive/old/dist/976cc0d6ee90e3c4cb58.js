// https://sandi-fajariadi.medium.com/detect-qr-code-from-an-image-using-javascript-ba30b0aa7d59
var player = document.getElementById("player");
var canvas_image = document.getElementById("canvas_image");
var context_image = canvas_image.getContext("2d");
var captureImageButton = document.getElementById("capture_image_button");
var captured_qrcode_image = document.getElementById("captured_qrcode_image");
var captured_qrcode_context = captured_qrcode_image.getContext("2d");
var qrReader = document.getElementById("qrReader");
var qrContent = document.getElementById("qrContent");
var qrContentFormat = document.getElementById("qrContentFormat");
var qrContentValue = document.getElementById("qrContentValue");
var qrContentDate = document.getElementById("qrContentDate");
var captured_qrcode = document.getElementById("captured_qrcode");
var constraints = {
  video: true
};
capture_image_button.addEventListener("click", function () {
  // Draw the video frame to the canvas.
  context_image.drawImage(player, 0, 0, canvas_image.width, canvas_image.height);
});

function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  var date = new Date().toISOString();
  console.log("Code matched = ".concat(decodedText), decodedResult);
  var t = "BarCode Captured:\n            Format: ".concat(decodedResult.result.format.formatName, "\n            Value: ").concat(decodedText, "\n            Time: ").concat(date);
  qrContent.innerText = t;
  qrContentFormat.value = decodedResult.result.format.formatName;
  qrContentValue.value = decodedText;
  qrContentDate.value = date;
  captured_qrcode_context.drawImage(document.querySelector("#qrReader video"), 0, 0, captured_qrcode_image.width, captured_qrcode_image.height);
  {
    {
      /*  qrReader.hidden = true;
          html5QrcodeScanner.clear();  */
    }
  }
}

function onScanFailure(error) {// handle scan failure, usually better to ignore and keep scanning.
  // for example:
  // console.warn(`Code scan error = ${error}`);
}

var html5QrcodeScanner = new Html5QrcodeScanner("qrReader", {
  fps: 100,
  qrbox: 200,
  experimentalFeatures: {
    useBarCodeDetectorIfSupported: true
  },
  rememberLastUsedCamera: true
});
html5QrcodeScanner.render(onScanSuccess, onScanFailure); // Attach the video stream to the video element and autoplay.

navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
  player.srcObject = stream;
});