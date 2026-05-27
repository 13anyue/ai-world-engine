const pageContainer =
document.getElementById("page-container");

/* =========================
全局状态树
========================= */

const GAME_STATE = {

api:{

url:"",
key:"",
model:""

},

currentPage:"home",

player:{},

world:{},

npcs:[],

relations:[],

map:[],

forum:[],

memory:{}

};

/* =========================
页面切换
========================= */

function navigate(page){

GAME_STATE.currentPage = page;

switch(page){

case "home":
renderHomePage();
break;

case "create":
renderCreatePage();
break;

case "api":
renderApiPage();
break;

case "mask":
renderMaskPage();
break;

case "game":
renderGamePage();
break;

default:
renderHomePage();

}

}

/* =========================
首页
========================= */

function renderHomePage(){

pageContainer.innerHTML = `

<div class="card">

    <div class="title">
        AI互动文游平台
    </div>

    <div class="sub">

        创建属于你的动态AI世界。

    </div>

    <button class="button"
    onclick="navigate('create')">

        创建游戏

    </button>

    <button class="button"
    onclick="navigate('api')">

        API配置

    </button>

    <button class="button"
    onclick="navigate('mask')">

        面具角色

    </button>

</div>

`;

}

/* =========================
创建世界
========================= */

function renderCreatePage(){

pageContainer.innerHTML = `

<div class="card">

    <div class="title">
        创建世界
    </div>

    <div class="sub">

        输入世界背景，
        AI会生成完整世界。

    </div>

    <input
    id="world-name"
    class="input"
    placeholder="世界名称">

    <textarea
    id="world-desc"
    class="input"
    placeholder="输入世界设定"></textarea>

    <button class="button"
    onclick="createWorld()">

        AI生成世界

    </button>

</div>

`;

}

/* =========================
API配置
========================= */

function renderApiPage(){

pageContainer.innerHTML = `

<div class="card">

    <div class="title">
        API配置
    </div>

    <input
    id="api-url"
    class="input"
    placeholder="API端点">

    <input
    id="api-key"
    class="input"
    placeholder="API密钥">

    <input
    id="api-model"
    class="input"
    placeholder="模型名称">

    <button class="button"
    onclick="saveAPI()">

        保存API

    </button>

</div>

`;

}

/* =========================
面具角色
========================= */

function renderMaskPage(){

pageContainer.innerHTML = `

<div class="card">

    <div class="title">
        面具角色
    </div>

    <div class="sub">

        不同角色绑定不同世界。

    </div>

    <button class="button">

        创建角色

    </button>

</div>

`;

}

/* =========================
游戏内部
========================= */

function renderGamePage(){

pageContainer.innerHTML = `

<div class="card">

    <div class="title">
        雨夜都市
    </div>

    <div class="sub">

        21:44 · 暴雨

    </div>

</div>

<div class="card">

<div class="story">

<b>沈辞：</b>

“你终于来了。”

<br><br>

<i>
空气里弥漫着潮湿气息。
</i>

<br><br>

桌上放着一份旧档案袋。

</div>

<div class="option">
查看档案袋
</div>

<div class="option">
询问今晚发生了什么
</div>

<div class="option">
离开这里
</div>

</div>

`;

}

/* =========================
创建世界
========================= */

function createWorld(){

const name =
document.getElementById("world-name").value;

const desc =
document.getElementById("world-desc").value;

GAME_STATE.world = {

name,
desc

};

navigate("game");

}

/* =========================
保存API
========================= */

function saveAPI(){

GAME_STATE.api.url =
document.getElementById("api-url").value;

GAME_STATE.api.key =
document.getElementById("api-key").value;

GAME_STATE.api.model =
document.getElementById("api-model").value;

alert("API已保存");

navigate("home");

}

/* =========================
启动
========================= */

navigate("home")
