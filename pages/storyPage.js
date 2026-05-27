import { generateStory }
from "../systems/worldSystem.js";

export function renderStoryPage(){

return `

<div class="card">

    <div class="title">
        AI世界
    </div>

    <div class="sub">

        动态AI剧情生成

    </div>

    <div id="story-container">

        正在生成剧情...

    </div>

    <button
    class="button"
    onclick="window.nextStory()">

        下一段剧情

    </button>

</div>

`;

}

/* =========================
加载剧情
========================= */

export async function loadStory(){

const container =
document.getElementById(
"story-container"
);

const story =
await generateStory();

container.innerHTML = `

<div class="story">

${story}

</div>

`;

}
