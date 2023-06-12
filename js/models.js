"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";


class Story {


  constructor({ storyId, title, author, url, username, createdAt }) {
    this.storyId = storyId;
    this.title = title;
    this.author = author;
    this.url = url;
    this.username = username;
    this.createdAt = createdAt;
  }


  getHostName() {
    // UNIMPLEMENTED: complete this function!
    return "hostname.com";
  }
}



class StoryList {
  constructor(stories) {
    this.stories = stories;
  }


  static async getStories() {

    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "GET",
    });

    const stories = response.data.stories.map(story => new Story(story));

    return new StoryList(stories);
  }


  async addStory(user, newStory) {
    const res = await axios.post('https://hack-or-snooze-v3.herokuapp.com/stories', {data:{token: user, story: newStory}});
    return  new Story(res);
  }
}




class User {


  constructor({
                username,
                name,
                createdAt,
                favorites = [],
                ownStories = []
              },
              token) {
    this.username = username;
    this.name = name;
    this.createdAt = createdAt;

    // instantiate Story instances for the user's favorites and ownStories
    this.favorites = favorites.map(s => new Story(s));
    this.ownStories = ownStories.map(s => new Story(s));
    // store the login token on the user so it's easy to find for API calls.
    this.loginToken = token;
    const favsList = $('#favs-list');
    const $allStoriesList = $("#all-stories-list");
    $allStoriesList.on('click', this.toggleFavorites);
    favsList.on('click', this.toggleFavorites);  
  }



  static async signup(username, password, name) {
    const response = await axios({
      url: `${BASE_URL}/signup`,
      method: "POST",
      data: { user: { username, password, name } },
    });

    let { user } = response.data

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }



  static async login(username, password) {
    const response = await axios({
      url: `${BASE_URL}/login`,
      method: "POST",
      data: { user: { username, password } },
    });

    let { user } = response.data;

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }



  static async loginViaStoredCredentials(token, username) {
    try {
      const response = await axios({
        url: `${BASE_URL}/users/${username}`,
        method: "GET",
        params: { token },
      });

      let { user } = response.data;

      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          ownStories: user.stories
        },
        token
      );
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }
  }

  toggleFavorites(e) {
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
}