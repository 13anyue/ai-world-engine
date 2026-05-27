import { navigate }
from "./router.js";

import {

saveAPIData

}

from "../pages/apiPage.js";

import {

loadStory

}

from "../pages/storyPage.js";

window.navigateToCreate = ()=>{

navigate("create");

};

window.enterStory = ()=>{

navigate("story");

};

window.openAPI = ()=>{

navigate("api");

};

window.saveAPI = ()=>{

saveAPIData();

};

window.nextStory = ()=>{

loadStory();

};

navigate("home");
