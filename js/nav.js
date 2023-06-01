"use strict";


function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);


function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);


function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function navSubmitClick(e) {
  console.debug("navSubmitClick", e);
  hidePageComponents();
  submitForm.show();
}
navSubmit.on('click', navSubmitClick);

function navShowFavs(e) {
  favsList.empty();
  console.debug("navShowFavs", e);
  const favStoriesArr = JSON.parse(localStorage.getItem('favStories'));
  if (favStoriesArr) {
    for (let story of favStoriesArr) {
      favsList.append(story);
    }
    hidePageComponents();
    favSec.show();
  }
  else {
    alert('No Favorites Yet!');
  }
}
navFavs.on('click', navShowFavs);