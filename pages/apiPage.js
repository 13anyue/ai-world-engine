import { GAME_STATE }
from "../core/state.js";

export function renderApiPage(){

return `

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

<button
class="button"
onclick="window.saveAPI()">

保存API

</button>

</div>

`;

}

export function saveAPIData(){

GAME_STATE.api.url =
document.getElementById(
"api-url"
).value;

GAME_STATE.api.key =
document.getElementById(
"api-key"
).value;

GAME_STATE.api.model =
document.getElementById(
"api-model"
).value;

localStorage.setItem(

"AI_API",

JSON.stringify(
GAME_STATE.api
)

);

alert("API已保存");

}
