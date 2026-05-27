const pageContainer =
document.getElementById("page-container");

function renderHomePage(){

pageContainer.innerHTML = `

<div class="card">

    <div class="title">
        AI互动文游平台
    </div>

    <div class="sub">

        创建属于你的AI动态世界。

    </div>

    <button class="button"
    onclick="renderCreatePage()">

        创建游戏

    </button>

</div>

`;

}

function renderCreatePage(){

pageContainer.innerHTML = `

<div class="card">

    <div class="title">
        创建世界
    </div>

    <div class="sub">

        AI会自动生成世界、NPC与剧情。

    </div>

    <button class="button"
    onclick="alert('下一步')">

        开始生成

    </button>

</div>

`;

}

renderHomePage();
