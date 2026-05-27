import { renderHomePage }
from "../pages/homePage.js";

import { renderCreatePage }
from "../pages/createPage.js";

import { renderStoryPage }
from "../pages/storyPage.js";

const pageContainer =
document.getElementById("page-container");

export function navigate(page){

switch(page){

case "home":

pageContainer.innerHTML =
renderHomePage();

break;

case "create":

pageContainer.innerHTML =
renderCreatePage();

break;

case "story":

pageContainer.innerHTML =
renderStoryPage();

break;

}

}
