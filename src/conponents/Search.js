import {
  searchFormEl,
  searchInputEl,
  jobListSearchEl,
  numberEl,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";

// -- Search component
const submitHandler = (event) => {
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
  fetch(`https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Something went wrong!");
        return; // we don't want to do anything
      }

      return res.json();
    })
    .then((data) => {
      //extract job items
      const { jobItems: jobData } = data; // both are same (data.jobItems) also renames as --> jobData

      // remove spinner
      renderSpinner("search");

      // render number of results
      numberEl.textContent = jobData.length;

      // Render job items in search job list
      jobData.slice(0, 7).forEach((jobData) => {
        const newJobItemHTML = `
            <li class="job-item">
              <a class="job-item__link" href="${jobData.id}">
                  <div class="job-item__badge">${jobData.badgeLetters}</div>
                  <div class="job-item__middle">
                      <h3 class="third-heading">${jobData.title}</h3>
                      <p class="job-item__company">${jobData.company}</p>
                      <div class="job-item__extras">
                          <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobData.duration}</p>
                          <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobData.salary}</p>
                          <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobData.location}</p>
                      </div>
                  </div>
                  <div class="job-item__right">
                      <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                      <time class="job-item__time">${jobData.daysAgo}d</time>
                  </div>
              </a>
          </li>`;
        jobListSearchEl.insertAdjacentHTML("beforeend", newJobItemHTML);
      });
    })
    .catch((error) => console.log(error));
};

searchFormEl.addEventListener("submit", submitHandler);
