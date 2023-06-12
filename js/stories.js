"use strict";

let storyList;
let favsListArr = JSON.parse(localStorage.getItem('favStories'));




async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();
  putStoriesOnPage();
}



function generateStoryMarkup(story) {
  console.debug("generateStoryMarkup", story);
  const hostName = story.getHostName();
  if (favsListArr) {
    for (let fav of favsListArr) {
      if (fav.includes(story.title)){
        return $(`
        <li id="${story.storyId}">
        <input type="checkbox" checked>
          <a href="${story.url}" target="a_blank" class="story-link">
            ${story.title}
          </a>
          <small class="story-hostname">(${hostName})</small>
          <small class="story-author">by ${story.author}</small>
          <button class="removeBtn">Remove</button>
          <small class="story-user">posted by ${story.username}</small>
        </li>
      `)
      }
    }
  }
  return $(`
  <li id="${story.storyId}">
  <input type="checkbox">
    <a href="${story.url}" target="a_blank" class="story-link">
      ${story.title}
    </a>
    <small class="story-hostname">(${hostName})</small>
    <small class="story-author">by ${story.author}</small>
    <button class="removeBtn">Remove</button>
    <small class="story-user">posted by ${story.username}</small>
  </li>
`)
}


function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function submitStory () {
  try {
    const title = submitTitle.value;
    const author = submitAuthor.value;
    const url = submitUrl.value;
    const submittedStory = generateStoryMarkup(addStory(currentUser.loginToken, {title, author, url}));
    $allStoriesList.append(submittedStory);
  }
  catch(error) {
    alert('Error');
  }
}
submitForm.on('submit', submitStory);

function removeStory(e) {
  const tagName = e.target.tagName;
  const story = e.target.parentElement;
  if (tagName === 'BUTTON') {
    if (story.children[0].checked) {
      favsListArr.splice(favsListArr.indexOf(story), 1);
      localStorage.setItem('favStories', JSON.stringify(favsListArr))
    }
    story.remove();
  }
}
$allStoriesList.on('click', removeStory);
favsList.on('click', removeStory);