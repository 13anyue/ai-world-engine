import {

renderHomePage

}

from "../pages/homePage.js";

import {

renderCreatePage

}

from "../pages/createPage.js";

import {

renderStoryPage,
loadStory

}

from "../pages/storyPage.js";

import {

renderApiPage

}

from "../pages/apiPage.js";

const pageContainer =
document.getElementById(
"page-container"
);

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

setTimeout(()=>{

loadStory();

},100);

break;

case "api":

pageContainer.innerHTML =
renderApiPage();

break;

}

}
