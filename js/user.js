"use strict";

let currentUser;


async function login(evt) {
  console.debug("login", evt);
  evt.preventDefault();

  // grab the username and password
  const username = $("#login-username").val();
  const password = $("#login-password").val();

  // User.login retrieves user info from API and returns User instance
  // which we'll make the globally-available, logged-in user.
  currentUser = await User.login(username, password);

  $loginForm.trigger("reset");

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
}

$loginForm.on("submit", login);


async function signup(evt) {
  console.debug("signup", evt);
  evt.preventDefault();

  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();

  // User.signup retrieves user info from API and returns User instance
  // which we'll make the globally-available, logged-in user.
  currentUser = await User.signup(username, password, name);

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();

  $signupForm.trigger("reset");
}

$signupForm.on("submit", signup);


function logout(evt) {
  console.debug("logout", evt);
  localStorage.clear();
  location.reload();
}

$navLogOut.on("click", logout);


async function checkForRememberedUser() {
  console.debug("checkForRememberedUser");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return false;

  // try to log in with these credentials (will be null if login failed)
  currentUser = await User.loginViaStoredCredentials(token, username);
}


function saveUserCredentialsInLocalStorage() {
  console.debug("saveUserCredentialsInLocalStorage");
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}


function updateUIOnUserLogin() {
  console.debug("updateUIOnUserLogin");

  $allStoriesList.show();

  updateNavOnLogin();
}
/////////////////////////////////////////////////////////////////////////////////////////
function toggleFavorites(e) {
    if (e.target.tagName === 'INPUT') {
      if (!favsListArr) {
        favsListArr = [];
      }
      const html = e.target.parentElement.innerHTML
      if (e.target.checked) {
        const index = html.indexOf('checkbox') + 9;
        favsListArr.push(`<li>${html.slice(0, index)} checked${html.slice(index)}</li>`)
      }
      else if (!e.target.checked) {
        favsListArr.splice(favsListArr.indexOf(`<li>${html}</li>`), 1);
      }
      e.target.parentElement.classList.toggle('favorite');
      localStorage.setItem('favStories', JSON.stringify(favsListArr))
    }
  return
}
$allStoriesList.on('click',toggleFavorites);
favsList.on('click', toggleFavorites);  