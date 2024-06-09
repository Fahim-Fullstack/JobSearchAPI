import {
  searchFormEl,
  searchInputEl,
  jobListSearchEl,
  numberEl,
  state,
  BASE_API_URL,
  getData,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";

// -- Search component
const submitHandler = async (event) => {
  event.preventDefault();

  // get search text
  const searchText = searchInputEl.value;

  // validate regular expression
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);

  if (patternMatch) {
    renderError(`Your search may not contain Numbers`);
    return;
  }

  //blur input
  searchInputEl.blur();

  // Remove previous job items
  jobListSearchEl.innerHTML = "";

  // render spinner
  renderSpinner("search");

  // fetch sear ch resutls
  // query param --> ?serach=javascript

  try {
    // fetch search results
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

    // extract job items
    const { jobItems: jobData } = data; // both are same (data.jobItems) also renames as --> jobData

    // update state
    state.searchJobItems = jobData;

    // remove spinner
    renderSpinner("search");

    // render number of results
    numberEl.textContent = jobData.length;

    // Render job items in search job list
    renderJobList();
  } catch (error) {
    renderSpinner("search");
    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
