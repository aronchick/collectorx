/* eslint-disable no-undef */
import logMessage from "./js/logger";
import "./css/style.css";
// Log message to console
logMessage("A very warm welcome to Expack! Something.");
// Needed for Hot Module Replacement
if (typeof module.hot !== "undefined") {
  module.hot.accept();
}
