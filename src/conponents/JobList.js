import {
  jobListSearchEl,
  jobDetailsContentEl,
  BASE_API_URL,
} from "../common.js";
import renderError from "./Error.js";
import renderJobDetals from "./JobDetails.js";
import renderSpinner from "./Spinner.js";

//

const renderJobList = (jobData) => {
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
};

// -- Job List Component --
const clickHandler = (event) => {
  //prevent default behavior (navigation)
  event.preventDefault();

  // get clicked job item element
  const jobItemEl = event.target.closest(".job-item");

  // remove the active class from previously active job item
  //   const activeJobEl = document.querySelector(".job-item--active");
  //   if (activeJobEl) {
  //     activeJobEl.classList.remove("job-item--active");
  //   }

  // true
  //   document.querySelector(".job-item--active") &&
  //     document
  //       .querySelector(".job-item--active")
  //       .classList.remove("job-item--active");

  document
    .querySelector(".job-item--active")
    ?.classList.remove("job-item--active");

  //Add active class
  jobItemEl.classList.add("job-item--active");

  //empty the job details secton
  jobDetailsContentEl.innerHTML = "";

  //Render spinner
  //spinnerJobDetailsEl.classList.add("spinner--visible");
  renderSpinner("job-details");

  //get the job id
  const id = jobItemEl.children[0].getAttribute("href");

  //fetch job item data
  fetch(`${BASE_API_URL}/jobs/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Resource issue(e.g. resource doesn't exist)`);
      }

      return res.json();
    })
    .then((data) => {
      //extract job item
      const { jobItem } = data;
      console.log(jobItem);

      //remove spinner
      // spinnerJobDetailsEl.classList.remove("spinner--visible");
      renderSpinner("job-details");

      // render job details
      renderJobDetals(jobItem);
    })
    .catch((error) => {
      renderSpinner();
      renderError(error.message);
    });
};

jobListSearchEl.addEventListener("click", clickHandler);

export default renderJobList;
