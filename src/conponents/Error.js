import { errorTextEl, errorEl, DEFAULT_DISPLAY_TIME } from "../common.js";

const renderError = (message = "Somethng went wrong") => {
  errorTextEl.textContent = message;
  errorEl.classList.add("error--visible");

  //remove after 2 seconds
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, DEFAULT_DISPLAY_TIME);
};

export default renderError;
