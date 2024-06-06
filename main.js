const bookmarksBtnEl = document.querySelector(".bookmarks-btn");
const errorEl = document.querySelector(".error");
const errorTextEl = document.querySelector(".error__text");
const jobDetailsEl = document.querySelector(".job-details");
const jobDetailsContentEl = document.querySelector(".job-details__content");
const jobListBookmarksEl = document.querySelector(".job-list--bookmarks");
const jobListSearchEl = document.querySelector(".job-list--search");
const numberEl = document.querySelector(".count__number");
const paginationEl = document.querySelector(".pagination");
const paginationBtnNextEl = document.querySelector(".pagination__button--next");
const paginationBtnBackEl = document.querySelector(".pagination__button--back");
const paginationNumberNextEl = document.querySelector(
  ".pagination__number--next"
);
const paginationNumberBackEl = document.querySelector(
  ".pagination__number--back"
);
const searchFormEl = document.querySelector(".search");
const searchInputEl = document.querySelector(".search__input");
const sortingEl = document.querySelector(".sorting");
const sortingBtnRelevantEl = document.querySelector(
  ".sorting__button--relevant"
);
const sortingBtnRecentEl = document.querySelector(".sorting__button--recent");
const spinnerSearchEl = document.querySelector(".spinner--search");
const spinnerJobDetailsEl = document.querySelector(".spinner--job-details");

// -- Search component
const submitHandler = (event) => {
  event.preventDefault();

  // get search text
  const searchText = searchInputEl.value;

  // validate regular expression
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);

  if (patternMatch) {
    errorTextEl.textContent = `Your search may not contain Numbers`;
    errorEl.classList.add("error--visible");

    //remove after 2 seconds
    setTimeout(() => {
      errorEl.classList.remove("error--visible");
    }, 2000);

    return;
  }

  //blur input
  searchInputEl.blur();

  // render spinner
  spinnerSearchEl.classList.add("spinner--visible");

  // fetch sear ch resutls
  // query param --> ?serach=javascript
  fetch(`https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Somethng went wrong!");
        return; // we don't want to do anything
      }

      return res.json();
    })
    .then((data) => {
      //extract job items
      const { jobItems: jobData } = data; // both are same (data.jobItems) also renames as --> jobData

      // remove spinner
      spinnerSearchEl.classList.remove("spinner--visible");

      // render number of results
      numberEl.textContent = jobData.length;
    })
    .catch((error) => console.log(error));
};

searchFormEl.addEventListener("submit", submitHandler);
