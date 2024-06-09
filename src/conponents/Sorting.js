import {
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  state,
} from "../common.js";

const clickHandler = (event) => {
  //get clicked button elemet
  const clickedButtonEl = event.target.closest(".sorting__button");

  // stop function if no clicked button element
  if (!clickedButtonEl) return;

  // check if intention is recent or relevant sorting
  const recent = clickedButtonEl.className.includes("--recent") ? true : false;

  // //sort job items
  // if (recent) {
  //   state.searchJobItems.sort((a, b) => b - a);
  // } else {
  // }
};

sortingEl.addEventListener("click", clickHandler);
