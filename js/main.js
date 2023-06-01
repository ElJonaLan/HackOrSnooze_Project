"use strict";

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const navSubmit = $('#nav-submit');
const navFavs = $('#nav-favs');

const submitForm = $('#submit-form');
const submitTitle = $('#submit-title');
const submitAuthor = $('#submit-author');
const submitUrl = $('#submit-url');

const favSec = $('#favorites');
const favsList = $('#favs-list');



function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    submitForm,
    favSec   
  ];
  components.forEach(c => c.hide());
}


async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}


console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);
