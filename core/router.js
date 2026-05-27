import { renderHomePage } from '../pages/homePage.js';
import { renderApiPage } from '../pages/apiPage.js';
import { renderCreatePage } from '../pages/createPage.js';
import { renderGameHallPage } from '../pages/storyPage.js';
import { renderProfilePage } from '../pages/profilePage.js';

const pageContainer = document.getElementById('page-container');

export function navigate(route) {
  const views = {
    home: renderHomePage,
    api: renderApiPage,
    create: renderCreatePage,
    hall: renderGameHallPage,
    profile: renderProfilePage
  };
  pageContainer.innerHTML = (views[route] || renderHomePage)();
}
