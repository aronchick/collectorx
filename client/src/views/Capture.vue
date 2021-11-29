<template>
<!DOCTYPE html>
<html>
  <head>
    <title>Capture</title>
    <link href="../css/main.css" rel="stylesheet" type="text/css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:title" content="Capture and Upload" />
  </head>

  <body>
    <h1></h1>
    <div class="container">
      <div class="row">
        <div class="col-sm" id="camera-column">
            <h2>Picture of your object</h2>
          <div id="image-div">
            <video id="player" controls autoplay></video>
          </div>
          <div>
            <div class="mb-3">
              <button
                id="capture_image_button"
                type="button"
                class="btn btn-light px-2 m-3 btn-lg"
              >
                Capture Image
              </button>
            </div>
          </div>
        </div>

        <div class="col-sm" id="qr-column">
          <div id="qrReader_div">
            <div id="qrReader"></div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md">
          <div>
            <canvas id="canvas_image" width="320px" height="240px"></canvas>
          </div>
        </div>
        <div class="col-md">
          <div id="qrContent" class="container"></div>
          <input type="hidden" id="qrContentFormat" />
          <input type="hidden" id="qrContentValue" />
          <input type="hidden" id="qrContentDate" />
          <input
            type="hidden"
            id="newOwner"
            value="6d49f57f-d70b-479e-a2ad-2445746e7793"
          />
          <canvas
            id="captured_qrcode_image"
            width="320px"
            height="240px"
          ></canvas>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg">
        <button
          id="send_value_button"
          type="button"
          class="btn btn-light px-2 m-3 btn-lg"
        >
          Submit
        </button>
      </div>
    </div>
    <script type="module" src="../js/capture.js"></script>
    <script type="application/javascript" src="https://unpkg.com/html5-qrcode"></script>
  </body>
</html>
</template>
<script lang="ts">
import Vue from 'vue';
          
export default Vue.extend({
  name: 'Capture',
  data() {
    return {
      capture: {}
    }
  },
  methods: {
    // async getEventData() {
    //   // Get the access token from the auth wrapper
    //   const accessToken = await this.$auth.getTokenSilently()

    //   // Use the eventService to call the getEventSingle method
    //   EventService.getEventSingle(this.$route.params.id, accessToken)
    //   .then(
    //     (event => {
    //       this.$set(this, "event", event);
    //     }).bind(this)
    //   );
    // }
  }
});

</script>