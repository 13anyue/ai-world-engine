import { navigate }
from "./router.js";

import {

createNPC

}

from "../systems/npcSystem.js";

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

window.openRelation = ()=>{

navigate("relation");

};

createNPC({

name:"沈辞",

age:24,

gender:"男",

personality:"冷淡腹黑",

occupation:"财团继承人",

mood:"复杂"

});

createNPC({

name:"林镜",

age:22,

gender:"女",

personality:"病娇",

occupation:"艺术学院学生",

mood:"愉悦"

});

navigate("home");
