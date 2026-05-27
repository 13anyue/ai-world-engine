export function renderCreatePage(){

return `

<div class="card">

    <div class="title">
        创建世界
    </div>

    <div class="sub">

        输入世界背景，
        AI会生成完整世界。

    </div>

    <input
    class="input"
    placeholder="世界名称">

    <textarea
    class="input"
    placeholder="输入世界设定"></textarea>

    <button
    class="button"
    onclick="window.enterStory()">

        进入世界

    </button>

</div>

`;

}
