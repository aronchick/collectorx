const { resolve } = require("path");

const { web3_token } = process.env.web3_token;

module.exports = {
  root: "./src",
  base: "",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src", "index.html"),
        upload: resolve(__dirname, "src", "upload.html"),
      },
    },
  },
  web3_token: web3_token,
};
