import { errorTextEl, errorEl } from "../common.js";

const renderError = (message = "Somethng went wrong") => {
  errorTextEl.textContent = message;
  errorEl.classList.add("error--visible");

  //remove after 2 seconds
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, 2000);
};

export default renderError;
