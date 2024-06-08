import {
  searchFormEl,
  searchInputEl,
  jobListSearchEl,
  numberEl,
  BASE_API_URL,
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
    const res = await fetch(`${BASE_API_URL}/jobs?search=${searchText}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(error.description);
    }

    // extract job items
    const { jobItems: jobData } = data; // both are same (data.jobItems) also renames as --> jobData

    // remove spinner
    renderSpinner("search");

    // render number of results
    numberEl.textContent = jobData.length;

    // Render job items in search job list
    renderJobList(jobData);
  } catch (error) {
    renderSpinner("search");
    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
